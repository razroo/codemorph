export function getTsParameters(optionName: string): any {
  switch(optionName) {
    case 'import':
      return {
        nodeType: 'import',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'text',
            description: 'Import to add',
            codeExample: '{ HttpClientModule }'
          },
          {
            name: 'path',
            inputType: 'text',
            description: 'Path of the import to add',
            codeExample: '@angular/common/http'
          },
        ]
      }
    case 'export':
      return {
        nodeType: 'export',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'text',
            description: 'Namespace of export and optional',
            codeExample: 'dataTable'
          },
          {
            name: 'path',
            inputType: 'text',
            description: 'Path of the export to add',
            codeExample: './data-table/data-table'
          },
        ]
      }
    case 'addImportsToExisting':
      return {
        nodeType: 'addImportsToExisting',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'text',
            description: 'Named Import(s) to add',
            codeExample: 'EventEmitter, Output'
          },
          {
            name: 'path',
            inputType: 'text',
            description: 'Existing path to add import(s) to',
            codeExample: '@angular/common/http'
          },
        ]
      }
    case 'editImport':
      return {
        nodeType: 'editImport',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'text',
            description: 'Import to edit',
            codeExample: 'environment'
          },
          {
            name: 'path',
            inputType: 'text',
            description: 'Path of the import to edit',
            codeExample: '@common-environments'
          },
        ]
      }
    case 'classDeclaration':
      return {
        nodeType: 'classDeclaration',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'text',
            description: 'Code to add to top level inside of class.',
            codeExample: 'faBell = faBell'
          },
          {
            name: 'type',
            inputType: 'text',
            description: 'Type to add to your code.',
            codeExample: 'Function'
          }
        ]
      }
    case 'addClassMethod':
      return {
        nodeType: 'addClassMethod',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'text',
            description: 'Name of class method',
            codeExample: 'determineStatus'
          },
          {
            name: 'type',
            inputType: 'text',
            description: 'Type of class method',
            codeExample: 'string'
          },
          {
            name: 'parameters',
            inputType: 'code',
            description: 'Parameters to add to method',
            codeExample: "[{name: 'event', type: 'any'}]"
          },
          {
            name: 'bodyText',
            inputType: 'code',
            description: 'Code to go inside of method',
            codeExample: "this.toggle.emit(event);"
          }
        ]
      }
    case 'classMethod':
      return {
        nodeType: 'classMethod',
        inputs: [
          {
            name: 'nodeToInsertInto',
            inputType: 'text',
            description: 'Class method to insert code into.',
            codeExample: 'ngAfterViewInit'
          },
          {
            name: 'codeBlock',
            inputType: 'code',
            description: 'Code to add into class method.',
            codeExample: 'this.dataSource.sort = this.sort;'
          },
        ]
      }    
    case 'addNgModuleImport':
      return {
        nodeType: 'addNgModuleImport',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'code',
            description: 'ngModuleImport to add to imports array.',
            codeExample: 'BrowserModule'
          },
        ]
      }        
    case 'addNgModuleExport':
      return {
        nodeType: 'addNgModuleExport',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'code',
            description: 'export to add to exports array.',
            codeExample: 'HomeComponent'
          },
        ]
      }        
    case 'addNgModuleProvider':
      return {
        nodeType: 'addNgModuleProvider',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'code',
            description: 'Angular provider to add to providers array.',
            codeExample: 'LanguageService'
          },
        ]
      }
    case 'addNgModuleDeclaration':
      return {
        nodeType: 'addNgModuleDeclaration',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'code',
            description: 'Angular declaration to add to declarations array.',
            codeExample: 'HomeComponent'
          },
        ]
      }  
    case 'addNgModuleImportToSpec':
      return {
        nodeType: 'addNgModuleImportToSpec',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'code',
            description: 'Angular provider to add to the spec providers array.',
            codeExample: 'FontAwesomeModule'
          },
        ]
      }
    case 'addToVariableObject':
      return {
        nodeType: 'addToVariableObject',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'code',
            description: 'Variable object to add to ts object file',
            codeExample: `{
              "uri": "<%= prod-uri %>"
            }`
          },
        ]
      }
    case 'addConstructorMethod':
      return {
        nodeType: 'addConstructorMethod',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'text',
            description: 'Name of private method(left side)',
            codeExample: 'router'
          },
          {
            name: 'type',
            inputType: 'text',
            description: 'Name of type of private method(right side)',
            codeExample: 'Router'
          }
        ]
      }
    case 'addVariableDeclarationStatement':
      return {
        nodeType: 'addVariableDeclarationStatement',
        inputs: [
          {
            name: 'codeBlock',
            inputType: 'text',
            description: 'Name of variable',
            codeExample: 'gtag'
          },
          {
            name: 'type',
            inputType: 'text',
            description: 'Type of variable',
            codeExample: 'Function'
          }
        ]
      }
  }
}

export function getTsOptions(): string[] {
  return ['import', 'export', 'addImportsToExisting', 'editImport', 'classDeclaration', 'addClassMethod', 'classMethod', 'addNgModuleImport', 'addNgModuleExport', 'addNgModuleProvider', 'addNgModuleDeclaration', 'addNgModuleImportToSpec', 'addToVariableObject', 'addConstructorMethod', 'addVariableDeclarationStatement'];
}