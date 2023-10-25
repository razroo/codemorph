import { parse, serialize } from 'parse5';
import fromParse5 from 'hast-util-from-parse5';
import toHtml from 'hast-util-to-html';
import { EditHtmlFile, EditHtmlInput } from './interfaces/edit-html.interface';
import { insertCodeAfterElement } from './add-sibling-html';
import { insertIntoHtmlTag } from './insert-into-html-tag/insert-into-html-tag';
import { updateHtmlTag } from './update-html-tag';
import * as prettier from 'prettier';
import * as parserHtml from 'prettier/parser-html';
import { deleteHtmlElement } from '../html/delete-html-element/delete-html-element';
import { prependHtml } from '../html/prepend-html/prepend-html';
import { appendHtml } from '../html/append-html/append-html';
import { addPropertyToHtmlTag } from './add-property-to-html-tag/add-property-to-html-tag';

// let angularParse: any;
let angularHtmlParse: any;

(async function () {
  angularHtmlParse = (await import('angular-html-parser')).parse;
})();

function convertToAngularHtmlAndPrettify(htmlString: any) {
  // const transformedTreeInHtml = toHtml(tree)
  // .replace('<body>','').replace('</body>','')
  // .replace('<html>','').replace('</html>','')
  // .replace('<head>','').replace('</head>','');

  const formattedCode = prettier.format(htmlString, {
    parser: "html",
    plugins: [parserHtml]
  });
  // right now just using regex to tidy up lowercased directives
  const angularFormmatedCode = formattedCode.replace(/ngif/g, 'ngIf').replace(/ngfor/g, 'ngFor');

  return angularFormmatedCode;  
}

export function parseHtml(htmlString: string | any): any {
  return angularHtmlParse(htmlString);
}

export function createUnifiedTree(htmlString: string | any): any {
  const p5ast = parse(String(htmlString), {sourceCodeLocationInfo: true});
  return fromParse5(p5ast);
}

// Function to convert the modified rootNodes back to an HTML string
// function rootNodesToHTML(rootNodes: Element[]): string {
//   return rootNodes.map((node: any) => node.toString()).join('');
// }

// fileToBeAddedToTree is top level
export function morphHtml(editHtmlInput: EditHtmlInput): string {
  let fileToBeAddedToTree = parseHtml(editHtmlInput.fileToBeAddedTo);

  fileToBeAddedToTree.match({ tag: "div" }, node => {
    node.content[0] = 'hello';
    return node;
  });

  console.log('editHtmlInput.fileToBeAddedTo');
  console.log(editHtmlInput.fileToBeAddedTo);

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
  });

  console.log('editHtmlInput.fileToBeAddedTo');
  console.log(editHtmlInput.fileToBeAddedTo);
  return editHtmlInput.fileToBeAddedTo;
  // return convertToAngularHtmlAndPrettify(fileToBeAddedToTree);  
}