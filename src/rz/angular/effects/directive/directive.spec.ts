import { TemplateInputParameter } from './../../../utils/interfaces/template-parameters';
import { writeFileSync, readFileSync } from 'fs';
import { effects } from "../../../morph";
import { AngularTypeNames } from "../../types/types";

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
});