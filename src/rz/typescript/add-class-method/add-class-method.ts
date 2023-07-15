import { EditCodeBlockInput } from "../interfaces/edit-typescript.interface";

export function addClassMethod(editCodeBlockInput: EditCodeBlockInput): void {
   const classDeclaration = editCodeBlockInput.sourceFile.getClasses()[0];
   editCodeBlockInput.parameters;
   const addMethod = {
      isStatic: false,
      name: editCodeBlockInput.codeBlock,
      returnType: editCodeBlockInput.type,   
   }
   if(editCodeBlockInput.parameters) {
      const parameters = eval(editCodeBlockInput.parameters)  as unknown as {name: string, type: string}[];
      (addMethod as any)['parameters'] = parameters;
   }
   
   classDeclaration.addMethod({
      ...addMethod,
   }).setBodyText(editCodeBlockInput.bodyText ? editCodeBlockInput.bodyText : '');
}