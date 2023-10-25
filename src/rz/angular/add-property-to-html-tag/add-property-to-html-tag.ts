
import visit from 'unist-util-visit';
import { EditHtmlFile } from '../interfaces/edit-html.interface';

// will insert code into an html block
export function addPropertyToHtmlTag(editFile: EditHtmlFile, astNode: any): any {
  const codeBlock = typeof editFile.codeBlock === 'string' ? JSON.parse(editFile.codeBlock) : editFile.codeBlock;
  let firstMatchFound = false;
  const codeBlockKey = Object.keys(codeBlock)[0];
  const codeBlockValue = codeBlock[codeBlockKey];
  
  visit(astNode.rootNodes[0], { type: 'element', name: editFile.tagNameToInsertInto }, (node: any, index) => {
    // Check if the tag is the one you want to modify
    if(!editFile.className || editFile.className === '' || node.properties.className?.includes(editFile.className)) {
      if (!firstMatchFound && node.name === editFile.tagNameToInsertInto) {
        node.attrs = [
          ...node.attrs,
          {type: 'attribute', name: codeBlockKey, value: codeBlockValue}
        ]
        firstMatchFound = true;
      }
    }
  });
  
  return astNode;
}
  