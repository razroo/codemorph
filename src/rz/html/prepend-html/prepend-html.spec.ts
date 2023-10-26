import { EditHtmlInput } from './../../angular/interfaces/edit-html.interface';
import { morphHtml } from '../../angular/morph-angular-html';

describe('prependHtml' , () => {
  it('should prepend html code into root of html file', () => {
    const fileToBeAddedTo = `<div></div>`;

    const editHtmlInput: EditHtmlInput = {
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
        {
            nodeType: 'prependHtml',
            codeBlock: '<razroo-angular-starter-global-header></razroo-angular-starter-global-header>',
        }
        ]
    };

    const expected = `<razroo-angular-starter-global-header></razroo-angular-starter-global-header>
<div></div>
`;

    const newHtmlString = morphHtml(editHtmlInput);
    expect(newHtmlString).toEqual(expected);
  });

  it('should prepend an html code inside of passed in optional element', () => {
    const fileToBeAddedTo = `<mat-toolbar class="GlobalHeader" color="primary">
<div> hello </div>
</mat-toolbar>`;

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

    const expected = `<mat-toolbar class="GlobalHeader" color="primary"
  ><div>test</div>
  <div>hello</div>
</mat-toolbar>
`;
    
    const newHtmlString = morphHtml(editHtmlInput);
    expect(newHtmlString).toEqual(expected);
  });
});