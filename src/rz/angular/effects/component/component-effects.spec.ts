import { readFileSync, writeFileSync } from 'fs';
import { TemplateInputParameter } from '../../../utils/interfaces/template-parameters';
import { effects, Parameters } from "../../../morph";

describe('Angular Component Effects', () => {
  afterEach(() => {
    const moduleOriginal = readFileSync('effects/component/snapshots/module-original.ts.snap').toString();
    writeFileSync('effects/component/index.ts', '');
    writeFileSync('effects/component/sample.module.ts', moduleOriginal);
  });
  it('should update the closest app module file with an ngmodule export, declaration, import component, and export via optional type', () => {
    const mockFilePath = 'effects/component/sample.component.ts';
    const parameters: Parameters = {
      className: 'Sample'
    };
    const mockTemplateInputParameter: TemplateInputParameter = {
      defaultValue: 'libs/{name}-dialog',
      description: 'File path for name file(s)',
      inputType: 'text',
      name: 'nameFilePath',
      optionalTypes: [{name: 'isExported', selected: true}],
      paramType: 'filePath',
      type: 'component'
    }
    effects(mockFilePath, mockTemplateInputParameter, 'angular', JSON.stringify(parameters));

    const indexResult = readFileSync('effects/component/index.ts').toString();
    const indexExpected = readFileSync('effects/component/snapshots/index-output.ts.snap').toString();
    expect(indexResult).toEqual(indexExpected);

    const moduleResult = readFileSync('effects/component/sample.module.ts').toString();
    const moduleExpected = readFileSync('effects/component/snapshots/module-output.ts.snap').toString();
    expect(moduleResult).toEqual(moduleExpected);
  })
});