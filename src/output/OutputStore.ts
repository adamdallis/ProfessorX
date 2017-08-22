import { ITestResult } from "../../interfaces/ITestResult";

export class OutputStore {

    public static sourceFiles: Array<string> = [];
    public static lineNumber: number;
    public static origionalCode: string;
    public static mutatedCode: string;

    public static numberOfFailedTests;
    public static numberOfPassedTests;

    public static setNumberOfTests (testResult: ITestResult, testFiles: Array<string>){
        OutputStore.numberOfPassedTests = testResult.passed;
        OutputStore.numberOfFailedTests = testResult.failed;
    }

    public static setMutatedSourceFile (sourceFile: string) {
        OutputStore.sourceFiles.push(sourceFile);
    }

    public static setLineNumber (sourceCode: string, startOfMutation: number): void {
        let lineNumber = 0;
        for (let i = 0; i < startOfMutation; i++) {
            if (sourceCode.charAt(i) === "\n"){
                lineNumber ++;
            }
        }
        OutputStore.lineNumber = lineNumber;
    }

    public static setOrigionalSourceCode (inputCode: string, startOfMutation: number, isOrigionalCode: boolean): void {
        OutputStore.setLineNumber(inputCode, startOfMutation);

        const code = [];
        let lineNumber = 0;
        for (let i = 0; i < inputCode.length; i++) {
            if (code[lineNumber] === void 0){
                code[lineNumber] = inputCode.charAt(i);
            }else{
                code[lineNumber] += inputCode.charAt(i);
            }
            if (inputCode.charAt(i) === "\n"){
                lineNumber ++;
            }
        }
        if (isOrigionalCode){
            OutputStore.origionalCode = code[OutputStore.lineNumber].trim();
        } else {
            OutputStore.mutatedCode = code[OutputStore.lineNumber].trim();
        }
    }
}
