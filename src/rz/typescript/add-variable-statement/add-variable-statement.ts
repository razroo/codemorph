import { VariableDeclarationKind } from "ts-morph";
import { EditCodeBlockInput } from "../interfaces/edit-typescript.interface";

// right now assumes all methods will be private
export function addVariableStatement(editCodeBlockInput: EditCodeBlockInput): void {
    console.log('add variale calls');
  const sourceFile = editCodeBlockInput.sourceFile;
  sourceFile.insertVariableStatement(0, {
    declarationKind: VariableDeclarationKind.Const,
    declarations: [{
      name: editCodeBlockInput.name as string,
      initializer: editCodeBlockInput.codeBlock
    }]
  });
}