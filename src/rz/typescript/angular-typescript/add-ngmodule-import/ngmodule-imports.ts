import { SyntaxKind, ts } from "ts-morph";
import { EditCodeBlockInput } from "../../interfaces/edit-typescript.interface";

export function addNgModuleImport(editCodeBlockInput: EditCodeBlockInput): void {
  const ngModuleClass = editCodeBlockInput.sourceFile.getClass(c => c.getText().includes('@NgModule'));
  const ngModuleDecorator = (ngModuleClass as any).getDecorator('NgModule');
  const moduleArguments = (ngModuleDecorator as any).getArguments()[0];

  const declarationsProp = moduleArguments.getDescendants()
    .find((d: any) => d.getKind() === SyntaxKind.PropertyAssignment &&
        (d.compilerNode as ts.PropertyAssignment).name.getText() === "imports");

  const array = (declarationsProp as any).getFirstChildByKindOrThrow(SyntaxKind.ArrayLiteralExpression);
  array.addElement(editCodeBlockInput.codeBlock);
}