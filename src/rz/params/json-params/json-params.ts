export function getJsonParameters(optionName: string): any {
    switch(optionName) {
      case 'editJson':
        return {
          nodeType: 'editJson',
          inputs: [
            {
              name: 'valueToModify',
              inputType: 'text',
              description: 'Json key to modify.',
              codeExample: '/targets/build/configurations/production/fileReplacements'
            },
            {
              name: 'codeBlock',  
              description: 'Json value to put for key.',
              codeExample: `[{
                "replace": "libs/common/environments/src/lib/environment.ts",
                "with": "libs/common/environments/src/lib/environment.prod.ts"
              }]`,
              inputType: 'code'
            }
          ]
        }
      case 'addJsonKeyValue':
        return {
            nodeType: 'addJsonKeyValue',
            inputs: [
              {
                name: 'valueToModify',
                inputType: 'text',
                description: 'Json key to add more json key/values to',
                codeExample: 'scripts'
              },
              {
                name: 'codeBlock',
                inputType: 'code',
                description: 'object of key/values to add to the json key',
                codeExample: `{
                  "compodoc": "compodoc -p tsconfig.json",
                  "compodoc-serve": "compodoc -s tsconfig.json"
                }`
              }
            ]
        };
      default:
        return {}
    }
  }

  export function getJsonOptions(): string[] {
    return ['editJson', 'addJsonKeyValue'];
  }