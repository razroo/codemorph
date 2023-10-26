import { parseHtml } from '../../angular/morph-angular-html';
import visit from 'unist-util-visit';
import { EditHtmlFile } from "../../angular/interfaces/edit-html.interface";

export function prependHtml(editHtmlFile: EditHtmlFile, astNode: any): any {
  let counter = 0;

  const codeToAddTree = parseHtml(editHtmlFile.codeBlock);
  const element = {type: 'element', name: editHtmlFile.tagNameToInsertInto};

  if(!editHtmlFile.tagNameToInsertInto){
    astNode.rootNodes.unshift(codeToAddTree.rootNodes[0]);
    return astNode;
  }

  astNode.rootNodes.forEach((node: any) => {
    visit(node, element, (htmlElement: any) => {
      if(counter === 0) {
        node.children.unshift(codeToAddTree.rootNodes[0]);
        counter++;
      }
    });
  });

  return astNode;
}