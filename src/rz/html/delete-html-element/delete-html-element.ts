import visit from 'unist-util-visit';
import { EditHtmlFile } from "../../angular/interfaces/edit-html.interface";

export function deleteHtmlElement(editHtmlFile: EditHtmlFile, fileToBeAddedToTree: any): any {
  visit(fileToBeAddedToTree, {type: 'element', tagName: editHtmlFile.codeBlock}, (htmlElement: any, index, parent) => {
    (parent as any).children.splice(index, 1);
  });

  return fileToBeAddedToTree;
}