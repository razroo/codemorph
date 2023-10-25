
import visit from 'unist-util-visit';
import { parseHtml } from '../morph-angular-html';
import { EditHtmlFile } from '../interfaces/edit-html.interface';

// will insert code into an html block
export async function insertIntoHtmlTag(editFile: EditHtmlFile, astNode: any): Promise<any> {
  let counter = 0;
  const codeToAddTree = await parseHtml(editFile.codeBlock as string);
  astNode.rootNodes.forEach((node: any) => {
    visit(node, {type: 'element', name: editFile.tagNameToInsertInto}, (node: any, index) => {
      if(!editFile.className || editFile.className === '' || node.attrs.find((attr: any) => attr.value === editFile.className)) {
        if(counter === 0) {
          node.children.push(codeToAddTree.rootNodes[0]);
          counter++;
        }
      }
    });
  });

  return astNode
}