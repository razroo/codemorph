import { EditHtmlInput } from './../../angular/interfaces/edit-html.interface';
import { morphHtml } from '../../angular/morph-angular-html';
import { morphCode } from '../../morph';

describe('deleteHtmlElement' , () => {
  it('should delete an html element', () => {
    const fileToBeAddedTo = `<div><mat-toolbar class="Toolbar" color="primary">Sample header</mat-toolbar><div>`;

    const editHtmlInput: EditHtmlInput = {
        fileType: 'html',
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
        {
            nodeType: 'deleteHtmlElement',
            codeBlock: 'mat-toolbar',
        }
        ]
    };

    const expected = `<div></div>
`;
    const newHtmlString = morphCode(editHtmlInput);
    expect(newHtmlString).toEqual(expected);
    });
});