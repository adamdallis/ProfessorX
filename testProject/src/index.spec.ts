import { HelloWorld } from "./index";

import * as ts from "typescript";
import { expect } from "chai";

describe("Testing MutationFactory", () => {
    let hello: HelloWorld;
    beforeEach(() => {
        hello = new HelloWorld();
    });

    it("inputing 1 and 0 should return 1", () => {
        const expected = 1;
        const actual = hello.addNumbers(1, 0);
        expect(actual).to.equal(expected);
    });

    it("inputing negative 2 and 2 should return 0", () => {
        const expected = 0;
        const actual = hello.addNumbers(-2, 2);
        expect(actual).to.equal(expected);
    });

});