import * as ts from "typescript";

export interface IsyntaxMutationMap {
    [syntaxKind: number]: Array<ts.SyntaxKind>;
}