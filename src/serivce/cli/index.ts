import { CLIJobs } from "../../lib";
import * as cliCommands from "../../serivce";
import { Injector } from "dedo_utilities";
import { DedoEncryptionManagement } from "../encrypt";

const start = new Date();

export const cli = async () => {
    try {
        
        const params = getCLIParams();
        // new Promise(async (resolve, reject) => {
        //     try {
        //         const cliRes = await cliCommands[params.job](params);
        //         resolve(cliRes);
        //     } catch (error) {
        //         console.log("ERROR RUNNING CLI COMMAND");
        //         throw error;
        //     }
        // }).then((cliRes) => {
        //     return cliRes;
        // }).catch((error: Error) => {
        //     throw error;
        // });
        
        const dedoEncryptionManagement = Injector.get<DedoEncryptionManagement>('DedoEncryptionManagement');
        dedoEncryptionManagement.crypticHandler(params);

    } catch (error) {
        console.log(error)
        exitScript(error);
    }
}

function getCLIParams() {

    const params: CLIJobs = {};
    const envRegex = new RegExp(`env=`);
    const jobRegex = new RegExp(`job=`);
    const elseRegex = new RegExp(`=`);

    for (let i = 2; i < process.argv.length; i++) {
        console.log(process.argv[i])
        const curParamSplit = process.argv[i].split("=");
        if (envRegex.test(process.argv[i])) {
            params["env"] = curParamSplit[1];
        } else if (jobRegex.test(process.argv[i])) {
            params["job"] = curParamSplit[1];
        } else if (elseRegex.test(process.argv[i])) {
            params[curParamSplit[0]] = curParamSplit[1];
        } else {
            console.log("--------------")
            console.log(process.argv[i]);
            throw new Error("UNHANDLED CLI COMMAND");
        }
    }
    return params;
}

export function exitScript(err, res?) {
    if (err) {
        console.log("ERROR RUNNING DEDO CLI COMMAND");
        console.log(err);
        process.exit(1);
    } else {
        console.log("DEDO CLI COMMAND COMPLETED");
        const end = new Date();
        console.log(`CLI STARTED: ${start} and COMPLETED @ ${end}`);
        console.log("CLI OUTPUT");
        console.log(res);
        console.log("EXITING CLI");
        process.exit(0);
    }
}

