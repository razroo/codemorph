
import visit from 'unist-util-visit';
import { createUnifiedTree } from '../morph-angular-html';
import { EditHtmlFile } from '../interfaces/edit-html.interface';

// will insert code into an html block
export function addPropertyToHtmlTag(editFile: EditHtmlFile, fileToBeModified: any): any {
  const codeBlock = typeof editFile.codeBlock === 'string' ? JSON.parse(editFile.codeBlock) : editFile.codeBlock;
  let firstMatchFound = false;
  visit(fileToBeModified, { type: 'element', tagName: editFile.tagNameToInsertInto }, (node: any, index) => {
    // Check if the tag is the one you want to modify
    if(!editFile.className || editFile.className === '' || node.properties.className?.includes(editFile.className)) {
      if (!firstMatchFound && node.tagName === editFile.tagNameToInsertInto) {
        node.properties = {
          ...(node.properties || {}),
          ...codeBlock
        };
        firstMatchFound = true;
      }
    }
  });
  
  return fileToBeModified;
}
  