import { TemplateInputParameter } from './../../../utils/interfaces/template-parameters';
import { writeFileSync, readFileSync } from 'fs';
import { effects, filesToAffect, standaloneEffects } from "../../../morph";
import { AngularTypeNames } from "../../types/types";
import { EditFileEffect } from '../../../morph/interfaces/morph.interface';


describe('exportPipeFile', () => {
    afterEach(() => {
      writeFileSync('src/rz/angular/effects/standalone-pipe/index.ts', '');
    });
    it('should export pipe file', () => {
      const mockFilePath = 'src/rz/angular/effects/standalone-pipe/standalone-pipe.ts';
      const mockTemplateInputParameter: TemplateInputParameter = {
        defaultValue: 'libs/{name}-dialog',
        description: 'File path for name file(s)',
        inputType: 'text',
        name: 'nameFilePath',
        optionalTypes: [{name: 'isExported', selected: true}],
        paramType: 'filePath',
        type: AngularTypeNames.StandalonePipe
      }
  
      effects(mockFilePath, mockTemplateInputParameter, 'angular');
      const result = readFileSync('src/rz/angular/effects/standalone-pipe/index.ts').toString();
      const expected = `export * from "./standalone-pipe";
`
      expect(result).toEqual(expected);
    });
});

describe('closestIndexFileToImportTo', () => {
  it('should choose closest index file', () => {
    const mockFilePath = 'path/to/another/src/hello.pipe.ts';
    const mockParameter = {
      optionalTypes: {},
      type: AngularTypeNames.StandalonePipe
    } as any;
    
    const fileTree = [
      "path/to/another/src",
      "path/to/another/src/hello.pipe.ts",
      "path/to/another/index.ts",
      "path/to/another"
    ];
    const fileToModify = filesToAffect(mockFilePath, fileTree, mockParameter, 'angular');
    expect(fileToModify).toEqual(['path/to/another/index.ts']);
  });
});

describe('standalonepipeEffects', () => {
  it('should trigger standalone pipe effects', () => {
    const programmingLanguage = 'angular';
    const mockParameter = {
      type: AngularTypeNames.StandalonePipe
    } as any;
    const mockFileEffects: EditFileEffect[] = [{
      filePath: 'path/to/another/index.ts',
      originFilePath: 'path/to/another/src/hello.pipe.ts',
      content: ``
    }];
    const result = standaloneEffects(programmingLanguage, mockParameter, mockFileEffects);
    const indexContent = `export * from "./src/hello.pipe";
`;
    expect(result).toEqual([{
      content: indexContent,
      originFilePath: "path/to/another/src/hello.pipe.ts",
      filePath: 'path/to/another/index.ts'
    }]);
  });
});