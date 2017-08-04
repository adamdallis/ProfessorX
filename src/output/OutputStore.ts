import { ITestResult } from "../../interfaces/ItestResult";

export class OutputStore {

    static sourceFile: Array<string> = [];
    static lineNumber = "7";
    static origionalCode = "return 3 + 4;";
    static mutatedCode = "return 3 - 4;";

    static numberOfFailedTests;
    static numberOfPassedTests;

    static passedTestsDescription: Array<String> = ["description one", "description two"];
    static failedTestsDescription: Array<String> = [];

    static setStore (testResult: ITestResult, testFiles: Array<string>){
        testFiles.forEach((element) => {
            OutputStore.sourceFile = testFiles[element];
        });
        OutputStore.numberOfPassedTests = testResult.passed;
        OutputStore.numberOfFailedTests = testResult.failed;
    }
}