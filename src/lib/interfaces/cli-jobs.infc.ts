export interface CLIJobs {
    env?: string;
    job?: string;
    target?: string;
    source?: string;
}

export interface EncryptCLI extends CLIJobs {
    encryptionTokens: SafeTokens;
    secret: string;
}

export interface SafeTokens {
    key: string;
    value: string;
}