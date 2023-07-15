import { TemplateInputParameter } from "../interfaces/template-parameters";

export function determineType(filePathAndName: string, templateParameters: TemplateInputParameter[]): string | undefined {
  filePathAndName.split('/');
  const folderWithCurlyBraces = filePathAndName[0];
  folderWithCurlyBraces.replace('{', '');
  folderWithCurlyBraces.replace('}', '');
  
  templateParameters.find(templateParameter => templateParameter.name === folderWithCurlyBraces);

  return templateParameters[0].type;
}