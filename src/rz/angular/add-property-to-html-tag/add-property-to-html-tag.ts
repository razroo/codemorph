
import visit from 'unist-util-visit';
import { EditHtmlFile } from '../interfaces/edit-html.interface';

// will insert code into an html block
export async function addPropertyToHtmlTag(editFile: EditHtmlFile, astNode: any): any {
  const codeBlock = typeof editFile.codeBlock === 'string' ? JSON.parse(editFile.codeBlock) : editFile.codeBlock;
  let firstMatchFound = false;
  const codeBlockKey = Object.keys(codeBlock)[0];
  const codeBlockValue = codeBlock[codeBlockKey];
  
  astNode.rootNodes.forEach((node: any) => {
    visit(node, { type: 'element', name: editFile.tagNameToInsertInto }, (node: any, index) => {
      // Check if the tag is the one you want to modify
      if(!editFile.className || editFile.className === '' || node.attrs.find((attr: any) => attr.value === editFile.className)) {
        if (!firstMatchFound && node.name === editFile.tagNameToInsertInto) {
          node.attrs = [
            ...node.attrs,
            {type: 'attribute', name: codeBlockKey, value: codeBlockValue}
          ]
          firstMatchFound = true;
        }
      }
    });
  });

  return astNode;
}
  