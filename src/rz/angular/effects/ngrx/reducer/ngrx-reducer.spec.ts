import { TemplateInputParameter } from './../../../../utils/interfaces/template-parameters';
import { AngularTypeNames } from '../../../types/types';
import { effects, Parameters } from "../../../../morph";
import { writeFileSync, readFileSync } from 'fs';

describe('addReducerToNgModule', () => {
    afterEach(() => {
      const moduleToUseToReset = readFileSync('src/rz/angular/effects/ngrx/reducer/snapshots/ngrx-reducer.module.ts.snap').toString();
      writeFileSync('src/rz/angular/effects/ngrx/reducer/test.module.ts', moduleToUseToReset);
    });
    it('should update the closest app module file with ngrx reducer codemods', () => {
      const mockFilePath = 'src/rz/angular/effects/ngrx/reducer/snapshots/sample.reducer.ts';
      const parameters: Parameters = {
        className: 'Test',
        constantName: 'TEST'
      };
      const mockTemplateInputParameter: TemplateInputParameter = {
        defaultValue: 'libs/{name}-dialog',
        description: 'File path for name file(s)',
        inputType: 'text',
        name: 'nameFilePath',
        optionalTypes: [{name: 'isExported', selected: true}],
        paramType: 'filePath',
        type: AngularTypeNames.NgrxReducer
      }
      const parametersString = JSON.stringify(parameters);
      effects(mockFilePath, mockTemplateInputParameter, 'angular', parametersString);
      const result = readFileSync('src/rz/angular/effects/ngrx/reducer/test.module.ts').toString();
      const expected = readFileSync('src/rz/angular/effects/ngrx/reducer/snapshots/ngrx-reducer-output.module.ts.snap').toString();

      expect(result).toEqual(expected);
    })
});