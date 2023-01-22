import { TemplateInputParameter } from "../interfaces/template-parameters";

export function determineFilePathParameter(filePathAndName: string, templateParameters: TemplateInputParameter[]): TemplateInputParameter {
    filePathAndName.split('/');
    const folderWithCurlyBraces = filePathAndName[0];
    folderWithCurlyBraces.replace('{', '');
    folderWithCurlyBraces.replace('}', '');
    
    templateParameters.find(templateParameter => templateParameter.name === folderWithCurlyBraces);
  
    return templateParameters[0];
  }