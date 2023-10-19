import { filesToAffect, standaloneEffects } from "../../../morph";
import { EditFileEffect } from "../../../morph/interfaces/morph.interface";
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

  it('should morph index file and add index ts file', () => {
    const programmingLanguage = 'angular';
    const mockParameter = {
      type: AngularTypeNames.Module
    } as any;
    const mockFileEffects: EditFileEffect[] = [{
      filePath: 'path/to/another/index.ts',
      originFilePath: 'path/to/another/src/hello.component.ts',
      content: `import { NgModule } from '@angular/core';
      `
    }];
    const result = standaloneEffects(programmingLanguage, mockParameter, mockFileEffects);
    const expectedIndexContent = `import { NgModule } from '@angular/core';

export * from "./src/hello.component";
`;
    expect(result).toEqual([{
      content: expectedIndexContent,
      filePath: 'path/to/another/index.ts',
      originFilePath: 'path/to/another/src/hello.component.ts',
    }]);
  });
});