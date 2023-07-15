import visitParents from 'unist-util-visit-parents';
import visit from 'unist-util-visit';
import { createUnifiedTree } from './morph-angular-html';
import { EditHtmlFile } from './interfaces/edit-html.interface';

// takes html tree of code we want to insert
// and combines with html tree we want to insert into
function combineTrees(fileToModifyTree: any, codeToAddTree: any, tagNameToInsert: string, siblingTagName: string ) {
  visit(codeToAddTree, {type: 'element', tagName: tagNameToInsert}, (matPaginator: any) => {
    visitParents(fileToModifyTree, {type: 'element', tagName: siblingTagName}, (_node, ancestors) => {
      (ancestors[ancestors.length -1] as any).children.push(matPaginator);
    });
  });
  return fileToModifyTree;
}
  
  // this is a unique function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export function insertCodeAfterElement(editFile: EditHtmlFile, fileToBeAddedToTree: any): any {  
  const stringToAddTree = createUnifiedTree(editFile.codeBlock as string);
  return combineTrees(fileToBeAddedToTree, stringToAddTree, (editFile as any).tagNameToInsert, (editFile as any).siblingTagName);
}