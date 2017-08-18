import * as fs from "fs";

import { FileHandler } from "../FileHandler/FileHandler";

export class Cleaner {
    public static readonly fileExtensionToRemove = FileHandler.M_TEST_FILE_SUFFIX;
    public readonly FILE_PATH;
    public filesToDelete: Array<string>;

    constructor (filePath: string) {
        this.FILE_PATH = filePath;
    }

    public findMutatedTestFiles () {
        this.filesToDelete = fs.readdirSync(this.FILE_PATH);
        console.log(this.filesToDelete);
    }

}
