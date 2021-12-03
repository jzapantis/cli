# Commands
## Crypto Tools
**Options**
```javascript
// METHOD (see dedo_utilities package for latest)
crypticHandler(options: CrypticOptions): any; // <== this method is the main one, in which you can pass required options, and it will parse them and help resolve some of the ambiguity
encryptJson(options: CrypticOptions): Buffer;
decryptJson(options: CrypticOptions): any;
encrypt(options: CrypticOptions): string;
decrypt(options: CrypticOptions): string;
decryptElseEncrypt(options: CrypticOptions): Promise<any>;
// GLOBAL CLASS OPTIONS
export interface CryptoConfigs {
    password: string;
    filePath?: string;
    algorithm?: string;
    bufferEncoding?: any;
    outputEncoding?: any;
    fileHandler?: FileHandler;
    logger: ILogger;
}

// METHOD LEVEL OPTIONS
export interface CrypticOptions {
    value: any;
    password?: string;
    path?: string;
    target?: "fs" | "kv";
    fileName?: string;
    operation: "encrypt" | "decrypt",
    write?: boolean;
    return?: boolean;
}
```
### Encrypt a value
```batch npm run start value=test operation=encrypt fileName=test.txt path=../../../../../data password=safe123 return=true target=fs write=true ```