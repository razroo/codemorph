import { EditCodeBlockInput } from "../interfaces/edit-typescript.interface";

export function addFunction(editCodeBlockInput: EditCodeBlockInput): void {
    const sourceFile = editCodeBlockInput.sourceFile;

    sourceFile.addFunction({
      name: editCodeBlockInput.name,
      returnType: editCodeBlockInput.type,
      statements: editCodeBlockInput.codeBlock,
      isExported: editCodeBlockInput.isExported ? editCodeBlockInput.isExported : true,
      parameters: typeof editCodeBlockInput.parameters === 'string' ? JSON.parse(editCodeBlockInput.parameters) : editCodeBlockInput.parameters
    });
}