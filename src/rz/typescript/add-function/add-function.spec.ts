import { EditInput } from './../../morph/interfaces/morph.interface';
import { readFileSync } from 'fs';
import { morphTypescript } from '../morph-typescript';
describe('addFunction', () => {
  it('should add a function to a ts file', () => {
    const editTypescriptInput: EditInput = {
        fileToBeAddedTo: readFileSync('src/rz/typescript/add-function/snapshots/add-function.ts.snap').toString(),
        fileName: 'name',
        edits: [
          {
            nodeType: 'addFunction',
            name: 'generateAngularComponent',
            type: 'string',
            isExported: true,
            parameters: [{name: 'test', type: 'string'}],
            codeBlock: `
            return vscode.commands.registerCommand(
              GENERATE_ANGULAR_COMPONENT,
                async ({path}) => createScaffold('angular-15.0.0', 'angular-core', path, context, isProduction, 'component', packageJsonParams)
              );
            `
          }
        ]
    };

    const typescriptString = morphTypescript(editTypescriptInput);

    const expected = readFileSync('src/rz/typescript/add-function/snapshots/add-function-output.ts.snap').toString();

    expect(typescriptString).toEqual(expected);  
  })
})