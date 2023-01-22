import { EditScssInput } from './../scss/interfaces/morph-scss.interface';
import { readFileSync, writeFileSync } from 'fs';
import { EditHtmlFile, EditHtmlInput } from '../angular/interfaces/edit-html.interface';
import { EditInput } from './interfaces/morph.interface';
import { morphCode } from "./morph"; 

describe('morph', () => {
  const siblingCodeBlock = `<mat-paginator *ngIf="isPageable"
                  [pageSizeOptions]="paginationSizes"
                  [pageSize]="defaultPageSize"
                  (page)="paginateTable($event)"
                  showFirstLastButtons>
  </mat-paginator>`;
  const modifyTagNameCodeBlock = 'matSort';

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

  const morphMock = [
    {
        "fileType": "html",
        "edits": [
          addSiblingHtml,
          updateHtmlTag
        ]
    },
    {
        "fileType": "ts",
        "edits": [
          {
            "nodeType": "import",
            "codeBlock": "{ MatPaginator }",
            "path": "@angular/material/paginator"
          },
          {
            "nodeType": "classDeclaration",
            "codeBlock": "@ViewChild(MatPaginator) paginator",
            "type": "MatPaginator"
          },
          {
            "nodeType": "classMethod",
            "nodeToInsertInto": "ngAfterViewInit",
            "codeBlock": "this.dataSource.paginator = this.paginator;",
            "type": "MatPaginator"
          }
        ]
    }
];
  it('should morph the html file', () => {  
    const fileToBeAddedTo = readFileSync('src/rz/angular/snapshots/data-table.component.html.snap').toString();

    const editInput = {
      ...morphMock[0],
      fileToBeAddedTo,
    }
    const editedCode = morphCode(editInput as EditInput);
    const expected = String(readFileSync('src/rz/angular/snapshots/data-table-output.component.html.snap'));

    expect(editedCode).toEqual(expected);
  });

  it('should morph the ts file', () => {  
    const fileToBeAddedTo = String(readFileSync('src/rz/typescript/snapshots/data-table.component.ts.snap'));

    const editInput = {
      ...morphMock[1],
      fileToBeAddedTo,
    }
    const editedCode = morphCode(editInput as EditInput);
    const expected = String(readFileSync('src/rz/typescript/snapshots/data-table-output.component.ts.snap'));

    expect(editedCode).toEqual(expected);
  });

  it('should morph the scss file', () => {
    const fileToBeAddedTo = readFileSync('src/rz/scss/snapshots/themes.scss.snap').toString();
    const codeBlock = `.LightMode {
        background: #ffffff;
        color: #000000;
      };
    `

    const editScssInput = {
      fileToBeAddedTo: fileToBeAddedTo,
      fileType: 'scss',
      edits: [
        {
          nodeType: 'addScssBlock',
          codeBlock: codeBlock
        }
      ]
    }

    const expected = readFileSync('src/rz/scss/snapshots/themes-output.scss.snap').toString();

    expect(morphCode(editScssInput as EditScssInput)).toEqual(expected);
  });

  describe('insertIntoHtmlTag', () => {
    it('should insert html into the specified tag if parent tag is div', () => {
      const fileToBeAddedTo = readFileSync('src/rz/angular/snapshots/insert-into-html-tag/insert-into-html-tag.html.snap').toString();
      const codeBlock = '<div>new div content</div>';
      const insertIntoHtmlTag: EditHtmlFile = {
        nodeType: 'insertIntoHtmlTag',
        codeBlock: codeBlock,
        tagNameToInsertInto: 'div'
      };

      const editHtmlInput: EditHtmlInput = {
        fileType: 'html',
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
          insertIntoHtmlTag
        ]
      };

      const expected = readFileSync('src/rz/angular/snapshots/insert-into-html-tag/insert-into-html-tag.html-output.snap').toString();
      const newHtmlString = morphCode(editHtmlInput);
      expect(newHtmlString).toEqual(expected);
    });

    it('should insert html into the specified tag if parent tag is matToolbar', () => {
      const fileToBeAddedTo = readFileSync('src/rz/angular/snapshots/insert-into-html-tag/insert-into-html-tag-header.html.snap').toString();
      const codeBlock = "<div class=\"icons\"><fa-icon [icon]=\"faBell\" aria-hidden=\"false\" aria-label=\"Notification Icon\"></fa-icon> <fa-icon [icon]=\"faQuestionCircle\" aria-hidden=\"false\" aria-label=\"Question Icon\"></fa-icon> <fa-icon [icon]=\"faUserCircle\" aria-hidden=\"false\" aria-label=\"Account Icon\"></fa-icon></div>";
      const insertIntoHtmlTag: EditHtmlFile = {
        nodeType: 'insertIntoHtmlTag',
        codeBlock: codeBlock,
        tagNameToInsertInto: 'mat-toolbar'
      };

      const editHtmlInput: EditHtmlInput = {
        fileType: 'html',
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
          insertIntoHtmlTag
        ]
      };

      const expected = readFileSync('src/rz/angular/snapshots/insert-into-html-tag/insert-into-html-tag-header-output.html.snap').toString();
      const newHtmlString = morphCode(editHtmlInput);
      writeFileSync('src/rz/angular/snapshots/insert-into-html-tag/insert-into-html-tag-header-output.html.snap', newHtmlString)
      expect(newHtmlString).toEqual(expected);
    });
  });
})