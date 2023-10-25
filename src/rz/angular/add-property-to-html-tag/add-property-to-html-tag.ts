
import { EditHtmlFile } from '../interfaces/edit-html.interface';

// will insert code into an html block
export function addPropertyToHtmlTag(editFile: EditHtmlFile, fileToBeModified: any): any {
  const divElement = fileToBeModified.querySelector('div');
  if (divElement instanceof HTMLElement) {
    divElement.setAttribute('class', 'highlighted');
  }
  const modifiedHtmlString = fileToBeModified.toString();
  console.log('modifiedHtmlString');
  console.log(modifiedHtmlString);
  return modifiedHtmlString;
}
  