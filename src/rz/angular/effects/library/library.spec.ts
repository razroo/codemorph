import { standaloneEffects } from "../../../morph";
import { EditFileEffect } from "../../../morph/interfaces/morph.interface";
import { AngularTypeNames } from "../../types/types";
import { returnRootTsConfig } from "./library";

describe('Library', () => {
  describe('returnRootTsConfig', () => {
    it('should return the root tsconfig to modify as well as package json to get project name from', () => {
      const result = returnRootTsConfig('', [], []);
      expect(result).toEqual(['tsconfig.base.json', 'package.json']);
    });  
  });

  describe('libraryEffects', () => {
    it('should modify the base tsconfig with the appropriate params', () => {
      const programmingLanguage = 'angular';
      const mockParameter = {
        type: AngularTypeNames.Library
      } as any;
      const mockPackageJson = `{
        "name": "test-codegen-eleven",
        "version": "0.0.0",
      }`;
      const mockTsConfigBase = `{
        "compileOnSave": false,
        "compilerOptions": {
          "paths": {
            "@test-codegen-eleven/common/common-ui": ["libs/common/common-ui/src/index.ts"],
          }   
        }
      `;
      const mockFileEffects: EditFileEffect[] = [
        {
          filePath: 'tsconfig.base.json',
          originFilePath: 'path/to/another/src/hello.component.ts',
          content: mockTsConfigBase
        },
        {
          filePath: 'package.json',
          originFilePath: 'path/to/another/src/hello.component.ts',
          content: mockPackageJson
        },
      ];
      const result = standaloneEffects(programmingLanguage, mockParameter, mockFileEffects);

      expect(result).toEqual('');
    });
  });
});