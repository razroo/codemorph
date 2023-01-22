import { TemplateInputParameter } from './../../../utils/interfaces/template-parameters';
import { writeFileSync, readFileSync } from 'fs';
import { effects } from "../../../morph";
import { AngularTypeNames } from "../../types/types";

describe('exportGraphqlFile', () => {
    afterEach(() => {
        writeFileSync('src/rz/angular/effects/graphql/index.ts', '');
    });
    it('should export graphql file', () => {
        const mockFilePath = 'src/rz/angular/effects/graphql/user.mutations.ts';
        const mockTemplateInputParameter: TemplateInputParameter = {
            defaultValue: 'libs/{name}-dialog',
            description: 'File path for name file(s)',
            inputType: 'text',
            name: 'nameFilePath',
            optionalTypes: [{name: 'isExported', selected: true}],
            paramType: 'filePath',
            type: AngularTypeNames.Graphql
        };

        effects(mockFilePath, mockTemplateInputParameter, 'angular');
        const result = readFileSync('src/rz/angular/effects/graphql/index.ts').toString();
        const expected = readFileSync('src/rz/angular/effects/graphql/snapshots/index-output.ts.snap').toString();
        expect(result).toEqual(expected);
    });
});