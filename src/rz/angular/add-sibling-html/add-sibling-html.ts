import visitParents from 'unist-util-visit-parents';
import visit from 'unist-util-visit';
import { parseHtml } from '../morph-angular-html';
import { EditHtmlFile } from '../interfaces/edit-html.interface';

// takes html tree of code we want to insert	
// and combines with html tree we want to insert into	
function combineTrees(astNode: any, codeToAddTree: any, tagNameToInsert: string, siblingTagName: string ) {	
  let firstMatchFound = false;

  codeToAddTree.rootNodes.forEach((node: any) => {
    visit(node, {type: 'element', name: tagNameToInsert}, (matPaginator: any) => {	
      astNode.rootNodes.forEach((parentNode: any) => {
        visitParents(parentNode, {type: 'element', name: siblingTagName}, (_node, ancestors) => {	
          if(!firstMatchFound) {
            (ancestors[ancestors.length -1] as any).children.push(matPaginator);	
          }
          firstMatchFound = true;
        });	
      });
    });	
  })
  
  return astNode;	
}	

  // this is a unique function	
  // eslint-disable-next-line @typescript-eslint/no-explicit-any	
export function insertCodeAfterElement(editFile: EditHtmlFile, fileToBeAddedToTree: any): any {  	
  const stringToAddTree = parseHtml(editFile.codeBlock as string);
  return combineTrees(fileToBeAddedToTree, stringToAddTree, (editFile as any).tagNameToInsert, (editFile as any).siblingTagName);	
}