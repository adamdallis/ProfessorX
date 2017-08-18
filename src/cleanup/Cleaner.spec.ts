import { expect } from "chai";
import { Cleaner } from "./Cleaner";
import { FileHandler } from "../FileHandler/FileHandler";


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

    it("finds 2 files when there are 2 with the M test file suffix", () => {
        cleaner = new Cleaner(testFileDir);
        cleaner.findMutatedFiles();
        expect(cleaner.filesToDelete.length).to.equal(2);
    });
});
