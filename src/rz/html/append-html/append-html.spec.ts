import { EditHtmlInput } from '../../angular/interfaces/edit-html.interface';
import { readFileSync } from 'fs';
import { morphHtml } from '../../angular/morph-angular-html';

describe('appendHtml' , () => {
  it('should append an html element', () => {
    const fileToBeAddedTo = `<div></div>`

    const editHtmlInput: EditHtmlInput = {
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
        {
            nodeType: 'appendHtml',
            codeBlock: '<razroo-angular-starter-global-header></razroo-angular-starter-global-header>',
        }
        ]
    };

    const expected = `<div></div>
<razroo-angular-starter-global-header></razroo-angular-starter-global-header>
`
    const newHtmlString = morphHtml(editHtmlInput);
    expect(newHtmlString).toEqual(expected);
  });

  it('should append html code inside of passed in optional element', () => {
    const fileToBeAddedTo = `<mat-toolbar class="GlobalHeader" color="primary">
<div>hello</div>
</mat-toolbar>
`
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

  const expected = `<mat-toolbar class="GlobalHeader" color="primary">
  <div>hello</div>
  <div>test</div></mat-toolbar
>
`;
    const newHtmlString = morphHtml(editHtmlInput);
    expect(newHtmlString).toEqual(expected);
  });

  it('should preserve the property camelCase when html possesses property', () => {
    const fileToBeAddedTo = `<div *ngIf="authenticated"></div>`;
    const editHtmlInput: EditHtmlInput = {
      fileToBeAddedTo: fileToBeAddedTo,
      edits: [
        {
          nodeType: 'appendHtml',
          codeBlock: '<div>test</div>',
          tagNameToInsertInto: 'div'
        }
      ]
    };
    const expected = `<div *ngIf="authenticated"><div>test</div></div>
`;
    const newHtmlString = morphHtml(editHtmlInput);
    expect(newHtmlString).toEqual(expected);
  });
});