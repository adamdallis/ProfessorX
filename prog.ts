import * as ts from "typescript";

import { FileReader } from "./FileReader";
import { MutationFinder } from "./MutationFinder";

let obj = new FileReader();
obj.readFile("./sample.ts");
console.log(obj.getSourceCode());
console.log(obj.getSourceFile());
let obj1 = new MutationFinder(obj.getSourceFile());
console.log(obj1.findObjectsOfSyntaxKind(ts.SyntaxKind.PlusToken));

