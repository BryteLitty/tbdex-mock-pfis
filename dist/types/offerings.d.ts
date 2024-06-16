import { OfferingsApi, Offering, OfferingData } from '@tbdex/http-server';
import { BearerDid } from '@web5/dids';
export declare const offeringDataTBDollarsToUSDC: OfferingData;
export declare const offeringDataUSDToGHS: OfferingData;
export declare const offeringDataUSDToKES: OfferingData;
export declare const offeringDataKESToZAR: OfferingData;
export declare const offeringDataGHSToUSDC: OfferingData;
export declare const offeringDataUSDToNGN: OfferingData;
export declare const offeringDataZARToBTC: OfferingData;
export declare const offeringDataEURToZAR: OfferingData;
export declare const offeringDataGBPToCAD: OfferingData;
export declare const offeringDataUSDToGBP: OfferingData;
export declare const offeringDataAUDToJPY: OfferingData;
export declare const offeringDataZARToNGN: OfferingData;
export declare const offeringDataGHSToKES: OfferingData;
export declare const offeringDataMADToEGP: OfferingData;
export declare const offeringDataGHSToNGN: OfferingData;
export declare class HardcodedOfferingRepository implements OfferingsApi {
    pfi: BearerDid;
    pfiHardcodedOfferings: Offering[];
    constructor(pfi: BearerDid);
    getOffering(opts: {
        id: string;
    }): Promise<Offering | undefined>;
    getOfferings(): Promise<Offering[] | undefined>;
}
