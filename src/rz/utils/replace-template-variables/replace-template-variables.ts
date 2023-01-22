import { replaceTagParameters } from './../../../replace';
export function replaceCodeModEditsTemplateVariables(codeModEdits: any, parameters: any): any {
  return codeModEdits.map((codeMod: any) => {
    return Object.fromEntries(
        Object.entries(codeMod).map(([key, value]) => [key, replaceTagParameters(parameters, value as string)]));
  });
}