import { CLICommandList, CLIArgs, ArgParserList } from "../../lib";
import { commandList } from "../../config/commands";
import { transduce } from "../transduce";
const start = new Date();

export const cli = async () => {
    try {

        const argParser: ArgParserList = buildArgParser();
        const params = getCLIParams(argParser);

        let cliRes = null;

        if (params['job'] === 'transduce') {
            cliRes = transduce();
        }

        exitScript(null, cliRes);


    } catch (error) {
        console.log(error)
        exitScript(error);
    }
}

function buildArgParser(): ArgParserList {
    const regExParserList = Object.keys(commandList).map((curAvailableCommand: string) => {
        return new RegExp(curAvailableCommand);
    })
    return regExParserList
}

function getCLIParams(argParser: ArgParserList): CLIArgs {

    const params: CLIArgs = {};

    for (let i = 2; i < process.argv.length; i++) {
        console.log('processing argument ' + process.argv[i]);

        const curParamSplit = process.argv[i].split("=");
        console.log(curParamSplit);
        const matchingArgs = argParser.filter((curArg: RegExp) => {
            return curArg.test(curParamSplit[0]);
        });
        if (matchingArgs.length = 1) {
            params[curParamSplit[0]] = curParamSplit[1]
        } else {
            console.log("UNABLE TO CONFIDENTLY RESOLVE CLI ARGUMENT")
        }
    }
    return params;
}

export function exitScript(err, res?) {
    if (err) {
        console.log("ERROR RUNNING CLI COMMAND");
        console.log(err);
        process.exit(1);
    } else {
        console.log("CLI COMMAND COMPLETED");
        const end = new Date();
        console.log(`CLI STARTED: ${start} and COMPLETED @ ${end}`);
        console.log("CLI OUTPUT");
        console.log(res);
        console.log("EXITING CLI");
        process.exit(0);
    }
}

