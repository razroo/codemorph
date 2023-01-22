import { EditHtmlInput } from './../../angular/interfaces/edit-html.interface';
import { readFileSync } from 'fs';
import { morphHtml } from '../../angular/morph-angular-html';

describe('prependHtml' , () => {
  it('should prepend html code into root of html file', () => {
    const fileToBeAddedTo = readFileSync('src/rz/html/prepend-html/snapshots/prepend-html.html.snap').toString();

    const editHtmlInput: EditHtmlInput = {
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
        {
            nodeType: 'prependHtml',
            codeBlock: '<razroo-angular-starter-global-header></razroo-angular-starter-global-header>',
        }
        ]
    };

    const expected = readFileSync('src/rz/html/prepend-html/snapshots/prepend-html-output.html.snap').toString();
    const newHtmlString = morphHtml(editHtmlInput);
    expect(newHtmlString).toEqual(expected);
  });

  it('should prepend an html code inside of passed in optional element', () => {
    const fileToBeAddedTo = readFileSync('src/rz/html/prepend-html/snapshots/prepend-html-into-element/prepend-html-into-element.html.snap').toString();

    const editHtmlInput: EditHtmlInput = {
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
          {
            nodeType: 'prependHtml',
            codeBlock: '<div>test</div>',
            tagNameToInsertInto: 'mat-toolbar'
          }
        ]
    };

    const expected = readFileSync('src/rz/html/prepend-html/snapshots/prepend-html-into-element/prepend-html-into-element-ouput.html.snap').toString();
    const newHtmlString = morphHtml(editHtmlInput);
    expect(newHtmlString).toEqual(expected);
  });
});