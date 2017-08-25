import { ITestResult } from "../../interfaces/ITestResult";

export class OutputStore {

    public sourceFilePaths: Array<string> = [];
    public lineNumber: number;
    public origionalCode: string;
    public mutatedCode: string;

    public numberOfFailedTests;
    public numberOfPassedTests;

    public passedTestsDescription: Array<String>;
    public failedTestsDescription: Array<String>;

    public setStore (testResult: ITestResult, testFiles: Array<string>){
        this.sourceFilePaths = testFiles;
        this.numberOfPassedTests = testResult.passed;
        this.numberOfFailedTests = testResult.failed;
    }

    public setLineNumber (lineNumber: number): void {
        this.lineNumber = lineNumber;
    }

    public setOrigionalSourceCode (code: string): void {
        const codeLines = code.split("\n");
        this.origionalCode = codeLines[this.lineNumber].trim();
    }

    public setModifiedSourceCode (code: string): void {
        const codeLines = code.split("\n");
        this.mutatedCode = codeLines[this.lineNumber].trim();
    }
}
