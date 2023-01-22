export function getHtmlParameters(optionName: string): any {
    switch(optionName) {
      case 'editHtmlTag':
        return {
          nodeType: 'editHtmlTag',
          inputs: [
            {
              name: 'codeBlock',
              inputType: 'text',
              description: 'New tag name to put in place of modified tag.',
              codeExample: 'matSort'
            },
            {
              name: 'tagNameToModify',
              inputType: 'text',
              description: 'Tag name to modify.',
              codeExample: 'mat-table'
            }
          ]
        }
      case 'addSiblingHtml':
        return {
            nodeType: 'addSiblingHtml',
            inputs: [
              {
                name: 'codeBlock',
                inputType: 'code',
                description: 'Code of html to insert after sibling html.',
                codeExample: '<mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>'
              },
              {
                name: 'tagNameToInsert',
                inputType: 'text',
                description: 'Tag name of code that will be inserted in.',
                codeExample: 'mat-paginator'
              },
              {
                name: 'siblingTagName',
                inputType: 'text',
                description: 'Tag name to insert code after',
                codeExample: 'mat-table'
              }
            ]
        };
      case 'insertIntoHtmlTag':
        return {
          nodeType: 'insertIntoHtmlTag',
          inputs: [
            {
              name: 'codeBlock',
              inputType: 'code',
              description: 'Code that will be inserted into html code.',
              codeExample: '<div class="Toolbar__Icons"><fa-icon [icon]="faBell" aria-hidden="false" aria-label="Notification Icon"></fa-icon></div>'
            },
            {
              name: 'tagNameToInsertInto',
              inputType: 'text',
              description: 'Tag name of html we will be inserting into.',
              codeExample: 'mat-toolbar'
            }
          ]
        }
      case 'deleteHtmlElement':
        return {
          nodeType: 'deleteHtmlElement',
          inputs: [
            {
              name: 'codeBlock',
              inputType: 'code',
              description: 'html element that will be delete',
              codeExample: 'mat-toolbar'
            },
          ]
        }  
      case 'prependHtml':
        return {
          nodeType: 'prependHtml',
          inputs: [
            {
              name: 'codeBlock',
              inputType: 'code',
              description: 'html code to be prepended',
              codeExample: 'global-header'
            },
            {
              name: 'tagNameToInsertInto',
              inputType: 'code',
              description: 'html tag to prepend code into',
              codeExample: 'global-header'
            }
          ]
        }
      case 'appendHtml':
        return {
          nodeType: 'appendHtml',
          inputs: [
            {
              name: 'codeBlock',
              inputType: 'code',
              description: 'html element to go to end of file',
              codeExample: 'global-header'
            },
            {
              name: 'tagNameToInsertInto',
              inputType: 'code',
              description: 'html tag to append code into',
              codeExample: 'global-header'
            }
          ]
        }
      default:
        return {}
    }
  }

  export function getHtmlOptions(): string[] {
    return ['editHtmlTag', 'addSiblingHtml', 'insertIntoHtmlTag', 'deleteHtmlElement', 'prependHtml', 
    'appendHtml'];
  }