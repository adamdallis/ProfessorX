import { ITestResult } from "../../interfaces/ITestResult";
import * as fs from "fs";
import { FileHandler } from "../FileHandler/FileHandler";

export class TestFileHandler {

    public testDirPath = "./testProject/src/";
    public testFiles: Array<string> = [];

    public readTestFileDirectory () {
        let fileNames;
        fileNames = fs.readdirSync(this.testDirPath);
        this.addFiles(fileNames);
    }

    public addFiles (arrayOfFileNames: Array<string>) {
        arrayOfFileNames.forEach((fileName) => {
            if (this.isTestFile(fileName)) {
                this.testFiles.push(this.testDirPath + fileName);
            }
        });
        if (this.testFiles.length === 0){
            throw new Error("Aborting test run, no test files found at: " + this.testDirPath);
        }
    }

    public isTestFile (filePath: string): boolean {
        return filePath.indexOf(FileHandler.M_TEST_FILE_SUFFIX) >= 0;
    }
}
