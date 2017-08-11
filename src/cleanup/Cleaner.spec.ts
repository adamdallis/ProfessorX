import { expect } from "chai";
import { Cleaner } from "./Cleaner";


describe("Cleaner", () => {
    let cleaner: Cleaner;
    beforeEach(() => {
        cleaner = new Cleaner("./testProject/src/");
    });

    it("scans dir and gets test files", () => {
        
        expect(testRunner.addFiles()).to.equal(false);
    });
});