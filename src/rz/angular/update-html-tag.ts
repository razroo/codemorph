import visit from 'unist-util-visit';
import { EditHtmlFile } from "./interfaces/edit-html.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// will add an angular directive to html
export function updateHtmlTag(editHtmlFile: EditHtmlFile, fileToBeAddedToTree: any): any {
  visit(fileToBeAddedToTree, {type: 'element', tagName: editHtmlFile.tagNameToModify}, (htmlElement: any) => {
    htmlElement.properties[editHtmlFile.codeBlock as string] = true;
  });

  return fileToBeAddedToTree;
}