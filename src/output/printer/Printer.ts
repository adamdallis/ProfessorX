import { OutputStore } from "../OutputStore";

export class Printer {

    public readonly LABELS = {
        returnToken: "\n",
        doubleSpaceToken: "  ",
        filePath: "File Path: ",
        lineNumber: "On Line #: ",
        originalSource: "~~~ Source Code Changes ~~~",
        removeToken: " -- ",
        addToken: " ++ ",
        endSourceChanges: "~~~ End of Source Code Changes ~~~",
        passedTests: "Tests Passed (Mutants)",
        failedTests: "Tests Failed (Killed Mutants)",
        mutationScore: "Mutation Score: ",
        percentage: " %"
    };

    private readonly LEADING_EDGE = "~~~~~~~~~~ Professor X ~~~~~~~~~~";

    public printSourceChanges () {
        console.log(this.combineSourceChanges());
    }

    public combineSourceChanges (): string {
        return this.LABELS.returnToken
        + this.LEADING_EDGE
        + this.LABELS.returnToken
        + this.buildSourceFilePath()
        + this.LABELS.returnToken
        + this.LABELS.originalSource
        + this.LABELS.returnToken
        + this.buildOrigionalCode()
        + this.LABELS.returnToken
        + this.buildMutatedCode()
        + this.LABELS.returnToken
        + this.LABELS.returnToken
        + this.LABELS.endSourceChanges
        + this.LABELS.returnToken
        + this.LABELS.returnToken
        + this.buildPassedTests()
        + this.LABELS.returnToken
        + this.buildFailedTests()
        + this.LABELS.returnToken
        + this.buildMutationScore()
        ;
    }

    private buildSourceFilePath (): string {
        let sourceFilePath = "";
        sourceFilePath =  this.LABELS.returnToken + this.LABELS.filePath;
        OutputStore.sourceFiles.forEach((sourceFile) => {
            sourceFilePath += this.LABELS.returnToken;
            sourceFilePath += sourceFile;
            sourceFilePath += this.LABELS.returnToken;
        });
        return sourceFilePath;
    }

    private buildOrigionalCode (): string {
        return this.LABELS.returnToken
        + this.LABELS.lineNumber
        + OutputStore.lineNumber
        + this.LABELS.doubleSpaceToken
        + OutputStore.origionalCode
        + this.LABELS.removeToken;
    }

    private buildMutatedCode (): string {
        return this.LABELS.returnToken
        + this.LABELS.lineNumber
        + OutputStore.lineNumber
        + this.LABELS.doubleSpaceToken
        + OutputStore.mutatedCode
        + this.LABELS.addToken;
    }

    private buildPassedTests (): string {
        return this.LABELS.passedTests
        + this.LABELS.returnToken
        + OutputStore.numberOfPassedTests
        + this.LABELS.returnToken;
    }

    private buildFailedTests (): string {
        return this.LABELS.failedTests
        + this.LABELS.returnToken
        + OutputStore.numberOfFailedTests
        + this.LABELS.returnToken;
    }

    private buildMutationScore (): string {
        return this.LABELS.mutationScore
        + this.LABELS.doubleSpaceToken
        + OutputStore.mutationScore
        + this.LABELS.percentage
        + this.LABELS.returnToken
        ;
    }

    private createLeadingPrintEdge () {
        console.log(this.LEADING_EDGE);
    }
}
