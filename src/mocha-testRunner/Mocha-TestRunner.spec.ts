import { MochaTestRunner } from "./Mocha-TestRunner";
import * as ts from "typescript";
import { expect } from "chai";

describe("Testing MutationFactory", () => {
    let testRunner: MochaTestRunner;
    beforeEach(() => {
        testRunner = new MochaTestRunner();
    });

    it("should return a Test suite result", (done) => {
        testRunner.run();
        expect(testRunner.testResult).to.equal(true);
        done();
       // expect(testRunner).to.equal(expected);
    });


    // it("", async( () => {
    //     const tempTimeout = setTimeout;
    //     comp.inDropArea = true;
    //     fixture.detectChanges();
    //     comp.configuratorVisible = true;
    //     const newEvent = new Event("click");
    //     comp.onCogwheelPress(newEvent);
    //     tick(300);
    //     expected = false;
    //     actual = comp.configuratorVisible;
    //     expect(expected).toEqual(actual);
    // }));

});