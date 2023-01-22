import { determineFilePathParameter } from './determine-parameter';

describe('determineFilePathParameter', () => {
  it('should determine the file path parameter currently being used based on file path', () => {
    
    const mockTemplateParameters = [
      {
        defaultValue: 'libs/ui/common/src/lib',
        description: 'File path for name file(s)',
        inputType: 'text',
        name: 'nameFilePath',
        paramType: 'filePath',
        type: 'component'
      },
      {
        defaultValue: 'name',
        description: 'Value for name',
        inputType: 'text',
        name: 'name',
        paramType: 'templateVariable',
        type: null
      }
    ];
    const mockFilePath = '{nameFilePath}/{name}.component.spec.ts';
    
    const result = determineFilePathParameter(mockFilePath, mockTemplateParameters);
    expect(result).toEqual(mockTemplateParameters[0]);
  });
})

