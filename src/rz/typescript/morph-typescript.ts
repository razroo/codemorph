import { Project, ScriptTarget, SourceFile, SyntaxKind } from "ts-morph";
import { EditFile, EditInput } from "../morph/interfaces/morph.interface";
import { addClassMethod } from "./add-class-method/add-class-method";
import { addConstructorMethod } from "./add-constructor-method/add-constructor-method";
import { addExportToTypescriptFile } from "./add-export/add-export";
import { addFunction } from "./add-function/add-function";
import { addImportsToExisting } from "./add-import-to-existing/add-import-to-existing";
import { addVariableDeclarationStatement } from "./add-variable-declaration-statement/add-variable-declaration-statement";
import { addNgModuleImport } from "./angular-typescript/add-ngmodule-import/ngmodule-imports";
import { addNgModuleItem, addNgModuleItemToSpec } from "./angular-typescript/add-ngmodule-item/add-ngmodule-item";
import { EditCodeBlockInput } from "./interfaces/edit-typescript.interface";
import { addToVariableObject } from "./variable-statement/variable-statement";

// methodToInsertInto e.g. 'ngAfterViewInit'
// codeBeingAdded e.g. 'this.dataSource.paginator = this.paginator;'
function insertCodeIntoClassMethod(editCodeBlockInput: EditCodeBlockInput): void {
  const classDeclaration = editCodeBlockInput.sourceFile.getClasses()[0];
  const currentBodyText = classDeclaration.getInstanceMethod((editCodeBlockInput as any).nodeToInsertInto)?.getBodyText();
  classDeclaration.getInstanceMethod((editCodeBlockInput as any).nodeToInsertInto)?.setBodyText(
    `${currentBodyText}
    ${editCodeBlockInput.codeBlock}`)
}

// importName: "{ MatPaginator }",
// importPath: "@angular/material/paginator",
function insertImportToTypescriptFile(editCodeBlockInput: EditCodeBlockInput): void {
  editCodeBlockInput.sourceFile.addImportDeclaration({
    defaultImport: editCodeBlockInput.codeBlock as string,
    moduleSpecifier: editCodeBlockInput.path as any,
  });
}

// e.g. replaces import { environment } from './environments/environment';
// with import { environment } from "@common-environments";
function editTypescriptImport(editCodeBlockInput: EditCodeBlockInput): void {
  const testImport = editCodeBlockInput.sourceFile.getImportDeclarations()
    .filter(importDeclartation => {
      const namedImports = importDeclartation.getNamedImports();
      const namedImportsArr = namedImports.filter(namedImport => namedImport.getText() === editCodeBlockInput.codeBlock)
      return namedImportsArr.length > 0;
    })
  
  testImport[0].setModuleSpecifier((editCodeBlockInput as any).path);
}

// for now the index is at 0 and will always assume to insert at beginning of file
// class decleration also known as a property
function insertDeclarationIntoClass(editCodeBlockInput: EditCodeBlockInput): void {
  const sourceFile = editCodeBlockInput.sourceFile;
  const classDeclaration = sourceFile.getFirstDescendantByKindOrThrow(SyntaxKind.ClassDeclaration);

  classDeclaration.insertProperty(0, {
    name: editCodeBlockInput.codeBlock as string,
    type: editCodeBlockInput.type
  });
}

function formatTypescriptFileAndReturnString(sourceFile: SourceFile): string {
  sourceFile.formatText({
    indentSize: 2
  });

  return sourceFile.getText();
}

export function morphTypescript(editTypescriptInput: EditInput): string {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      target: ScriptTarget.ES2019,
      skipAddingFilesFromTsConfig: true
    },
  });

  const sourceFile = project.createSourceFile('editTypescriptInput.fileToBeAddedTo', editTypescriptInput.fileToBeAddedTo as string);
  
  editTypescriptInput.edits.forEach((edit: EditFile) => {
    const editWithSourceFile = {...edit, sourceFile};
    switch (edit.nodeType) {
      case 'import': 
        insertImportToTypescriptFile(editWithSourceFile)
        break;
      case 'export': 
        addExportToTypescriptFile(editWithSourceFile)
        break;  
      case 'editImport':
        editTypescriptImport(editWithSourceFile)
        break;
      case 'addImportsToExisting':
        addImportsToExisting(editWithSourceFile)
        break;
      case 'classDeclaration':   
        insertDeclarationIntoClass(editWithSourceFile);
        break;
      case 'addFunction':  
        addFunction(editWithSourceFile);
          break;
      case 'classMethod':   
        insertCodeIntoClassMethod(editWithSourceFile);
        break;
      case 'addNgModuleImport':
        addNgModuleImport(editWithSourceFile);
        break;
      case 'addNgModuleImportToSpec':
        addNgModuleItemToSpec(editWithSourceFile, 'imports');
        break;
      case 'addNgModuleProvider':
        addNgModuleItem(editWithSourceFile, 'providers');
        break;
      case 'addNgModuleDeclaration':
        addNgModuleItem(editWithSourceFile, 'declarations');
        break;  
      case 'addNgModuleExport':
        addNgModuleItem(editWithSourceFile, 'exports');
        break;    
      case 'addToVariableObject':
        addToVariableObject(editWithSourceFile);
        break;
      case 'addConstructorMethod':
        addConstructorMethod(editWithSourceFile);
        break;
      case 'addVariableDeclarationStatement': 
        addVariableDeclarationStatement(editWithSourceFile)
        break;
      case 'addClassMethod':
        addClassMethod(editWithSourceFile)
        break;
    }
  });
  
  return formatTypescriptFileAndReturnString(sourceFile);
}