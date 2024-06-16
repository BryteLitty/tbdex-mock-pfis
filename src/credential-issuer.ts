import { BearerDid } from '@web5/dids'
import { VerifiableCredential } from '@web5/credentials'

import fetch from 'node-fetch'
import Papa from 'papaparse'
import fuzzysort from 'fuzzysort'

import { config } from './config.js'




const issuer: BearerDid = config.pfiDid[4] // issuer is the 5th PFI - pfi_issuer.json
// write issuer did to file so server can trust it:


export const issuerDid = issuer.uri

type SanctionEntry = {
  name: string;
  country: string;
  // Additional fields can be added as needed
}

type QueryData = {
  name: string;
  minScore: number;
  country?: string;
}

async function loadSanctionsData(): Promise<SanctionEntry[] | null> {
  const url = 'https://www.treasury.gov/ofac/downloads/sdn.csv'
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const text = await response.text()
    const data = Papa.parse<SanctionEntry>(text, { header: true }).data
    return data
  } catch (error) {
    console.error(`Error fetching data: ${error}`)
    return null
  }
}

// console.log('Loading OFAC sanctions data...')
let sanctionsData: SanctionEntry[] | null = await loadSanctionsData()

function searchSanctions(
  queryData: QueryData,
  data: SanctionEntry[],
): SanctionEntry[] {
  const nameResults = fuzzysort.go(queryData.name, data, { key: 'name' })
  let results = nameResults.map((result) => result.obj)

  if (queryData.country) {
    const countryResults = fuzzysort.go(queryData.country, data, {
      key: 'country',
    })
    const countryMatched = countryResults.map((result) => result.obj)
    results = results.filter((entry) => countryMatched.includes(entry))
  }

  // Apply minimum score filter
  results = results.filter((result) => {
    const nameScore =
      fuzzysort.single(queryData.name, result.name)?.score ?? -Infinity
    const countryScore = queryData.country
      ? fuzzysort.single(queryData.country, result.country)?.score ?? -Infinity
      : 0
    return (
      nameScore >= queryData.minScore || countryScore >= queryData.minScore
    )
  })

  return results
}

/*
 * Check if the person is sanctioned and if not - issue them a VC signed by the issuer.
 */
export async function requestCredential(
  name: string,
  country: string,
  customerDid: string,
) {
  const sanctionsSearch = searchSanctions(
    {
      name: name,
      minScore: 80,
      country: country,
    },
    sanctionsData,
  )

  if (sanctionsSearch.length > 0) {
    console.log('we have a naughty person, we cannot do business with them')
    return false
  }



  // Create a KCC credential so that the PFI knows that Alice is legit.
  const vc = await VerifiableCredential.create({
    type: 'KnownCustomerCredential',
    issuer: issuer.uri,
    subject: customerDid,
    expirationDate: '2026-05-19T08:02:04Z',
    data: {
      name,
      countryOfResidence: country
    },
    credentialSchema: {
      id: 'https://schema.org/PFI',
      type: 'JsonSchema'
    },
  })

  const vcJwt = await vc.sign({ did: issuer })

  console.log('vcJwt:', vcJwt)

  return vcJwt
}
