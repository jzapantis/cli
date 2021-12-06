'use strict';
const path = require("path");
let envVars;
try {
    const envVarFileName = `config-local`;
    const envVarPath = path.resolve(__dirname,`./config/env-vars/${envVarFileName}`);
    console.log("ATTEMPTING TO READ LOCAL ENV VARS FROM: ", envVarPath);
    envVars = require(envVarPath).default || {};
} catch (error) {
    console.log(error);
}
/** Set up Dependency Injection */
import { Factory } from './factory';
import { cli } from "./services";

async function start(): Promise<boolean> {

    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'local';
    }

    try {
        await cli();
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
