/** Resolve any dependencies in this file and pass it to the injector for safe keeping. */
import { Safe, ILogger, Injector, LoggerOptions, PinoLogger, FileHandler, CryptoConfigs } from "dedo_utilities";
import * as path from 'path';
import { DedoEncryptionManagement } from "./serivce";
import { DedoEncryptionManagementConfigs } from "lib";
export class Factory {
    static async start() {

        const loggerOptions: LoggerOptions = {
            appInsightsLogEnabled: (process.env["appInsightsLogEnabled"] === "true" ? true : false) || false,
            transportEnabled: (process.env["transportEnabled"] === "true" ? true : false) || false,
            env: process.env.NODE_ENV,
            appInsightsInstrumentationKey: process.env["appInsightsInstrumentationKey"],
            filePath: path.resolve(__dirname, process.env["LOG_PATH"]),
            levels: {
                fatal: {
                    enabled: (process.env["fatal_log_enabled"] === "true" ? true : false),
                    fileName: "./fatal"
                },
                error: {
                    enabled: (process.env["error_log_enabled"] === "true" ? true : false),
                    fileName: "./error"
                },
                warn: {
                    enabled: (process.env["warn_log_enabled"] === "true" ? true : false),
                    fileName: "./warn"
                },
                info: {
                    enabled: (process.env["info_log_enabled"] === "true" ? true : false),
                    fileName: "./info"
                },
                debug: {
                    enabled: (process.env["debug_log_enabled"] === "true" ? true : false),
                    fileName: "./debug"
                },
                trace: {
                    enabled: (process.env["trace_log_enabled"] === "true" ? true : false),
                    fileName: "./trace"
                },
            }
        }

        const logger: ILogger = new PinoLogger(loggerOptions);
        await logger["init"]();
        logger.info("LoggerInit")
        Injector.bind(logger, 'Logger');

        const fileHandler = new FileHandler();
        Injector.bind(fileHandler, "FileHandler");

        const cryptoOptions: CryptoConfigs = {
            password: process.env["ENCRYPTION_PASSWORD"],
            logger: logger,
            fileHandler: fileHandler
        };

        const safe = new Safe(cryptoOptions);
        Injector.bind(safe, "Safe");

        const encryptServiceOptions: DedoEncryptionManagementConfigs = {
            safe: safe,
            encryptionKey: process.env["ENCRYPTION_PASSWORD"],
            logger: logger
        }
        const encryptService = new DedoEncryptionManagement(encryptServiceOptions);
        Injector.bind(encryptService, "DedoEncryptionManagement");

    }
}
