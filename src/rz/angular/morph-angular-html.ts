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
import { camelCase } from 'lodash';

// let angularParse: any;
let hastParse: any;

(async function () {
  // angularParse = (await import('angular-html-parser')).parse
  hastParse = (await import('hast-util-from-html')).default
})();

function convertToAngularHtmlAndPrettify(tree: any) {
  const transformedTreeInHtml = toHtml(tree)
  .replace('<body>','').replace('</body>','')
  .replace('<html>','').replace('</html>','')
  .replace('<head>','').replace('</head>','');

  const formattedCode = prettier.format(transformedTreeInHtml, {
    parser: "html",
    plugins: [parserHtml]
  });
  // right now just using regex to tidy up lowercased directives
  const angularFormmatedCode = formattedCode.replace(/ngif/g, 'ngIf').replace(/ngfor/g, 'ngFor');

  return angularFormmatedCode;  
}

export function createUnifiedTree(htmlString: string | any): any {
  // const p5ast = angularParse(htmlString, {
  //   sourceCodeLocationInfo: true
  // });

  // console.log('p5ast');
  // console.log(p5ast);

  // Post-process the AST to change tag and attribute names

  // const serailizedHtml = serialize(p5ast);
  // console.log(serailizedHtml);
  return hastParse(htmlString);
}


// fileToBeAddedToTree is top level
export function morphHtml(editHtmlInput: EditHtmlInput): string {
  let fileToBeAddedToTree = createUnifiedTree(editHtmlInput.fileToBeAddedTo);  

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