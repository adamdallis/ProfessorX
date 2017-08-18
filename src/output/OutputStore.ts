import { ITestResult } from "../../interfaces/ITestResult";

export class OutputStore {

    public static sourceFile: Array<string> = [];
    public static lineNumber = "7";
    public static origionalCode = "return 3 + 4;";
    public static mutatedCode = "return 3 - 4;";

    public static numberOfFailedTests;
    public static numberOfPassedTests;

    public static passedTestsDescription: Array<String> = ["description one", "description two"];
    public static failedTestsDescription: Array<String> = [];

    public static setStore (testResult: ITestResult, testFiles: Array<string>){
        testFiles.forEach((element) => {
            OutputStore.sourceFile = testFiles[element];
        });
        OutputStore.numberOfPassedTests = testResult.passed;
        OutputStore.numberOfFailedTests = testResult.failed;
    }
}
