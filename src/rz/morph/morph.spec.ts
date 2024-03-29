import { EditScssInput } from './../scss/interfaces/morph-scss.interface';
import { readFileSync } from 'fs';
import { EditHtmlFile } from '../angular/interfaces/edit-html.interface';
import { EditInput, NOT_SUPPORTED } from './interfaces/morph.interface';
import { filesToAffect, morphCode } from "./morph"; 

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

  describe('NOT_SUPPORTED', () => {

    it('should return NOT_SUPPORTED if not language supported', () => {
      const mockFilePath = 'path/to/another/src/hello.component.ts';
      const mockParameter = {
        optionalTypes: {},
        type: 'component' as any
      } as any;
      
      const fileTree = [
        "path/to/another/src",
        "path/to/another/src/hello.component.ts",
        "path/to/another/hello.module.ts",
        "path/to/another"
      ];
      const fileToModify = filesToAffect(mockFilePath, fileTree, mockParameter, 'felipe');
      expect(fileToModify).toEqual(NOT_SUPPORTED);
    });

    it('should return NOT_SUPPORTED if language supported but type is not', () => {
      const mockFilePath = 'path/to/another/src/hello.component.ts';
      const mockParameter = {
        optionalTypes: {},
        type: 'yolo' as any
      } as any;
      
      const fileTree = [
        "path/to/another/src",
        "path/to/another/src/hello.component.ts",
        "path/to/another/hello.module.ts",
        "path/to/another"
      ];
      const fileToModify = filesToAffect(mockFilePath, fileTree, mockParameter, 'angular');
      expect(fileToModify).toEqual(NOT_SUPPORTED);
    })
  });
})