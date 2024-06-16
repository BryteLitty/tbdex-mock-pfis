import type { LogLevelDesc } from 'loglevel'
import fs from 'fs/promises'

import 'dotenv/config'

import { BearerDid, DidDht } from '@web5/dids'


export type Environment = 'local' | 'staging' | 'production'
const pfi_path = 'src/pfis/'

export type Config = {
  env: Environment;
  logLevel: LogLevelDesc;
  host: string[];
  port: string[];
  pfiDid: BearerDid[];
  allowlist: string[];
  pinPaymentsKey: string;
}

export const config: Config = {
  env: (process.env['ENV'] as Environment) || 'local',
  logLevel: (process.env['LOG_LEVEL'] as LogLevelDesc) || 'info',
  host: [ 'http://localhost:4000',  'http://localhost:5000', 'http://localhost:8000',  'http://localhost:8080', 'http://localhost:9000'],
  port: ['4000', '5000', '8000', '8080', '9000'],
  pfiDid: await createOrLoadDid(['pfi_1.json', 'pfi_2.json', 'pfi_3.json', 'pfi_4.json', 'pfi_issuer.json']),
  pinPaymentsKey: process.env['SEC_PIN_PAYMENTS_SECRET_KEY'],
  allowlist: JSON.parse(process.env['SEC_ALLOWLISTED_DIDS'] || '[]'),
}

async function loadDID(filename) {
  try {
    const data = await fs.readFile(pfi_path + filename, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading from file:', error)
    return false
  }
}

async function createADid(serviceEndpoint: string, filename: string) {
  const existingDid = await loadDID(filename)
  if (existingDid) {
    const bearerDid = await DidDht.import({portableDid: existingDid})
    return bearerDid
  }
  // else create a new one
  const bearerDid = await DidDht.create({
    options: {
      services: [
        {
          id: 'pfi',
          type: 'PFI',
          serviceEndpoint,
        },
      ],
    },
  })
  const portableDid = await bearerDid.export()
  await fs.writeFile(pfi_path + filename, JSON.stringify(portableDid, null, 2))

  return bearerDid
}



async function createOrLoadDid(filenames: string[]): Promise<BearerDid[]> {

  console.log('Setting up dids for server PFIs...')
  const pfis: BearerDid[] = []
  const bearerDid1 = await createADid('http://localhost:4000', filenames[0])
  const bearerDid2 = await createADid('http://localhost:5000', filenames[1])
  const bearerDid3 = await createADid('http://localhost:8000', filenames[2])
  const bearerDid4 = await createADid('http://localhost:8080', filenames[3])
  const bearerDid5 = await createADid('http://localhost:9000', filenames[4])


  pfis.push(bearerDid1)
  pfis.push(bearerDid2)
  pfis.push(bearerDid3)
  pfis.push(bearerDid4)
  pfis.push(bearerDid5)

  return pfis
}