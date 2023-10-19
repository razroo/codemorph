import { filesToAffect } from "../../../morph";
import { AngularTypeNames } from "../../types/types";

describe('AngularModule', () => {
  it('should choose the closest index ts file if an angular module', () => {
    const mockFilePath = 'path/to/another/src/hello.interface.ts';
    const mockParameter = {
        optionalTypes: {},
        type: AngularTypeNames.Interface
    } as any;
    
    const fileTree = [
        "path/to/another/src",
        "path/to/another/src/hello.component.ts",
        "path/to/another/index.ts",
        "path/to/another"
    ];
    const fileToModify = filesToAffect(mockFilePath, fileTree, mockParameter, 'angular');
    expect(fileToModify).toEqual(['path/to/another/index.ts']);
  });
});