import { Safe, ILogger } from "dedo_utilities";

export interface EncryptOption {
    targetLocation?: string;
    referenceID?: string;
    encryptionKey?: string;
    value: string;
}

export interface DedoEncryptionManagementConfigs {
    safe: Safe;
    logger: ILogger;
    encryptionKey?: string;
}