import { EditHtmlInput } from '../../angular/interfaces/edit-html.interface';
import { readFileSync } from 'fs';
import { morphHtml } from '../../angular/morph-angular-html';

describe('appendHtml' , () => {
  it('should append an html element', () => {
    const fileToBeAddedTo = readFileSync('src/rz/html/append-html/snapshots/append-html.html.snap').toString();

    const editHtmlInput: EditHtmlInput = {
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
        {
            nodeType: 'appendHtml',
            codeBlock: '<razroo-angular-starter-global-header></razroo-angular-starter-global-header>',
        }
        ]
    };

    const expected = readFileSync('src/rz/html/append-html/snapshots/append-html-output.html.snap').toString();
    const newHtmlString = morphHtml(editHtmlInput);
    expect(newHtmlString).toEqual(expected);
  });

  it('should append html code inside of passed in optional element', () => {
    const fileToBeAddedTo = readFileSync('src/rz/html/append-html/snapshots/append-html-into-element/append-html-into-element.html.snap').toString();

    const editHtmlInput: EditHtmlInput = {
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
          {
            nodeType: 'appendHtml',
            codeBlock: '<div>test</div>',
            tagNameToInsertInto: 'mat-toolbar'
          }
        ]
    };

    const expected = readFileSync('src/rz/html/append-html/snapshots/append-html-into-element/append-html-into-element-output.html.snap').toString();
    const newHtmlString = morphHtml(editHtmlInput);
    expect(newHtmlString).toEqual(expected);
  });
});