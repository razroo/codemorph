import { createJsDom } from '../../angular/morph-angular-html';
import { EditHtmlFile } from "../../angular/interfaces/edit-html.interface";

export function appendHtml(editHtmlFile: EditHtmlFile, htmlDom: any): any {
  const document = htmlDom.window.document;

  console.log(document)
  
  const elementToReturn = editHtmlFile.tagNameToInsertInto
    ? document.createElement(editHtmlFile.tagNameToInsertInto)
    : document.body;

  // const codeToAddTree = createJsDom(editHtmlFile.codeBlock).body;

  // elementToReturn.body.ste
  // elementToReturn.body.appendChild(codeToAddTree);

  // Serialize the modified DOM back into an HTML string
  const updatedHtmlString = htmlDom.serialize();

  return updatedHtmlString;
}