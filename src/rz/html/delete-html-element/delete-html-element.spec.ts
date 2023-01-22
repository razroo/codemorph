import { EditHtmlInput } from './../../angular/interfaces/edit-html.interface';
import { readFileSync } from 'fs';
import { morphHtml } from '../../angular/morph-angular-html';

describe('deleteHtmlElement' , () => {
  it('should delete an html element', () => {
    const fileToBeAddedTo = readFileSync('src/rz/html/delete-html-element/snapshots/delete-html-element.html.snap').toString();

    const editHtmlInput: EditHtmlInput = {
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
        {
            nodeType: 'deleteHtmlElement',
            codeBlock: 'mat-toolbar',
        }
        ]
    };

    const expected = readFileSync('src/rz/html/delete-html-element/snapshots/delete-html-element-output.html.snap').toString();
    const newHtmlString = morphHtml(editHtmlInput);
    expect(newHtmlString).toEqual(expected);
    });
});