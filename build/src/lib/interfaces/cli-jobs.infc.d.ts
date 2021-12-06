export interface CLICommandList {
    [key: string]: CommandValue[];
}
export declare type CommandValue = string;
export interface CLIArgs {
    [key: string]: string;
}
export declare type ArgParserList = RegExp[];
