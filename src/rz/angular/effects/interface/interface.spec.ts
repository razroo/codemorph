import { TemplateInputParameter } from './../../../utils/interfaces/template-parameters';
import { writeFileSync, readFileSync } from 'fs';
import { effects, filesToAffect } from "../../../morph";
import { AngularTypeNames } from "../../types/types";
import { EditFileEffect } from '../../../morph/interfaces/morph.interface';
import { interfaceEffects } from './interface';

describe('exportInterfaceFile', () => {
    afterEach(() => {
        writeFileSync('src/rz/angular/effects/interface/index.ts', '');
    });
    it('should export interface file', () => {
        const mockFilePath = 'src/rz/angular/effects/interface/user.interface.ts';
        const mockTemplateInputParameter: TemplateInputParameter = {
            defaultValue: 'libs/{name}-dialog',
            description: 'File path for name file(s)',
            inputType: 'text',
            name: 'nameFilePath',
            optionalTypes: [{name: 'isExported', selected: true}],
            paramType: 'filePath',
            type: AngularTypeNames.Interface
        };
        effects(mockFilePath, mockTemplateInputParameter, 'angular');
        const result = readFileSync('src/rz/angular/effects/interface/index.ts').toString();
        const expected = readFileSync('src/rz/angular/effects/interface/snapshots/index-output.ts.snap').toString();
        expect(result).toEqual(expected);
    });

    it('should trigger interface effects', () => {
        const mockFileEffects: EditFileEffect[] = [{
          filePath: 'path/to/another/index.ts',
          originFilePath: 'path/to/another/src/hello.component.ts',
          content: ``
        }];
        const result = interfaceEffects(mockFileEffects);
        const indexContent = `export * from "./src/hello.component";
`;
        expect(result).toEqual([{
          content: indexContent,
          originFilePath: "path/to/another/src/hello.component.ts",
          filePath: 'path/to/another/index.ts'
        }]);
      });

      it('should choose closest index file', () => {
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