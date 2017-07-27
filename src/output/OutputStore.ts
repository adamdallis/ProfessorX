
export class OutputStore {
    // static sourceFile: string;
    // static lineNumber: number;
    // static origionalCode: string;
    // static mutatedCode: string;

    static sourceFile = "source.ts";
    static lineNumber = "7";
    static origionalCode = "return 3 + 4;";
    static mutatedCode = "return 3 - 4;";
    //TODO
    static numberOfFailedTests;
    static numberOfPassedTests;

    static passedTestsDescription: Array<String> = ["description one", "description two"];
    static failedTestsDescription: Array<String> = [];
}