import { TemplateInputParameter } from './../../../utils/interfaces/template-parameters';
import { writeFileSync, readFileSync } from 'fs';
import { effects, filesToAffect, standaloneEffects } from "../../../morph";
import { AngularTypeNames } from "../../types/types";
import { EditFileEffect } from '../../../morph/interfaces/morph.interface';

describe('exportComponentFile', () => {
  afterEach(() => {
    writeFileSync('src/rz/angular/effects/standalone-component/index.ts', '');
  });
  it('should export component file', () => {
    const mockFilePath = 'src/rz/angular/effects/standalone-component/standalone-component.ts';
    const mockTemplateInputParameter: TemplateInputParameter = {
      defaultValue: 'libs/{name}-dialog',
      description: 'File path for name file(s)',
      inputType: 'text',
      name: 'nameFilePath',
      optionalTypes: [{name: 'isExported', selected: true}],
      paramType: 'filePath',
      type: AngularTypeNames.StandaloneComponent
    }

    effects(mockFilePath, mockTemplateInputParameter, 'angular');
    const result = readFileSync('src/rz/angular/effects/standalone-component/index.ts').toString();
    const expected = readFileSync('src/rz/angular/effects/standalone-component/snapshots/index-output.ts.snap').toString();
    expect(result).toEqual(expected);
  });
});

describe('closestIndexFileToImportTo', () => {
  it('should choose closest index file', () => {
    const mockFilePath = 'path/to/another/src/hello.component.ts';
    const mockParameter = {
      optionalTypes: {},
      type: AngularTypeNames.StandaloneComponent
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

describe('standaloneComponentEffects', () => {
  it('should trigger standalone component effects', () => {
    const programmingLanguage = 'angular';
    const mockParameter = {
      type: AngularTypeNames.StandaloneComponent
    } as any;
    const mockFileEffects: EditFileEffect[] = [{
      filePath: 'path/to/another/index.ts',
      originFilePath: 'path/to/another/src/hello.component.ts',
      content: ``
    }];
    const result = standaloneEffects(programmingLanguage, mockParameter, mockFileEffects);
    const indexContent = `export * from "./src/hello.component";
`;
    expect(result).toEqual([{
      content: indexContent,
      originFilePath: "path/to/another/src/hello.component.ts",
      filePath: 'path/to/another/index.ts'
    }]);
  });
});