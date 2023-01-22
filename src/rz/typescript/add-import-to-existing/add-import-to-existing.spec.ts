import { EditInput } from "src/rz/morph/interfaces/morph.interface";
import { readFileSync } from 'fs';
import { morphTypescript } from '../morph-typescript';

describe('addImportsToExisting', () => {
  it('should add an import(s) to an existing path', () => {
    const editTypescriptInput: EditInput = {
        fileToBeAddedTo: readFileSync('src/rz/typescript/snapshots/add-import-to-existing/add-import-to-existing.ts.snap').toString(),
        fileName: 'name',
        edits: [
          {
            nodeType: 'addImportsToExisting',
            path: '@angular/core',
            codeBlock: 'EventEmitter, Output',
          }
        ]
      };
  
      const typescriptString = morphTypescript(editTypescriptInput);
  
      const expected = readFileSync('src/rz/typescript/snapshots/add-import-to-existing/add-import-to-existing-output.ts.snap').toString();
  
      expect(typescriptString).toEqual(expected);  
  });

})