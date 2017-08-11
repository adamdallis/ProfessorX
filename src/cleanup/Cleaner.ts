import * as fs from "fs";

import { FileHandler } from "../FileHandler/FileHandler";
import { TestFileHandler } from "../testFileHandler/TestFileHandler";

export class Cleaner extends TestFileHandler {
    static readonly fileExtensionToRemove = FileHandler.M_TEST_FILE_SUFFIX;

    readonly FILE_PATH;
    filesToDelete: Array<string>;

    constructor (filePath: string) {
        super();
        this.FILE_PATH = filePath;
    }

    removeMutatedTestFiles () {
        this.filesToDelete = fs.readdirSync(this.FILE_PATH);
        
    }
}