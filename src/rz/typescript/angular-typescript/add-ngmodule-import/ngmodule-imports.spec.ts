import { readFileSync } from 'fs';
import { EditInput } from "../../../morph/interfaces/morph.interface";
import { morphTypescript } from '../../morph-typescript';

describe('addNgModuleImport', () => {
  it('should add an import to the angular ngModule', () => {
    const editTypescriptInput: EditInput = {
      fileToBeAddedTo: readFileSync('src/rz/typescript/snapshots/angular-typescript/add-ngmodule-import/add-ngmodule-import.ts.snap').toString(),
      fileName: 'name',
      edits: [
        {
          nodeType: 'import',
          codeBlock: '{ MatSortModule }',
          path: '@angular/material/sort'
        },
        {
          nodeType: 'addNgModuleImport',
          codeBlock: 'MatSortModule',
        }
      ]
    };

    const typescriptString = morphTypescript(editTypescriptInput);
    const expected = readFileSync('src/rz/typescript/snapshots/angular-typescript/add-ngmodule-import/add-ngmodule-import-output.ts.snap').toString();

    expect(typescriptString).toEqual(expected);
  });
})