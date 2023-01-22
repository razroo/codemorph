import { replaceCodeModEditsTemplateVariables } from './replace-template-variables';

describe('replaceCodeModEditsTemplateVariables', () => {
  it('should replace code mod edits with the respective value to replace', () => {
    const mockParameters = {
      name: 'user',
      className: 'User',
      appFilePath: 'apps/razroo-angular-starter/src/app',
      projectName: 'razroo-angular-starter'
    };

    const codeModEdits = [
      {
        nodeType: "import",
        path: "@<%= projectName %>/common/ui",
        codeBlock: "{ <%= className %>Module }"
      }
    ];

    const result = replaceCodeModEditsTemplateVariables(codeModEdits, mockParameters);
    const expected = [
      {
         nodeType: "import",
         path: "@razroo-angular-starter/common/ui",
         codeBlock:"{ UserModule }"
      }
    ];

    expect(result).toEqual(expected);
  });  
})