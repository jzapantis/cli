console.log("|######################################################################################")
console.log("|####          ###########               ###          ##########                   #####")
console.log("|#### ######### ########## ################# ########  ######### ################# #####")
console.log("|#### ########## ######### ################# #########  ######## ################# #####")
console.log("|#### ########### ######## ################# ##########  ####### ################# #####")
console.log("|#### ############ ####### ################# ###########  ###### ################# #####")
console.log("|#### ############# ###### ################# ############  ##### ################# #####")
console.log("|#### ############## ##### ################# #############  #### ################# #####")
console.log("|#### ###############  ###     ############# ##############  ### ################# #####")
console.log("|#### ################ ###     ############# ############### ### ################# #####")
console.log("|#### ###############  ### ################# ##############  ### ################# #####")
console.log("|#### ############## ##### ################# ############# ##### ################# #####")
console.log("|#### ############# ###### ################# ############ ###### ################# #####")
console.log("|#### ############ ####### ################# ########### ####### ################# #####")
console.log("|#### ########### ######## ################# ########## ######## ################# #####")
console.log("|#### ########## ######### ################# ######### ######### ################# #####")
console.log("|####           ##########               ###          ##########                   #####")
console.log("|#######################################################################################")
console.log("| Copyright 2021 Joseph Jerry Zapantis                                             #####")
console.log("|#######################################################################################");
'use strict';
let envVars;
try {
    envVars = require("./config/env-vars/config").default || undefined;
} catch (error) {
    console.log(error);
}
/** Set up Dependency Injection */
import { Injector, Logger } from 'dedo_utilities';
import { Factory } from './factory';
import { cli } from "./serivce";

async function start(): Promise<boolean> {

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'local';
    }

    try {
        const logger = Injector.get<Logger>('Logger');
        await cli();
        logger.info("GOING TO INITIALIZE SERVER");
        return true;
    } catch (error) {
        console.log("ERROR IN APP START");
        console.log(error);
        throw error;
    }

}

(async () => {
    console.log("APPLYING LOCAL ENV VARS IF THEY EXIST");
    if (envVars) {
        process.env = { ...process.env, ...envVars };
    } else {
        console.log("DID NOT LOAD LOCAL ENV VARS");
    }
    await Factory.start();
    await start();
})().catch(err => {
    console.log("ERROR STARTING");
    console.log(err);
    process.exit(1);
});

process.on('message', (msg) => {
    console.log("MESSAGE");
    console.log(msg);
})

process.on('uncaughtException', (err) => {
    console.log(err);
    process.exit(1);
});

process.on('beforeExit', (code) => {
    console.log(`Process beforeExit event with code: ${code}`);
    console.log(`Process ID: ${process.pid}`);
    const resourceUsage: NodeJS.ResourceUsage = process.resourceUsage();
    const usageIORead: number = resourceUsage.fsRead;
    const usageIOWrite: number = resourceUsage.fsWrite;
    const sharedMemory: number = resourceUsage.sharedMemorySize;
    console.log(`usageIORead: ${usageIORead}`);
    console.log(`usageIOWrite: ${usageIOWrite}`);
    console.log(`sharedMemory: ${sharedMemory}`);
});

process.on('exit', async (code) => {
    console.log(`About to exit with code: ${code}`);
});
