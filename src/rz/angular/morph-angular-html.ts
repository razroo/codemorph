import { parse } from 'parse5';
import fromParse5 from 'hast-util-from-parse5';
import toHtml from 'hast-util-to-html';
import { EditHtmlFile, EditHtmlInput } from './interfaces/edit-html.interface';
import { insertCodeAfterElement } from './add-sibling-html';
import { insertIntoHtmlTag } from './insert-into-html-tag/insert-into-html-tag';
import { updateHtmlTag } from './update-html-tag';
import * as prettier from 'prettier';
import {parse as angularParse} from 'angular-html-parser';
import * as parserHtml from 'prettier/parser-html';
import * as angularParser from 'angular-html-parser';
import { deleteHtmlElement } from '../html/delete-html-element/delete-html-element';
import { prependHtml } from '../html/prepend-html/prepend-html';
import { appendHtml } from '../html/append-html/append-html';
import { addPropertyToHtmlTag } from './add-property-to-html-tag/add-property-to-html-tag';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

function convertToAngularHtmlAndPrettify(transformedHtmlDomString: string | any) {  
  console.log('angularParse(transformedHtmlDomString)');
  console.log(angularParse(transformedHtmlDomString));
  // return angularParse(transformedHtmlDomString);
}

export function createUnifiedTree(htmlString: string | any): any {
  const p5ast = parse(String(htmlString), {sourceCodeLocationInfo: true});
  return fromParse5(p5ast);
}

export function createJsDom(htmlString: string | any): any  {
  const dom = new JSDOM(htmlString);
  return dom;
}

// fileToBeAddedToTree is top level
export function morphHtml(editHtmlInput: EditHtmlInput): string {
  let fileToBeAddedToTree = createJsDom(editHtmlInput.fileToBeAddedTo);

  editHtmlInput.edits.forEach((edit: EditHtmlFile) => {
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
  })

  return convertToAngularHtmlAndPrettify(fileToBeAddedToTree);  
}