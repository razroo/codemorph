export interface EditInput {
  fileType?: 'html' | 'ts' | string;
  fileName: any;
  filePath?: string;
  fileToBeAddedTo?: string | any;
  bodyText?: string;
  edits: EditFile[];
}

export interface EditFile { 
  nodeType?: 'import' | 'export' | 'classDeclaration' | 'classMethod' | 'addNgModuleImport' | 'addNgModuleImportToSpec' | 
  'addNgModuleProvider' | 'addNgModuleDeclaration' | 'addNgModuleProviderToSpec' | 'addToVariableObject' | 'editImport' | 'addConstructorMethod' | 
  'addVariableDeclarationStatement' | 'addClassMethod' | 'addImportsToExisting' | 'addNgModuleExport' | 'addFunction';
  codeBlock: string | any | any[];
  isExported?: boolean;
  nodeToInsertInto?: string;
  fileToBeAddedTo?: string | any;
  valueToModify?: any;
  type?: string;
  path?: string;
  name?: string;
  tagNameToInsert?: string;
  siblingTagName?: string;
  parameters?: any;
  bodyText?: string;
}