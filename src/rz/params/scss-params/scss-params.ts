export function getScssParameters(optionName: string): any {
    switch(optionName) {
      case 'addScssBlock':
        return {
          nodeType: 'addScssBlock',
          inputs: [
            {
              name: 'codeBlock',
              inputType: 'code',
              description: 'Scss block of code to add to scss file.',
              codeExample: '.Toolbar__Icons{display: flex; cursor: pointer; margin-left: auto; gap: 16px;}'
            },
          ]
        }
      case 'import':
        return {
            nodeType: 'import',
            inputs: [
              {
                name: 'path',
                inputType: 'text',
                description: 'Import path to add to Scss file',
                codeExample: '~normalize.css'
              },
            ]
        };
      default:
        return {}
    }
  }

export function getScssOptions(): string[] {
   return ['addScssBlock', 'import'];
}
