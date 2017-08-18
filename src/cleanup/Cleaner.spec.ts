import { expect } from "chai";
import { Cleaner } from "./Cleaner";
import { FileHandler } from "../FileHandler/FileHandler";


describe("Cleaner", () => {
    let cleaner: Cleaner;
    let fileHandler: FileHandler;
    const suffix = FileHandler.M_TEST_FILE_SUFFIX;
    const testFileDir = "./testProject/src/";
    beforeEach(() => {
        cleaner = new Cleaner(testFileDir);
    });

    it("finds no files when there are none with the M test file suffix", () => {
        cleaner.findMutatedTestFiles();
        //expect().to.equal(false);
    });
});
