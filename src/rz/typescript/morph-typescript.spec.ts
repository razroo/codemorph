import { readFileSync } from 'fs';
import { EditInput } from '../morph/interfaces/morph.interface';
import { morphTypescript } from './morph-typescript';

describe('EditTypescript', () => {
  it('should insert typescript into a certain block of code', () => {
    const editTypescriptInput: EditInput = {
      fileToBeAddedTo: readFileSync('src/rz/typescript/snapshots/data-table.component.ts.snap').toString(),
      fileName: 'name',
      edits: [
        {
          nodeType: 'import',
          codeBlock: '{ MatPaginator }',
          path: '@angular/material/paginator'
        },
        {
          nodeType: 'classDeclaration',
          codeBlock: '@ViewChild(MatPaginator) paginator',
          type: 'MatPaginator'
        },
        {
          nodeType: 'classMethod',
          nodeToInsertInto: 'ngAfterViewInit',
          codeBlock: 'this.dataSource.paginator = this.paginator;',
          type: 'MatPaginator'
        }
      ]
    };

    const typescriptString = morphTypescript(editTypescriptInput);

    const expected = readFileSync('src/rz/typescript/snapshots/data-table-output.component.ts.snap').toString();

    expect(typescriptString).toEqual(expected);  
  });

  it('should update an existing typesscript import', () => {
    const editTypescriptInput: EditInput = {
      fileToBeAddedTo: readFileSync('src/rz/typescript/snapshots/edit-import/edit-import.ts.snap').toString(),
      fileName: 'name',
      edits: [
        {
          nodeType: 'editImport',
          codeBlock: 'environment',
          path: '@common-environments'
        }
      ]
    };

    const typescriptString = morphTypescript(editTypescriptInput);

    const expected = readFileSync('src/rz/typescript/snapshots/edit-import/edit-import-output.ts.snap').toString();

    expect(typescriptString).toEqual(expected);  
  });

  it('should add a variable declaration statement to a file', () => {
    const editTypescriptInput: EditInput = {
      fileToBeAddedTo: readFileSync('src/rz/typescript/snapshots/add-variable-declaration-statement/add-variable-declaration-statement.ts.snap').toString(),
      fileName: 'name',
      edits: [
        {
          nodeType: 'addVariableDeclarationStatement',
          codeBlock: 'gtag',
          type: 'Function'
        }
      ]
    };

    const typescriptString = morphTypescript(editTypescriptInput);

    const expected = readFileSync('src/rz/typescript/snapshots/add-variable-declaration-statement/add-variable-declaration-statement-output.ts.snap').toString();

    expect(typescriptString).toEqual(expected);  
  });

});