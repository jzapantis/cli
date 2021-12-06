export interface CLICommandList {
    [key: string]: CommandValue[];
}

export type CommandValue = string;

export interface CLIArgs {
    [key: string]: string;
}

export type ArgParserList = RegExp[]