import { ObjectLiteralExpression } from "ts-morph";
import { EditCodeBlockInput } from "../interfaces/edit-typescript.interface";

export function addToVariableObject(editCodeBlockInput: EditCodeBlockInput): void {
  const variableDeclaration = editCodeBlockInput.sourceFile.getVariableDeclarations()[0];
  const objectLiteralExpression = variableDeclaration.getInitializer() as ObjectLiteralExpression;
  // initalizer is the equivalent of value for key
  const objectToModify = typeof editCodeBlockInput.codeBlock === 'string' ? JSON.parse(editCodeBlockInput.codeBlock) : editCodeBlockInput.codeBlock;
  for (const [key, value] of Object.entries(objectToModify)) {
    if(typeof value === 'string') {
      // have to hack the compiler. For some reason de-stringing value
      objectLiteralExpression.addPropertyAssignment({name: key, initializer: `'${value}'` as string})
    }
    else {
      objectLiteralExpression.addPropertyAssignment({name: key, initializer: value as string})
    }
  }
}