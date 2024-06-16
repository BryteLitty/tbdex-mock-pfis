import type { LogLevelDesc } from 'loglevel';
import 'dotenv/config';
import { BearerDid } from '@web5/dids';
export type Environment = 'local' | 'staging' | 'production';
export type Config = {
    env: Environment;
    logLevel: LogLevelDesc;
    host: string[];
    port: string[];
    pfiDid: BearerDid[];
    allowlist: string[];
    pinPaymentsKey: string;
};
export declare const config: Config;
