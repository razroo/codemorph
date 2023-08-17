import { readFileSync, writeFileSync } from 'fs';
import { TemplateInputParameter } from '../../../utils/interfaces/template-parameters';
import { effects, Parameters } from "../../../morph";
import { componentEffects, fileToAddClassToDeclarationsAndImports } from './component-effects';
import { filesToAffect, standaloneEffects } from '../../../morph/morph';
import { AngularTypeNames } from '../../types/types';
import { EditFileEffect } from '../../../morph/interfaces/morph.interface';

describe('Angular Component Effects', () => {
  afterEach(() => {
    const moduleOriginal = readFileSync('src/rz/angular/effects/component/snapshots/module-original.ts.snap').toString();
    writeFileSync('src/rz/angular/effects/component/index.ts', '');
    writeFileSync('src/rz/angular/effects/component/sample.module.ts', moduleOriginal);
  });
  it('should update the closest app module file with an ngmodule export, declaration, import component, and export via optional type', () => {
    const mockFilePath = 'src/rz/angular/effects/component/sample.component.ts';
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

    const indexResult = readFileSync('src/rz/angular/effects/component/index.ts').toString();
    const indexExpected = readFileSync('src/rz/angular/effects/component/snapshots/index-output.ts.snap').toString();
    expect(indexResult).toEqual(indexExpected);

    const moduleResult = readFileSync('src/rz/angular/effects/component/sample.module.ts').toString();
    const moduleExpected = readFileSync('src/rz/angular/effects/component/snapshots/module-output.ts.snap').toString();
    expect(moduleResult).toEqual(moduleExpected);
  });

  it('should get the closest app module file', () => {
    const mockFilePath = 'path/to/another/src/hello.component.ts';
    const mockParameter = {
      optionalTypes: {},
      type: AngularTypeNames.Component
    } as any;
    
    const fileTree = [
      "path/to/another/src",
      "path/to/another/src/hello.component.ts",
      "path/to/another/hello.module.ts",
      "path/to/another"
    ];
    const fileToModify = filesToAffect(mockFilePath, fileTree, mockParameter, 'angular');
    expect(fileToModify).toEqual(['path/to/another/hello.module.ts']);
  });

  it('should trigger component standalone effects codemorph', () => {
    const programmingLanguage = 'angular';
    const mockParameter = {
      type: AngularTypeNames.Component
    } as any;
    const mockFileEffects: EditFileEffect[] = [{
      filePath: 'path/to/another/hello.module.ts',
      originFilePath: 'path/to/another/src/hello.component.ts',
      content: `import { NgModule } from '@angular/core';
      import { CommonModule } from '@angular/common';
      
      @NgModule({
        imports: [CommonModule],
      })
      export class CommonUiModule {}
      `
    }];
    const result = standaloneEffects(programmingLanguage, mockParameter, mockFileEffects);
    const moduleContent = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloComponent } from "./src/hello.component";

@NgModule({
  imports: [CommonModule],
  exports: [HelloComponent],
  declarations: [HelloComponent]
})
export class CommonUiModule { }
`;
    expect(result).toEqual([{
      content: moduleContent,
      originFilePath: "path/to/another/src/hello.component.ts",
      filePath: "path/to/another/hello.module.ts"
    }]);
  });
});