import { readFileSync } from 'fs';
import { EditInput } from "../../../morph/interfaces/morph.interface";
import { morphTypescript } from '../../morph-typescript';

describe('addNgModuleprovider', () => {
  it('should add an provider to the angular ngModule', () => {
    const editTypescriptInput: EditInput = {
      fileToBeAddedTo: readFileSync('src/rz/typescript/snapshots/angular-typescript/add-ngmodule-provider/add-ngmodule-provider.ts.snap').toString(),
      fileName: 'name',
      edits: [
        {
          nodeType: 'addNgModuleProvider',
          codeBlock: `{
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => {
              return {
                cache: new InMemoryCache(),
                link: httpLink.create({
                  uri: environment.uri,
                }),
              };
            },
            deps: [HttpLink],
          }`,
        }
      ]
    };

    const typescriptString = morphTypescript(editTypescriptInput);
    const expected = readFileSync('src/rz/typescript/snapshots/angular-typescript/add-ngmodule-provider/add-ngmodule-provider-output.ts.snap').toString();

    expect(typescriptString).toEqual(expected);
  });
})

describe('addNgModuleExport', () => {
  it('should add an export to ngModule and add export if it doesnt already exist', () => {
    const editTypescriptInput: EditInput = {
      fileToBeAddedTo: readFileSync('src/rz/typescript/angular-typescript/snapshots/add-ngmodule-export/add-ngmodule-export.ts.snap').toString(),
      fileName: 'name',
      edits: [
        {
          nodeType: 'addNgModuleExport',
          codeBlock: `HomeComponent`,
        }
      ]
    };
    
    const typescriptString = morphTypescript(editTypescriptInput);
    const expected = readFileSync('src/rz/typescript/angular-typescript/snapshots/add-ngmodule-export/add-ngmodule-export-output.ts.snap').toString();

    expect(typescriptString).toEqual(expected);
  });
});

describe('addNgModuleImportToSpec', () => {
  it('should add an import to the ngModule spec and add imports if it doesnt already exist', () => {
    const editTypescriptInput: EditInput = {
      fileToBeAddedTo: readFileSync('src/rz/typescript/angular-typescript/snapshots/add-spec-ngmodule-spec/add-spec-ngmodule-spec.ts.snap').toString(),
      fileName: 'name',
      edits: [
        {
          nodeType: 'addNgModuleImportToSpec',
          codeBlock: `FontAwesomeModule`,
        }
      ]
    };
    
    const typescriptString = morphTypescript(editTypescriptInput);
    const expected = readFileSync('src/rz/typescript/angular-typescript/snapshots/add-spec-ngmodule-spec/add-spec-ngmodule-spec-output.ts.snap').toString();

    expect(typescriptString).toEqual(expected);
  });
});