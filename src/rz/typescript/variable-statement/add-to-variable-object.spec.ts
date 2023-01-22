import { readFileSync } from 'fs';
import { EditInput } from '../../morph/interfaces/morph.interface';
import { morphTypescript } from '../morph-typescript';

it('should insert new lines into a typescript variable', () => {
    const editTypescriptInput: EditInput = {
      fileToBeAddedTo: readFileSync('src/rz/typescript/snapshots/variable-statement/variable-statement-spec.snap.ts').toString(),
      fileName: 'name',
      edits: [
        {
          nodeType: 'addToVariableObject',
          codeBlock: '{"uri":"test.com"}',
        }
      ]
    };

    const typescriptString = morphTypescript(editTypescriptInput);

    const expected = readFileSync('src/rz/typescript/snapshots/variable-statement/variable-statement-output-spec.snap.ts').toString();

    expect(typescriptString).toEqual(expected);  
  });