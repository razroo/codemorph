import { EditInput, morphCode } from "../../morph";

describe('addVaraibleDeclarationStatement', () => {
  it('should add a variable declaration statement to a file', () => {
    const fileToBeAddedTo = `import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  
  @NgModule({
    imports: [CommonModule],
  })
  export class DataGraphqlModule { }`;

      const editInput: EditInput = {
        fileType: 'ts',
        fileName: 'app.component.ts',
        fileToBeAddedTo,
        edits: [
          {
            nodeType: 'addVariableDeclarationStatement',
            codeBlock: 'gtag',
            type: 'Function'
          }
        ]
      };
  
      const typescriptString = morphCode(editInput);
  
      const expected = `
`;
  
      expect(typescriptString).toEqual(expected);  
  });
});

