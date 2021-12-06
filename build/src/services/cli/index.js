"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitScript = exports.cli = void 0;
const commands_1 = require("../../config/commands");
const transduce_1 = require("../transduce");
const start = new Date();
const cli = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const argParser = buildArgParser();
        const params = getCLIParams(argParser);
        let cliRes = null;
        if (params['job'] === 'transduce') {
            cliRes = transduce_1.transduce();
        }
        exitScript(null, cliRes);
    }
    catch (error) {
        console.log(error);
        exitScript(error);
    }
});
exports.cli = cli;
function buildArgParser() {
    const regExParserList = Object.keys(commands_1.commandList).map((curAvailableCommand) => {
        return new RegExp(curAvailableCommand);
    });
    return regExParserList;
}
function getCLIParams(argParser) {
    const params = {};
    for (let i = 2; i < process.argv.length; i++) {
        console.log('processing argument ' + process.argv[i]);
        const curParamSplit = process.argv[i].split("=");
        console.log(curParamSplit);
        const matchingArgs = argParser.filter((curArg) => {
            return curArg.test(curParamSplit[0]);
        });
        if (matchingArgs.length = 1) {
            params[curParamSplit[0]] = curParamSplit[1];
        }
        else {
            console.log("UNABLE TO CONFIDENTLY RESOLVE CLI ARGUMENT");
        }
    }
    return params;
}
function exitScript(err, res) {
    if (err) {
        console.log("ERROR RUNNING CLI COMMAND");
        console.log(err);
        process.exit(1);
    }
    else {
        console.log("CLI COMMAND COMPLETED");
        const end = new Date();
        console.log(`CLI STARTED: ${start} and COMPLETED @ ${end}`);
        console.log("CLI OUTPUT");
        console.log(res);
        console.log("EXITING CLI");
        process.exit(0);
    }
}
exports.exitScript = exitScript;
