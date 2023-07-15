
import visit from 'unist-util-visit';
import { createUnifiedTree } from '../morph-angular-html';
import { EditHtmlFile } from '../interfaces/edit-html.interface';


// will insert code into an html block
export function insertIntoHtmlTag(editFile: EditHtmlFile, fileToBeModified: any): any {
  const codeToAddTree = createUnifiedTree(editFile.codeBlock as string);
  let counter = 0;
  
  visit(fileToBeModified, {type: 'element', tagName: editFile.tagNameToInsertInto}, (node: any, index) => {
    visit(codeToAddTree, {type: 'element', tagName: 'body'}, (nodeOfCodeToAdd: any, index) => {
      if(counter === 0) {
        node.children.push(nodeOfCodeToAdd.children[0]);
        counter++;
      }
    });
  });

  return fileToBeModified  
}