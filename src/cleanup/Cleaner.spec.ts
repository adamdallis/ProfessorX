import { expect } from "chai";
import { Cleaner } from "./Cleaner";
import { FileHandler } from "../FileHandler/FileHandler";
import * as fs from "fs";


describe("Cleaner", () => {
    let cleaner: Cleaner;
    const suffix = FileHandler.M_TEST_FILE_SUFFIX;
    const testFileDir = "./testProject/src/";
    beforeEach(() => {
    });

    it("finds no files when there are none with the M test file suffix", () => {
        cleaner = new Cleaner("./testProject/");
        cleaner.findMutatedFiles();
        expect(cleaner.filesToDelete.length).to.equal(0);
    });

    //TEST SKIPPED AS IT BREAKS THE RUNNING OF PROFESSOR X
    //DUE TO BUG OF RUNNING TEST PROJECT TEST, IT RUNS SOURCE TESTS TOO
    xit("after method completes, there should be no M files left in the specified dir", () => {
        cleaner = new Cleaner(testFileDir);
        cleaner.deleteMutatedFiles(cleaner.findMutatedFiles());
        const fileList = fs.readdirSync(testFileDir);
        const mutatedFiles = [];
        for (let i = 0; i < fileList.length; i++) {
            if (fileList[i].indexOf(cleaner.fileExtensionToRemove) >= 0){
                mutatedFiles.push(fileList[i]);
            }
        }
        console.log(mutatedFiles);
        expect(mutatedFiles.length).to.equal(0);
    });
});
