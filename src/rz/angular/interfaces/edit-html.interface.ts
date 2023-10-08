export interface EditHtmlInput {
  fileType?: 'html',
  fileToBeAddedTo?: string | any;
  edits: EditHtmlFile[];
}

export interface EditHtmlFile {
  nodeType: 'editHtmlTag' | 'addSiblingHtml' | 'insertIntoHtmlTag' | 'addPropertyToHtmlTag'
  | 'deleteHtmlElement' | 'prependHtml' | 'appendHtml';
  codeBlock: string | any[] | any;
  tagNameToInsert?: string;
  tagNameToInsertInto?: string;
  tagNameToModify?: string;
  siblingTagName?: string;
  className?: string;
}