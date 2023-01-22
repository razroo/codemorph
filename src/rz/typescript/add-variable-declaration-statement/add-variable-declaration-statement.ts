import { EditCodeBlockInput } from "../interfaces/edit-typescript.interface";

// right now assumes all methods will be private
export function addVariableDeclarationStatement(editCodeBlockInput: EditCodeBlockInput): void {
  const sourceFile = editCodeBlockInput.sourceFile;
  sourceFile.insertVariableStatement(0, {
    hasDeclareKeyword: true,
    declarations: [{
      name: editCodeBlockInput.codeBlock,
      type: editCodeBlockInput.type
    }]
  });
}