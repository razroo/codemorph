import visitParents from 'unist-util-visit-parents';
import visit from 'unist-util-visit';
import { createUnifiedTree } from '../morph-angular-html';
import { EditHtmlFile } from '../interfaces/edit-html.interface';

// takes html tree of code we want to insert
// and combines with html tree we want to insert into

  
  // this is a unique function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export function insertCodeAfterElement(editFile: EditHtmlFile, astNode: any): any {  
  astNode.rootNodes.forEach((node: any) => {
    visit(node, { type: 'element', name: editFile.siblingTagName }, (node: any, index) => {
      console.log('node');
      console.log(node);
    });
  });
  return astNode; 
}