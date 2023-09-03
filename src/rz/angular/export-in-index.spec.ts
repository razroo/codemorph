import { EditFileEffect } from '../morph/interfaces/morph.interface';
import { exportInIndex } from './export-in-index';
import { AngularTypeNames } from './types/types';

describe('exportInIndex', () => {
  it('should add export to index file', () => {
        const programmingLanguage = 'angular';
        const mockParameter = {
          type: AngularTypeNames.StandaloneComponent
        } as any;
        const mockFileEffects: EditFileEffect[] = [{
          filePath: 'path/to/another/index.ts',
          originFilePath: 'path/to/another/src/hello.component.ts',
          content: ``
        }];
        const result = exportInIndex(mockFileEffects);
        const indexContent = `export * from "./src/hello.component";
`;
        expect(result).toEqual([{
          content: indexContent,
          originFilePath: "path/to/another/src/hello.component.ts",
          filePath: 'path/to/another/index.ts'
        }]);
  });
});
