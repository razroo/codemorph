export interface EditScssInput {
  fileToBeAddedTo?: string;
  edits: EditScss[];
}

export interface EditScss {
  nodeType: 'addScssBlock' | 'import';
  codeBlock?: string | any;
  path?: string;
}