import { EditCodeBlockInput } from "../interfaces/edit-typescript.interface";
import { Scope } from "ts-morph";

// right now assumes all methods will be private
export function addConstructorMethod(editCodeBlockInput: EditCodeBlockInput): void {
  const classDeclaration = editCodeBlockInput.sourceFile.getClasses()[0];

  let classConstructor = classDeclaration.getConstructors()[0];
  if (!classConstructor) {
    classConstructor = classDeclaration.addConstructor();
  }

  classConstructor.addParameter({scope: Scope.Private, name: editCodeBlockInput.codeBlock, type: editCodeBlockInput.type});
}