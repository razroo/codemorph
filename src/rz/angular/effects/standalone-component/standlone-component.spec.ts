import { TemplateInputParameter } from './../../../utils/interfaces/template-parameters';
import { writeFileSync, readFileSync } from 'fs';
import { effects } from "../../../morph";
import { AngularTypeNames } from "../../types/types";

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