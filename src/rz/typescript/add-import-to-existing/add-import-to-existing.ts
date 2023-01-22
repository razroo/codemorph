import { EditCodeBlockInput } from "../interfaces/edit-typescript.interface";

export function addImportsToExisting(editCodeBlockInput: EditCodeBlockInput): void {
  const importToModify = editCodeBlockInput.sourceFile.getImportDeclarations()
    .filter(importDeclartation => {
      return importDeclartation.getModuleSpecifierValue() === editCodeBlockInput.path
    })

  // Assumes that imports will be comma separated  
  const namedImports = editCodeBlockInput.codeBlock.split(',');
  importToModify[0].addNamedImports(namedImports);
}