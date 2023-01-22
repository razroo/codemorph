export interface EditJsonInput {
    fileToBeAddedTo?: string;
    edits: EditJson[];
  }

  export interface EditJson {
    nodeType: 'editJson' | 'addJsonKeyValue';
    valueToModify: any;
    codeBlock: string | any | any[];
  }