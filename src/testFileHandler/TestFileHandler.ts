import { ITestResult } from "../../interfaces/ITestResult";
import * as fs from "fs";

export class TestFileHandler {

    testDirPath = "C:/git/ProfessorX/testProject/src/";
    testFiles: Array<string> = [];

    readTestFileDirectory () {
        this.addFiles(fs.readdirSync(this.testDirPath));
    }

    addFiles (arrayOfFileNames: Array<string>) {
        arrayOfFileNames.forEach((fileName) => {
            if (this.isTestFile(fileName)) {
                this.testFiles.push(this.testDirPath + fileName);
            }
        });
        if (this.testFiles.length === 0){
            throw new Error("Aborting test run, no test files found at: " + this.testDirPath);
        }
    }

    isTestFile (filePath: string): boolean {
        return filePath.indexOf(".spec") >= 0;
    }
}