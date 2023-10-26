import { EditHtmlFile, EditHtmlInput } from './interfaces/edit-html.interface';
import { insertCodeAfterElement } from './add-sibling-html/add-sibling-html';
import { insertIntoHtmlTag } from './insert-into-html-tag/insert-into-html-tag';
import { updateHtmlTag } from './update-html-tag';
import { deleteHtmlElement } from '../html/delete-html-element/delete-html-element';
import { prependHtml } from '../html/prepend-html/prepend-html';
import { appendHtml } from '../html/append-html/append-html';
import { addPropertyToHtmlTag } from './add-property-to-html-tag/add-property-to-html-tag';
import { astToHtml } from './ast-to-html/ast-to-html';
import * as prettier from 'prettier';
import * as parserHtml from 'prettier/parser-html';
import {parse as angularHtmlParse} from 'angular-html-parser';

export function convertToAngularHtmlAndPrettify(htmlAst: any): string {
  const htmlString = astToHtml(htmlAst.rootNodes);
  return prettier.format(htmlString, {
    parser: "html",
    plugins: [parserHtml]
  });
}

export function parseHtml(htmlString: string | any): any {
  return angularHtmlParse(htmlString);
}

// fileToBeAddedToTree is top level
export function morphHtml(editHtmlInput: EditHtmlInput): string {
  let fileToBeAddedToTree = parseHtml(editHtmlInput.fileToBeAddedTo);

  editHtmlInput.edits.forEach(async(edit: EditHtmlFile) => {
    switch (edit.nodeType) {
      case 'editHtmlTag': 
        fileToBeAddedToTree = updateHtmlTag(edit, fileToBeAddedToTree);
        break;
      case 'addSiblingHtml': 
        fileToBeAddedToTree = insertCodeAfterElement(edit, fileToBeAddedToTree);
        break;
      case 'insertIntoHtmlTag':   
        fileToBeAddedToTree = insertIntoHtmlTag(edit, fileToBeAddedToTree);
        break;
      case 'addPropertyToHtmlTag':   
        fileToBeAddedToTree = addPropertyToHtmlTag(edit, fileToBeAddedToTree);
        break;
    case 'deleteHtmlElement':   
        fileToBeAddedToTree = deleteHtmlElement(edit, fileToBeAddedToTree);
        break;
    case 'prependHtml':
        fileToBeAddedToTree = prependHtml(edit, fileToBeAddedToTree);
        break;
    case 'appendHtml':
        fileToBeAddedToTree = appendHtml(edit, fileToBeAddedToTree);
    }
  });
  
  return convertToAngularHtmlAndPrettify(fileToBeAddedToTree)
}