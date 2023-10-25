import { parse } from 'parse5';
import fromParse5 from 'hast-util-from-parse5';
import { EditHtmlFile, EditHtmlInput } from './interfaces/edit-html.interface';
import { insertCodeAfterElement } from './add-sibling-html';
import { insertIntoHtmlTag } from './insert-into-html-tag/insert-into-html-tag';
import { updateHtmlTag } from './update-html-tag';
import * as prettier from 'prettier';

import { deleteHtmlElement } from '../html/delete-html-element/delete-html-element';
import { prependHtml } from '../html/prepend-html/prepend-html';
import { appendHtml } from '../html/append-html/append-html';
import { addPropertyToHtmlTag } from './add-property-to-html-tag/add-property-to-html-tag';
import { astToHtml } from './ast-to-html/ast-to-html';

async function convertToAngularHtmlAndPrettify(htmlAst: any) {
  const htmlString = astToHtml(htmlAst.rootNodes);

  return await prettier.format(htmlString, {
    parser: "html",
  });
}

export async function parseHtml(htmlString: string | any): Promise<any> {
  const angularHtmlParse = (await import('angular-html-parser')).parse;
  return angularHtmlParse(htmlString);
}

export function createUnifiedTree(htmlString: string | any): any {
  const p5ast = parse(String(htmlString), {sourceCodeLocationInfo: true});
  return fromParse5(p5ast);
}

// fileToBeAddedToTree is top level
export async function morphHtml(editHtmlInput: EditHtmlInput): Promise<string> {
  let fileToBeAddedToTree = await parseHtml(editHtmlInput.fileToBeAddedTo);

  editHtmlInput.edits.forEach(async(edit: EditHtmlFile) => {
    switch (edit.nodeType) {
      case 'editHtmlTag': 
        fileToBeAddedToTree = updateHtmlTag(edit, fileToBeAddedToTree);
        break;
      case 'addSiblingHtml': 
        fileToBeAddedToTree = insertCodeAfterElement(edit, fileToBeAddedToTree);
        break;
      case 'insertIntoHtmlTag':   
        fileToBeAddedToTree = await insertIntoHtmlTag(edit, fileToBeAddedToTree);
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
  
  return await convertToAngularHtmlAndPrettify(fileToBeAddedToTree)
}