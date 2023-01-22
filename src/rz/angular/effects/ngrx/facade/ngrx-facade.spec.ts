import { TemplateInputParameter } from './../../../../utils/interfaces/template-parameters';
import { AngularTypeNames } from './../../../types/types';
import { effects, Parameters } from "../../../../../../src/rz/morph";
import { writeFileSync, readFileSync } from 'fs';

describe('addFacadeToNgModule', () => {
    afterEach(() => {
      const moduleToUseToReset = readFileSync('src/rz/angular/effects/ngrx/facade/snapshots/ngrx-facade.module.ts.snap').toString();
      writeFileSync('src/rz/angular/effects/ngrx/facade/test.module.ts', moduleToUseToReset);
    });
    it('should update the closest app module file with ngrx facade codemods', () => {
      const mockFilePath = 'src/rz/angular/effects/ngrx/facade/snapshots/sample.facade.ts';
      const parameters: Parameters = {
        className: 'Test'
      };
      const parametersString = JSON.stringify(parameters);
      const mockTemplateInputParameter: TemplateInputParameter = {
        defaultValue: 'libs/{name}-dialog',
        description: 'File path for name file(s)',
        inputType: 'text',
        name: 'nameFilePath',
        optionalTypes: [{name: 'isExported', selected: true}],
        paramType: 'filePath',
        type: AngularTypeNames.NgrxFacade
      }
      effects(mockFilePath, mockTemplateInputParameter, 'angular', parametersString);
      const result = readFileSync('src/rz/angular/effects/ngrx/facade/test.module.ts').toString();
      const expected = readFileSync('src/rz/angular/effects/ngrx/facade/snapshots/ngrx-facade-output.module.ts.snap').toString();

      expect(result).toEqual(expected);
    })
});