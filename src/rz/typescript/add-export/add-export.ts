import { EditCodeBlockInput } from "../interfaces/edit-typescript.interface";

// importName: "{ MatPaginator }",
// importPath: "@angular/material/paginator",
export function addExportToTypescriptFile(editCodeBlockInput: EditCodeBlockInput): void {
  editCodeBlockInput.sourceFile.addExportDeclaration({
    moduleSpecifier: editCodeBlockInput.path,
    namespaceExport: editCodeBlockInput.codeBlock as string,
  });
}