import { SyntaxKind, ts } from "ts-morph";
import { EditCodeBlockInput } from "../../interfaces/edit-typescript.interface";

export function addNgModuleItem(editCodeBlockInput: EditCodeBlockInput, itemNameToAdd = 'providers'): void {
  const ngModuleClass = editCodeBlockInput.sourceFile.getClass(c => c.getText().includes('@NgModule'));
  const ngModuleDecorator = (ngModuleClass as any).getDecorator('NgModule');
  const moduleArguments = (ngModuleDecorator as any).getArguments()[0];

  const declarationsProp = moduleArguments.getDescendants()
    .find((d: any) => d.getKind() === SyntaxKind.PropertyAssignment &&
        (d.compilerNode as ts.PropertyAssignment).name.getText() === itemNameToAdd);

  // add object key / value if does not exist
  if(!declarationsProp) {
    const objectToUpdate = (ngModuleDecorator as any).getDescendants().find((d: any) => {
      return d.getKind() === SyntaxKind.ObjectLiteralExpression
    });

    // this is an object which can know be updated
    (objectToUpdate as any).addPropertyAssignment({
      name: itemNameToAdd,
      initializer: `[${editCodeBlockInput.codeBlock}]`,
    })
  }
  else {
    const array = declarationsProp.getFirstChildByKind(SyntaxKind.ArrayLiteralExpression) as any;
    array.addElement(editCodeBlockInput.codeBlock);
  }
}

export function addNgModuleItemToSpec(editCodeBlockInput: EditCodeBlockInput, itemNameToAdd = 'providers'): void {
  const sourceFile = editCodeBlockInput.sourceFile;
  const describeBlock = sourceFile.getDescendantsOfKind(SyntaxKind.ExpressionStatement)[0];
  console.log('describeBlock');
  console.log(describeBlock.getText());

  const beforeEachStatement = describeBlock.getDescendants()
    .find(d => {
      return d.getKind() === SyntaxKind.CallExpression &&
        (d.compilerNode as ts.ExpressionStatement).getText().includes("configureTestingModule")
      }) as any;

  const ngModulePropItem = beforeEachStatement.getDescendants()
    .find((d: any) => d.getKind() === SyntaxKind.PropertyAssignment &&
        (d.compilerNode as ts.PropertyAssignment).name.getText() === itemNameToAdd);

  // add object key / value if does not exist
  if(!ngModulePropItem) {
    const objectToUpdate = beforeEachStatement.getDescendants().find((d: any) => {
      return d.getKind() === SyntaxKind.ObjectLiteralExpression
    });

    // this is an object which can know be updated
    (objectToUpdate as any).addPropertyAssignment({
      name: itemNameToAdd,
      initializer: `[${editCodeBlockInput.codeBlock}]`,
    })
  }
  else {
    const array = ngModulePropItem.getFirstChildByKind(SyntaxKind.ArrayLiteralExpression);
    array.addElement(editCodeBlockInput.codeBlock);
  }
}

export function addNgModuleProviderToSpec(editCodeBlockInput: EditCodeBlockInput): void {
  const sourceFile = editCodeBlockInput.sourceFile;
  const providersProp = sourceFile.getDescendants()
    .find(d => d.getKind() === SyntaxKind.PropertyAssignment &&
        (d.compilerNode as ts.PropertyAssignment).name.getText() === "providers");
  const array = (providersProp as any).getFirstChildByKindOrThrow(SyntaxKind.ArrayLiteralExpression);
  array.addElement(editCodeBlockInput.codeBlock);
}