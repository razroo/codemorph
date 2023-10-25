import visitParents from 'unist-util-visit-parents';
import visit from 'unist-util-visit';
import { createUnifiedTree } from '../morph-angular-html';
import { EditHtmlFile } from '../interfaces/edit-html.interface';

// takes html tree of code we want to insert
// and combines with html tree we want to insert into

  
  // this is a unique function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export function insertCodeAfterElement(editFile: EditHtmlFile, astNode: any): any {  
  console.log('astNode');
  console.log(astNode);
  return astNode; 
}