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
console.log("|######################################################################################");
console.log("|####          ###########               ###          ##########                   #####");
console.log("|#### ######### ########## ################# ########  ######### ################# #####");
console.log("|#### ########## ######### ################# #########  ######## ################# #####");
console.log("|#### ########### ######## ################# ##########  ####### ################# #####");
console.log("|#### ############ ####### ################# ###########  ###### ################# #####");
console.log("|#### ############# ###### ################# ############  ##### ################# #####");
console.log("|#### ############## ##### ################# #############  #### ################# #####");
console.log("|#### ###############  ###     ############# ##############  ### ################# #####");
console.log("|#### ################ ###     ############# ############### ### ################# #####");
console.log("|#### ###############  ### ################# ##############  ### ################# #####");
console.log("|#### ############## ##### ################# ############# ##### ################# #####");
console.log("|#### ############# ###### ################# ############ ###### ################# #####");
console.log("|#### ############ ####### ################# ########### ####### ################# #####");
console.log("|#### ########### ######## ################# ########## ######## ################# #####");
console.log("|#### ########## ######### ################# ######### ######### ################# #####");
console.log("|####           ##########               ###          ##########                   #####");
console.log("|#######################################################################################");
console.log("| Copyright 2021 Joseph Jerry Zapantis                                             #####");
console.log("|#######################################################################################");
'use strict';
const path = require("path");
let envVars;
try {
    const envVarFileName = `config-local`;
    const envVarPath = path.resolve(__dirname, `./config/env-vars/${envVarFileName}`);
    console.log("ATTEMPTING TO READ LOCAL ENV VARS FROM: ", envVarPath);
    envVars = require(envVarPath).default || {};
}
catch (error) {
    console.log(error);
}
/** Set up Dependency Injection */
const factory_1 = require("./factory");
const services_1 = require("./services");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.NODE_ENV) {
            process.env.NODE_ENV = 'local';
        }
        try {
            yield services_1.cli();
            return true;
        }
        catch (error) {
            console.log("ERROR IN APP START");
            console.log(error);
            throw error;
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("APPLYING LOCAL ENV VARS IF THEY EXIST");
    if (envVars) {
        process.env = Object.assign(Object.assign({}, process.env), envVars);
    }
    else {
        console.log("DID NOT LOAD LOCAL ENV VARS");
    }
    yield factory_1.Factory.start();
    yield start();
}))().catch(err => {
    console.log("ERROR STARTING");
    console.log(err);
    process.exit(1);
});
process.on('message', (msg) => {
    console.log("MESSAGE");
    console.log(msg);
});
process.on('uncaughtException', (err) => {
    console.log(err);
    process.exit(1);
});
process.on('beforeExit', (code) => {
    console.log(`Process beforeExit event with code: ${code}`);
    console.log(`Process ID: ${process.pid}`);
    const resourceUsage = process.resourceUsage();
    const usageIORead = resourceUsage.fsRead;
    const usageIOWrite = resourceUsage.fsWrite;
    const sharedMemory = resourceUsage.sharedMemorySize;
    console.log(`usageIORead: ${usageIORead}`);
    console.log(`usageIOWrite: ${usageIOWrite}`);
    console.log(`sharedMemory: ${sharedMemory}`);
});
process.on('exit', (code) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`About to exit with code: ${code}`);
}));
