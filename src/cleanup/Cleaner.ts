import * as fs from "fs";

import { FileHandler } from "../FileHandler/FileHandler";

export class Cleaner {
    static readonly fileExtensionToRemove = FileHandler.M_TEST_FILE_SUFFIX;

    readonly FILE_PATH;
    filesToDelete: Array<string>;

    constructor (filePath: string) {
        this.FILE_PATH = filePath;
    }

    findMutatedTestFiles () {
        this.filesToDelete = fs.readdirSync(this.FILE_PATH);
    }

}