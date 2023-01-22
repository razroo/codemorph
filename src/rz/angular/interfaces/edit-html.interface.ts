export interface EditHtmlInput {
  fileType?: 'html',
  fileToBeAddedTo?: string | any;
  edits: EditHtmlFile[];
}

export interface EditHtmlFile {
  nodeType: 'editHtmlTag' | 'addSiblingHtml' | 'insertIntoHtmlTag' | 
  'deleteHtmlElement' | 'prependHtml' | 'appendHtml';
  codeBlock: string | any[];
  tagNameToInsert?: string;
  tagNameToInsertInto?: string;
  tagNameToModify?: string;
  siblingTagName?: string;
}