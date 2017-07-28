import { OutputStore } from "../OutputStore";

export class Printer {

    private readonly LABELS = {
        returnToken: "\n",
        doubleSpaceToken: "  ",
        filePath: "Mutated File Path: ",
        lineNumber: "On Line #: ",
        originalSource: "~~~ Source Code Changes ~~~",
        removeToken: " -- ",
        mutatedSource: "--- Mutated Source Code ---",
        addToken: " ++ ",
        passedTests: "Tests Passed (Mutants)",
        failedTests: "Tests Failed (Killed Mutants)"
    };

    private readonly LEADING_EDGE = "~~~~~~~~~~ Professor X ~~~~~~~~~~";

    printSourceChanges () {
        console.log(this.combineSourceChanges());
    }

    combineSourceChanges (): string {
        return this.LABELS.returnToken
        + this.LEADING_EDGE
        + this.LABELS.returnToken
        + this.buildSourceFilePath()
        + this.LABELS.returnToken
        + this.buildOrigionalCode()
        + this.LABELS.returnToken
        + this.buildMutatedCode()
        + this.LABELS.returnToken
        + this.buildPassedTests()
        + this.LABELS.returnToken
        + this.buildFailedTests()
        ;
    }

    private buildSourceFilePath (): string {
        return this.LABELS.returnToken
        + this.LABELS.filePath
        + OutputStore.sourceFile;
    }

    private buildOrigionalCode (): string {
        return this.LABELS.originalSource
        + this.LABELS.returnToken
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
        + this.LABELS.returnToken
        + OutputStore.passedTestsDescription;
    }

    private buildFailedTests (): string {
        return this.LABELS.failedTests
        + this.LABELS.returnToken
        + OutputStore.numberOfFailedTests
        + this.LABELS.returnToken
        + OutputStore.failedTestsDescription;
    }

    private createLeadingPrintEdge () {
        console.log(this.LEADING_EDGE);
    }
}