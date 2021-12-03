import { DedoEncryptionManagementConfigs } from "../../lib";
import { ILogger, Safe, CrypticOptions } from "dedo_utilities";

export class DedoEncryptionManagement {
    private logger: ILogger;
    private safe: Safe;
    constructor(configs: DedoEncryptionManagementConfigs) {
        this.logger = configs.logger;
        this.safe = configs.safe;
    }
    public crypticHandler(params) {
        try {
            const options: CrypticOptions = {
                value: params["value"] || undefined,
                operation: params["operation"] || undefined,
                fileName: params["fileName"] || undefined,
                path: params["path"] || undefined,
                password: params["password"] || undefined,
                return: (params["return"] === 'true' ? true : false) || false,
                target: params["target"],
                write: (params["write"] === 'true' ? true : false) || false
            }
            const encryptedValue = this.safe.crypticHandler(options);
            return encryptedValue;
        } catch (error) {
            this.logger.error("ERROR ENCRYPTING");
            console.log(error);
            throw error;
        }
    }
}