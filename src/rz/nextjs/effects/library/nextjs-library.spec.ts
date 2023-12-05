import { filesToAffect, standaloneEffects } from "../../../morph";
import { EditFileEffect } from "../../../morph/interfaces/morph.interface";
import { NextjsTypeNames } from "../../types/nextjs-types";
import { returnRootTsConfig } from "./nextjs-library";

describe('Nextjs Library', () => {
  describe('returnRootTsConfig', () => {
    it('should choose closest index file', () => {
      const mockFilePath = 'path/to/another/src/hello.service.ts';
      const mockParameter = {
          optionalTypes: {},
          type: NextjsTypeNames.Library
      } as any;
      
      const fileTree = [
          "path/to/another/src",
          "path/to/another/src/hello.component.ts",
          "path/to/another/index.ts",
          "path/to/another"
      ];
      const fileToModify = filesToAffect(mockFilePath, fileTree, mockParameter, 'angular');
      expect(fileToModify).toEqual(['tsconfig.base.json']);
    });
  });

  describe('libraryEffects', () => {
    it('should modify the base tsconfig with the appropriate params', () => {
      const programmingLanguage = 'nextjs';
      const mockParameter = {
        type: NextjsTypeNames.Library
      } as any;
      const mockParameters = {
        name: 'home',
        nameFilePath: 'libs/ui/home',
        projectName: 'test-codegen-eleven'
      }
      
      const mockTsConfigBase = {
        "compileOnSave": false,
        "compilerOptions": {
          "paths": {
            "@test-codegen-eleven/common/common-ui": ["libs/common/common-ui/src/index.ts"],
          }   
        }
      };
      const expectedMockTsConfigBase = {
        "compileOnSave": false,
        "compilerOptions": {
          "paths": {
            "@test-codegen-eleven/common/common-ui": ["libs/common/common-ui/src/index.ts"],
            "@test-codegen-eleven/ui/home": ["libs/ui/home/src/index.ts"],
          }
        }
      };
      const mockTsConfigBaseStringfied = JSON.stringify(mockTsConfigBase);
      const mockExpectedMockTsConfigBaseStringified = JSON.stringify(expectedMockTsConfigBase, null, 2);
      const mockFileEffects: EditFileEffect[] = [
        {
          filePath: 'tsconfig.base.json',
          originFilePath: 'path/to/another/src/hello.component.ts',
          content: mockTsConfigBaseStringfied
        }
      ];
      const result = standaloneEffects(programmingLanguage, mockParameter, mockFileEffects, mockParameters);
      const expected = [
        {
          filePath: 'tsconfig.base.json',
          originFilePath: 'path/to/another/src/hello.component.ts',
          content: mockExpectedMockTsConfigBaseStringified
        }
      ];
      expect(result).toEqual(expected);
    });
  });
});