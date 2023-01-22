import { EditInput } from "src/rz/morph/interfaces/morph.interface";
import { readFileSync } from 'fs';
import { morphTypescript } from '../morph-typescript';

describe('addClassMethod', () => {
    it('should create a class method', () => {
        const editTypescriptInput: EditInput = {
            fileToBeAddedTo: readFileSync('src/rz/typescript/snapshots/add-class-method/add-class-method.ts.snap').toString(),
            fileName: 'name',
            edits: [
              {
                nodeType: 'addClassMethod',
                codeBlock: 'determineStatus',
                type: 'string',
                parameters: "[{name: 'event', type: 'any'}]",
                bodyText: "this.toggle.emit(event);"
              }
            ]
          };
      
          const typescriptString = morphTypescript(editTypescriptInput);
      
          const expected = readFileSync('src/rz/typescript/snapshots/add-class-method/add-class-method-output.ts.snap').toString();
      
          expect(typescriptString).toEqual(expected);  
    });
    
});