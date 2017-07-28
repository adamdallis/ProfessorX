import { MutationFactory } from "./mutationFactory/MutationFactory";
import * as ts from "typescript";

const mutationFactory = new MutationFactory();
const newToken = mutationFactory.getSingleMutation(ts.SyntaxKind.PlusToken);
console.log(newToken);
