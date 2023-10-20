import { EditHtmlInput } from './../../angular/interfaces/edit-html.interface';
import { readFileSync } from 'fs';
import { morphHtml } from '../../angular/morph-angular-html';

describe('deleteHtmlElement' , () => {
  it('should delete an html element', () => {
    const fileToBeAddedTo = `<mat-toolbar class="Toolbar" color="primary">Sample header</mat-toolbar>`;

    const editHtmlInput: EditHtmlInput = {
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
        {
            nodeType: 'deleteHtmlElement',
            codeBlock: 'mat-toolbar',
        }
        ]
    };

    const expected = ``;
    const newHtmlString = morphHtml(editHtmlInput);
    expect(newHtmlString).toEqual(expected);
    });
});