import { OfferingsApi, Offering, OfferingData } from '@tbdex/http-server'
import { config } from './config.js'
// import fs from 'fs/promises'
import { PresentationExchange } from '@web5/credentials'
import { issuerDid } from './credential-issuer.js'
import { BearerDid } from '@web5/dids'

// load issuer's did from a file called issuer-did.txt
const issuer = issuerDid

// generating mock offeringsData
export const offeringDataTBDollarsToUSDC: OfferingData = {
  description: `Exchange your TBDollars for USDC`,
  payoutUnitsPerPayinUnit: '0.00035',
  payout: {
    currencyCode: 'USDC',
    methods: [
      {
        kind: 'USDC_WALLET_ADDRESS',
        estimatedSettlementTime: 86400, // 24 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USDC Required Payment Details',
          'type': 'object',
          'required': [
            'address',
          ],
          'additionalProperties': false,
          'properties': {
            'address': {
              'title': 'USDC Wallet Address',
              'description': 'Wallet address to pay out USDC to',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'TBDollars',
    methods: [
      {
        kind: 'STORED_BALANCE',
        requiredPaymentDetails: {},
      },
    ],
  },
  requiredClaims: {
    id: '7ce4004c-3c38-4853-968b-e411bafcd945',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },

    input_descriptors: [
      {
        id: 'bbdb9b7c-5754-4f46-b63b-590bada959e0',

        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataUSDToGHS: OfferingData = {
  description: `Exchange your US Dollars for Ghanaian Cedis`,
  payoutUnitsPerPayinUnit: '7.4',
  payout: {
    currencyCode: 'GHS',
    methods: [
      {
        kind: 'GHS_MOBILE_MONEY',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'GHS Mobile Money Required Payment Details',
          'type': 'object',
          'required': [
            'phoneNumber',
            'networkProvider',
          ],
          'additionalProperties': false,
          'properties': {
            'phoneNumber': {
              'title': 'Mobile Phone Number',
              'description': 'Phone number to pay out GHS to',
              'type': 'string'
            },
            'networkProvider': {
              'title': 'Network Provider',
              'description': 'The mobile network provider for the transaction',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        requiredPaymentDetails: {
          paymentDetails: {
            accountNumber: 'Your account number',
            bic: 'Your bank BIC',
            accountName: 'Your account name',
          },
        },
      },
    ],
  },
  requiredClaims: {
    id: '1e4004c5-5f70-4639-8c91-e6e115eff945',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: 'cdfb9b7c-2224-4f46-a63b-590bada959f1',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataUSDToKES: OfferingData = {
  description: `Exchange your US Dollars for Kenyan Shillings`,
  payoutUnitsPerPayinUnit: '120.5',
  payout: {
    currencyCode: 'KES',
    methods: [
      {
        kind: 'KES_BANK_TRANSFER',
        estimatedSettlementTime: 86400, // 24 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'KES Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'bankName',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'KES Bank Account Number',
              'description': 'Bank account number to pay out KES to',
              'type': 'string'
            },
            'bankName': {
              'title': 'Bank Name',
              'description': 'The name of the bank for KES transfer',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        requiredPaymentDetails: {
          paymentDetails: {
            accountNumber: 'Your account number',
            bic: 'Your bank BIC',
            accountName: 'Your account name',
          },
        },
      },
    ],
  },
  requiredClaims: {
    id: '7ce4004c-3c38-4853-968b-e411bafcd945',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: 'bbdb9b7c-5754-4f46-b63b-590bada959e0',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataKESToZAR: OfferingData = {
  description: `Exchange your Kenyan Shillings for South African Rand`,
  payoutUnitsPerPayinUnit: '0.13',
  payout: {
    currencyCode: 'ZAR',
    methods: [
      {
        kind: 'ZAR_BANK_TRANSFER',
        estimatedSettlementTime: 86400, // 24 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'ZAR Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'bankName',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'ZAR Bank Account Number',
              'description': 'Bank account number to pay out ZAR to',
              'type': 'string'
            },
            'bankName': {
              'title': 'Bank Name',
              'description': 'The name of the bank for ZAR transfer',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'KES',
    methods: [
      {
        kind: 'KES_MOBILE_MONEY',
        requiredPaymentDetails: {},
      },
    ],
  },
  requiredClaims: {
    id: '9cd4011c-6b98-4853-968b-e411bafcd986',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: 'eeef9c2d-1234-4d23-b3cd-330f0a418b3e',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataGHSToUSDC: OfferingData = {
  description: `Exchange your Ghanaian Cedis for USDC`,
  payoutUnitsPerPayinUnit: '0.11',
  payout: {
    currencyCode: 'USDC',
    methods: [
      {
        kind: 'USDC_WALLET_ADDRESS',
        estimatedSettlementTime: 43200, // 12 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'USDC Required Payment Details',
          'type': 'object',
          'required': [
            'address',
          ],
          'additionalProperties': false,
          'properties': {
            'address': {
              'title': 'USDC Wallet Address',
              'description': 'Wallet address to pay out USDC to',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'GHS',
    methods: [
      {
        kind: 'GHS_BANK_TRANSFER',
        requiredPaymentDetails: {},
      },
    ],
  },
  requiredClaims: {
    id: '3f78edc1-9f75-478b-a0d8-c9ee2550d366',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: '73b86039-d07e-4f9a-9f3d-a8f7a8ec1635',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataUSDToNGN: OfferingData = {
  description: `Exchange your US Dollars for Nigerian Naira`,
  payoutUnitsPerPayinUnit: '420.0',
  payout: {
    currencyCode: 'NGN',
    methods: [
      {
        kind: 'NGN_BANK_TRANSFER',
        estimatedSettlementTime: 86400, // 24 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'NGN Required Payment Details',
          'type': 'object',
          'required': [
            'accountNumber',
            'bankName',
          ],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'NGN Bank Account Number',
              'description': 'Bank account number to pay out NGN to',
              'type': 'string'
            },
            'bankName': {
              'title': 'Bank Name',
              'description': 'The name of the bank for NGN transfer',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        requiredPaymentDetails: {},
      },
    ],
  },
  requiredClaims: {
    id: '7ce4004c-3c38-4853-968b-e411bafcd945',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: 'bbdb9b7c-5754-4f46-b63b-590bada959e0',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataZARToBTC: OfferingData = {
  description: `Exchange your South African Rand for Bitcoin`,
  payoutUnitsPerPayinUnit: '0.000019',
  payout: {
    currencyCode: 'BTC',
    methods: [
      {
        kind: 'BTC_WALLET_ADDRESS',
        estimatedSettlementTime: 86400, // 24 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'BTC Required Payment Details',
          'type': 'object',
          'required': [
            'address',
          ],
          'additionalProperties': false,
          'properties': {
            'address': {
              'title': 'BTC Wallet Address',
              'description': 'Wallet address to pay out BTC to',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'ZAR',
    methods: [
      {
        kind: 'ZAR_BANK_TRANSFER',
        requiredPaymentDetails: {},
      },
    ],
  },
  requiredClaims: {
    id: '1d68ec1c-7a18-43e3-9a15-e211c8fe8346',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: 'efcd9b7c-1134-4f46-b63b-590bada959e0',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataEURToZAR: OfferingData = {
  description: `Exchange your Euros for South African Rand`,
  payoutUnitsPerPayinUnit: '17.85',
  payout: {
    currencyCode: 'ZAR',
    methods: [
      {
        kind: 'ZAR_BANK_TRANSFER',
        estimatedSettlementTime: 86400, // 24 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'ZAR Required Payment Details',
          'type': 'object',
          'required': ['accountNumber', 'bankName'],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'ZAR Bank Account Number',
              'description': 'Bank account number to pay out ZAR to',
              'type': 'string'
            },
            'bankName': {
              'title': 'Bank Name',
              'description': 'The name of the bank for ZAR transfer',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'EUR',
    methods: [
      {
        kind: 'EUR_BANK_TRANSFER',
        requiredPaymentDetails: {
          paymentDetails: {
            accountNumber: 'Your Euro account number',
            bic: 'Your bank BIC',
            accountName: 'Your account name',
          },
        },
      },
    ],
  },
  requiredClaims: {
    id: '7ce4004c-3c38-4853-968b-e411bafcd945',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: 'bbdb9b7c-5754-4f46-b63b-590bada959e0',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataGBPToCAD: OfferingData = {
  description: `Exchange your British Pounds for Canadian Dollars`,
  payoutUnitsPerPayinUnit: '1.70',
  payout: {
    currencyCode: 'CAD',
    methods: [
      {
        kind: 'CAD_BANK_TRANSFER',
        estimatedSettlementTime: 86400, // 24 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'CAD Required Payment Details',
          'type': 'object',
          'required': ['accountNumber', 'bankName'],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'CAD Bank Account Number',
              'description': 'Bank account number to pay out CAD to',
              'type': 'string'
            },
            'bankName': {
              'title': 'Bank Name',
              'description': 'The name of the bank for CAD transfer',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'GBP',
    methods: [
      {
        kind: 'GBP_BANK_TRANSFER',
        requiredPaymentDetails: {
          paymentDetails: {
            accountNumber: 'Your account number',
            bic: 'Your bank BIC',
            accountName: 'Your account name',
          },
        },
      },
    ],
  },
  requiredClaims: {
    id: '7ce4004c-3c38-4853-968b-e411bafcd945',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: 'bbdb9b7c-5754-4f46-b63b-590bada959e0',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataUSDToGBP: OfferingData = {
  description: `Exchange your US Dollars for British Pounds`,
  payoutUnitsPerPayinUnit: '0.82', // Example rate, adjust according to current rates
  payout: {
    currencyCode: 'GBP',
    methods: [
      {
        kind: 'GBP_BANK_TRANSFER',
        estimatedSettlementTime: 86400, // 24 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'GBP Required Payment Details',
          'type': 'object',
          'required': ['accountNumber', 'sortCode'],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'GBP Bank Account Number',
              'description': 'Bank account number to pay out GBP',
              'type': 'string'
            },
            'bankName': {
              'title': 'Bank Name',
              'description': 'The name of the bank for GBP transfer',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'USD',
    methods: [
      {
        kind: 'USD_BANK_TRANSFER',
        requiredPaymentDetails: {
          paymentDetails: {
            accountNumber: 'Your account number',
            bic: 'Your bank BIC',
            accountName: 'Your account name',
          },
        },
      },
    ],
  },
  requiredClaims: {
    id: '11ce4004c-3c38-4853-968b-e411bafcd988',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: 'eedb9b7c-5754-4f46-b63b-590bada959e4',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataAUDToJPY: OfferingData = {
  description: `Exchange your Australian Dollars for Japanese Yen`,
  payoutUnitsPerPayinUnit: '93.25',
  payout: {
    currencyCode: 'JPY',
    methods: [
      {
        kind: 'JPY_BANK_TRANSFER',
        estimatedSettlementTime: 86400, // 24 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'JPY Required Payment Details',
          'type': 'object',
          'required': ['accountNumber', 'bankName'],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'JPY Bank Account Number',
              'description': 'Bank account number to pay out JPY to',
              'type': 'string'
            },
            'bankName': {
              'title': 'Bank Name',
              'description': 'The name of the bank for JPY transfer',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'AUD',
    methods: [
      {
        kind: 'AUD_BANK_TRANSFER',
        requiredPaymentDetails: {
          paymentDetails: {
            accountNumber: 'Your account number',
            bic: 'Your bank BIC',
            accountName: 'Your account name',
          },
        },
      },
    ],
  },
  requiredClaims: {
    id: '7ce4004c-3c38-4853-968b-e411bafcd945',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: 'bbdb9b7c-5754-4f46-b63b-590bada959e0',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataZARToNGN: OfferingData = {
  description: `Exchange your South African Rand for Nigerian Naira`,
  payoutUnitsPerPayinUnit: '29.0',
  payout: {
    currencyCode: 'NGN',
    methods: [
      {
        kind: 'NGN_MOBILE_MONEY',
        estimatedSettlementTime: 86400, // 24 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'NGN Mobile Money Payment Details',
          'type': 'object',
          'required': ['mobileNumber', 'provider'],
          'additionalProperties': false,
          'properties': {
            'mobileNumber': {
              'title': 'Mobile Phone Number',
              'description': 'Mobile number registered with mobile money to pay out NGN',
              'type': 'string'
            },
            'provider': {
              'title': 'Mobile Money Provider',
              'description': 'Mobile money service provider for the transaction',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'ZAR',
    methods: [
      {
        kind: 'ZAR_BANK_TRANSFER',
        requiredPaymentDetails: {
          paymentDetails: {
            accountNumber: 'Your account number',
            bic: 'Your bank BIC',
            accountName: 'Your account name',
          },
        },
      },
    ],
  },
  requiredClaims: {
    id: '8ce4004c-3c38-4853-968b-e411bafcd955',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: 'bbdb9b7c-5754-4f46-b63b-590bada959e1',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataGHSToKES: OfferingData = {
  description: `Exchange your Ghanaian Cedis for Kenyan Shillings`,
  payoutUnitsPerPayinUnit: '15.2',
  payout: {
    currencyCode: 'KES',
    methods: [
      {
        kind: 'KES_MOBILE_MONEY',
        estimatedSettlementTime: 72000, // 20 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'KES Mobile Money Payment Details',
          'type': 'object',
          'required': ['phoneNumber', 'networkProvider'],
          'additionalProperties': false,
          'properties': {
            'phoneNumber': {
              'title': 'Mobile Phone Number',
              'description': 'Mobile number registered with mobile money to pay out KES',
              'type': 'string'
            },
            'networkProvider': {
              'title': 'Mobile Money Provider',
              'description': 'Mobile money service provider for the transaction',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'GHS',
    methods: [
      {
        kind: 'GHS_BANK_TRANSFER',
        requiredPaymentDetails: {
          paymentDetails: {
            accountNumber: 'Your account number',
            bic: 'Your bank BIC',
            accountName: 'Your account name',
          },
        },
      },
    ],
  },
  requiredClaims: {
    id: '9ce4004c-3c38-4853-968b-e411bafcd966',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: 'ccdb9b7c-5754-4f46-b63b-590bada959e2',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataMADToEGP: OfferingData = {
  description: `Exchange your Moroccan Dirhams for Egyptian Pounds`,
  payoutUnitsPerPayinUnit: '4.33',
  payout: {
    currencyCode: 'EGP',
    methods: [
      {
        kind: 'EGP_BANK_TRANSFER',
        estimatedSettlementTime: 86400, // 24 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'EGP Bank Transfer Payment Details',
          'type': 'object',
          'required': ['accountNumber', 'bankName'],
          'additionalProperties': false,
          'properties': {
            'accountNumber': {
              'title': 'EGP Bank Account Number',
              'description': 'Bank account number to pay out EGP',
              'type': 'string'
            },
            'bankName': {
              'title': 'Bank Name',
              'description': 'The name of the bank for EGP transfer',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'MAD',
    methods: [
      {
        kind: 'MAD_BANK_TRANSFER',
        requiredPaymentDetails: {
          paymentDetails: {
            accountNumber: 'Your account number',
            bic: 'Your bank BIC',
            accountName: 'Your account name',
          },
        },
      },
    ],
  },
  requiredClaims: {
    id: '10ce4004c-3c38-4853-968b-e411bafcd977',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: 'dddb9b7c-5754-4f46-b63b-590bada959e3',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}

export const offeringDataGHSToNGN: OfferingData = {
  description: `Exchange your Ghanaian Cedis for Nigerian Naira`,
  payoutUnitsPerPayinUnit: '75.5',  // Example rate, adjust according to current rates
  payout: {
    currencyCode: 'NGN',
    methods: [
      {
        kind: 'NGN_MOBILE_MONEY',
        estimatedSettlementTime: 72000, // 20 hours in seconds
        requiredPaymentDetails: {
          '$schema': 'http://json-schema.org/draft-07/schema#',
          'title': 'NGN Mobile Money Payment Details',
          'type': 'object',
          'required': ['phoneNumber', 'networkProvider'],
          'additionalProperties': false,
          'properties': {
            'phoneNumber': {
              'title': 'Mobile Phone Number',
              'description': 'Mobile number registered with mobile money to pay out NGN',
              'type': 'string'
            },
            'networkProvider': {
              'title': 'Mobile Money Provider',
              'description': 'Mobile money service provider for the transaction',
              'type': 'string'
            },
          }
        }
      },
    ],
  },
  payin: {
    currencyCode: 'GHS',
    methods: [
      {
        kind: 'GHS_BANK_TRANSFER',
        requiredPaymentDetails: {
          paymentDetails: {
            accountNumber: 'Your account number',
            bic: 'Your bank BIC',
            accountName: 'Your account name',
          },
        },
      },
    ],
  },
  requiredClaims: {
    id: '22ce4004c-3c38-4853-968b-e411bafcd999',
    format: {
      jwt_vc: {
        alg: ['ES256K', 'EdDSA']
      }
    },
    input_descriptors: [
      {
        id: 'ffdb9b7c-5754-4f46-b63b-590bada959e5',
        constraints: {
          fields: [
            {
              path: ['$.type[*]'],
              filter: {
                type: 'string',
                const: 'KnownCustomerCredential',
              },
            },
            {
              path: ['$.issuer'],
              filter: {
                type: 'string',
                const: issuer,
              },
            },
          ],
        },
      },
    ],
  },
}


// Offerings order
/*
1. Ghanaian currency pairs
2. South African currency pairs
3. Foreign currency pairs
4. Multiple African currency pairs
5. USD to African currency pairs
*/

const customOfferings = [
  {data: {...offeringDataGHSToUSDC}},
  {data: {...offeringDataZARToBTC}},
  {data: {...offeringDataUSDToGBP}},
  {data: {...offeringDataMADToEGP}},
  {data: {...offeringDataUSDToGHS}},
  {data: {...offeringDataGHSToKES}},
  {data: {...offeringDataEURToZAR}},
  {data: {...offeringDataGBPToCAD}},
  {data: {...offeringDataGHSToNGN}},
  {data: {...offeringDataUSDToKES}},
]

// function chooseRandomOfferingData(index): OfferingData {
//   if(index == 0) {
//     // return only TBDollars related offerings
//     return {
//       ...customOfferings[0].data,
//       payoutUnitsPerPayinUnit: '0.00035',
//     }

//   }
//   if(index == 1) {
//     // return only GHS related offerings
//     const randomSelect = Math.floor(Math.random() * (2 - 1 + 1)) + 1
//     return {
//       ...customOfferings[randomSelect].data
//     }
//   }
//   if(index == 2) {
//     // return only KES and ZAR offerings
//     const randomSelect = Math.floor(Math.random() * (5 - 3 + 1)) + 3
//     return {
//       ...customOfferings[randomSelect].data
//     }
//   }
//   else {
//     // return any other offering except TBDollars
//     const randomSelect = Math.floor(Math.random() * (6 - 1 + 1)) + 1
//     return {
//       ...customOfferings[randomSelect].data
//     }
//   }

// }

// Function to create a randomized offering
async function createRandomOffering(index: number): Promise<Offering> {

  // const selectedExchangeRate = fakeExchangeRates[Math.floor(Math.random() * fakeExchangeRates.length)].toString()
  const customPFIIndex = index % 5 // 5 is number of hardcoded PFI DIDs
  const offering = Offering.create({
    metadata: {
      from: config.pfiDid[customPFIIndex].uri,  // Alternates between two URIs
      protocol: '1.0'
    },
    data: customOfferings[index].data //chooseRandomOfferingData(customPFIIndex),
  })

  try {
    await offering.sign(config.pfiDid[customPFIIndex])
    // console.log('Offering signed')
  }
  catch (e) {
    console.log('error', e)
  }
  // offering.sign(config.pfiDid[index % 5])  // Sign with alternating URI

  offering.validate()
  PresentationExchange.validateDefinition({
    presentationDefinition: offering.data.requiredClaims
  })

  // console.log(`Offering ${index + 1} created and validated`)
  return offering
}

// Initialize an array of hardcoded offerings
const hardcodedOfferings: Offering[] = await Promise.all(Array.from({ length: 10 }, (_, i) => createRandomOffering(i)))

export class HardcodedOfferingRepository implements OfferingsApi {
  pfi: BearerDid
  pfiHardcodedOfferings: Offering[]

  constructor(pfi: BearerDid) {
    this.pfi = pfi
    this.pfiHardcodedOfferings = hardcodedOfferings.filter((offering) => offering.metadata.from === pfi.uri)
  }
  // Retrieve a single offering if found
  async getOffering(opts: { id: string }): Promise<Offering | undefined> {
    console.log('call for offerings')
    return this.pfiHardcodedOfferings.find((offering) => offering.id === opts.id)
  }

  // Retrieve a list of offerings
  async getOfferings(): Promise<Offering[] | undefined> {
    console.log('get PFI offerings')
    return this.pfiHardcodedOfferings
  }
}

// Export an instance of the repository
// export const OfferingRepository = new HardcodedOfferingRepository()
