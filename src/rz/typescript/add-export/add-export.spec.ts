import { EditInput } from "src/rz/morph/interfaces/morph.interface";
import { readFileSync } from 'fs';
import { morphTypescript } from '../morph-typescript';

describe('addExportToExisting', () => {
  it('should add an import(s) to an existing path', () => {
    const editTypescriptInput: EditInput = {
        fileToBeAddedTo: readFileSync('src/rz/typescript/add-export/snapshots/add-export.ts.snap').toString(),
        fileName: 'name',
        edits: [
          {
            nodeType: 'export',
            path: './component/component-name',
            codeBlock: undefined
          }
        ]
      };
  
      const typescriptString = morphTypescript(editTypescriptInput);
  
      const expected = readFileSync('src/rz/typescript/add-export/snapshots/add-export-output.ts.snap').toString();
  
      expect(typescriptString).toEqual(expected);  
  });

})