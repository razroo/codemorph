import { TemplateInputParameter } from './../../../utils/interfaces/template-parameters';
import { writeFileSync, readFileSync } from 'fs';
import { effects, filesToAffect } from "../../../morph";
import { AngularTypeNames } from "../../types/types";
import { directiveEffects } from './directive';
import { EditFileEffect } from '../../../morph/interfaces/morph.interface';

describe('exportDirectiveFile', () => {
    afterEach(() => {
        writeFileSync('src/rz/angular/effects/directive/index.ts', '');
    });
    it('should export directive file', () => {
        const mockFilePath = 'src/rz/angular/effects/directive/user.directive.ts';
        const mockTemplateInputParameter: TemplateInputParameter = {
            defaultValue: 'libs/{name}-dialog',
            description: 'File path for name file(s)',
            inputType: 'text',
            name: 'nameFilePath',
            optionalTypes: [{name: 'isExported', selected: true}],
            paramType: 'filePath',
            type: AngularTypeNames.Directive
        };
        effects(mockFilePath, mockTemplateInputParameter, 'angular');
        const result = readFileSync('src/rz/angular/effects/directive/index.ts').toString().trim();
        const expected = readFileSync('src/rz/angular/effects/directive/snapshots/index-output.ts.snap').toString().trim();

        expect(result).toEqual(expected);
    });

    it('should trigger directive effects', () => {
        const mockFileEffects: EditFileEffect[] = [{
          filePath: 'path/to/another/index.ts',
          originFilePath: 'path/to/another/src/hello.component.ts',
          content: ``
        }];
        const result = directiveEffects(mockFileEffects);
        const indexContent = `export * from "./src/hello.component";
`;
        expect(result).toEqual([{
          content: indexContent,
          originFilePath: "path/to/another/src/hello.component.ts",
          filePath: 'path/to/another/index.ts'
        }]);
      });

      it('should choose closest index file', () => {
        const mockFilePath = 'path/to/another/src/hello.directive.ts';
        const mockParameter = {
          optionalTypes: {},
          type: AngularTypeNames.Directive
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