import { TemplateInputParameter } from './../../../utils/interfaces/template-parameters';
import { writeFileSync, readFileSync } from 'fs';
import { effects } from "../../../morph";
import { AngularTypeNames } from "../../types/types";

describe('exportServiceFile', () => {
    afterEach(() => {
        writeFileSync('src/rz/angular/effects/service/index.ts', '');
    });
    it('should export service file', () => {
        const mockFilePath = 'src/rz/angular/effects/service/user.service.ts';
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
        const result = readFileSync('src/rz/angular/effects/service/index.ts').toString();
        const expected = readFileSync('src/rz/angular/effects/service/snapshots/index-output.ts.snap').toString();
        expect(result).toEqual(expected);
    });
});