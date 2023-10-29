import { EditInput, morphCode } from "../../morph";

describe('addVariableStatement', () => {
  it('should add a variable statement', () => {
    const fileToBeAddedTo = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class DataGraphqlModule { }`;

    const editTypescriptInput: EditInput = {
        fileToBeAddedTo: fileToBeAddedTo,
        fileName: 'name.component.ts',
        fileType: 'ts',
        edits: [
          {
            nodeType: 'addVariableStatement',
            name: 'cleanTypenameApolloLink',
            codeBlock: 'new ApolloLink(cleanTypenameLink)'
          }
        ]
    };

    const result = morphCode(editTypescriptInput);
    const expected = `const cleanTypenameApolloLink = new ApolloLink(cleanTypenameLink);

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class DataGraphqlModule { }
`;
  expect(result).toEqual(expected);
  });
});