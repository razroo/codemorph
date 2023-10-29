import { EditInput } from './../../morph/interfaces/morph.interface';
import { morphTypescript } from '../morph-typescript';
describe('addFunction', () => {
  it('should add a function to a ts file', () => {
    const fileToBeAddedTo = `export function pushScaffoldCommands(context, isProduction: boolean, packageJsonParams) {
}`;

    const editTypescriptInput: EditInput = {
        fileToBeAddedTo: fileToBeAddedTo,
        fileName: 'name',
        edits: [
          {
            nodeType: 'addFunction',
            name: 'generateAngularComponent',
            type: 'string',
            parameters: `[{"name": "test", "type": "string"}]`,
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

    const expected = `export function pushScaffoldCommands(context, isProduction: boolean, packageJsonParams) {
}

export function generateAngularComponent(test: string): string {

  return vscode.commands.registerCommand(
    GENERATE_ANGULAR_COMPONENT,
    async ({ path }) => createScaffold('angular-15.0.0', 'angular-core', path, context, isProduction, 'component', packageJsonParams)
  );

}
`;
    expect(typescriptString).toEqual(expected);  
  })
})