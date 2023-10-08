import { readFileSync } from 'fs';
import { morphHtml} from './morph-angular-html';
import { EditHtmlFile, EditHtmlInput } from "./interfaces/edit-html.interface";

describe('EditAngularHTML', () => {
  const fileToBeAddedTo = readFileSync('src/rz/angular/snapshots/data-table.component.html.snap').toString();
  const siblingCodeBlock = `<mat-paginator *ngIf="isPageable"
                  [pageSizeOptions]="paginationSizes"
                  [pageSize]="defaultPageSize"
                  (page)="paginateTable($event)"
                  showFirstLastButtons>
  </mat-paginator>`;
  const modifyTagNameCodeBlock = 'matSort';
  it('should insert an html block of code after', () => {
    const addSiblingHtml: EditHtmlFile = {
      nodeType: 'addSiblingHtml',
      codeBlock: siblingCodeBlock,
      tagNameToInsert: 'mat-paginator',
      siblingTagName: 'table'
    };

    const updateHtmlTag: EditHtmlFile = {
      nodeType: 'editHtmlTag',
      codeBlock: modifyTagNameCodeBlock,
      tagNameToModify: 'table',
    };

    const editHtmlInput: EditHtmlInput = {
      fileToBeAddedTo: fileToBeAddedTo,
      edits: [
        addSiblingHtml,
        updateHtmlTag
      ]
    };

    const expected = readFileSync('src/rz/angular/snapshots/data-table-output.component.html.snap').toString();

    const newHtmlString = morphHtml(editHtmlInput);

    expect(newHtmlString).toEqual(expected);
  });

});