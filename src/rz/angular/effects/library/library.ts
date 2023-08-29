import { morphJson } from "../../../json/json-morph";
import { EditFileEffect } from "../../../morph/interfaces/morph.interface";
import { AngularOptionalType } from "../../types/types";

// returns package json as well, so can get package json data
export function returnRootTsConfig(filePathWithName: string, fileTree: string[], optionalTypes: AngularOptionalType[]): string[] {
  return ['tsconfig.base.json', 'package.json'];  
}

// will use the name parameter to get name of library
export function libraryEffects(fileEffects: EditFileEffect[], parameters: any): EditFileEffect[] {
  const newFileEffects = [];  
  for(const fileEffect of fileEffects) {
    const filePath = fileEffect.filePath;
    const originFilePath = fileEffect.originFilePath;
    if(filePath.includes('tsconfig.base.json')) {
        // get project name
        const packageJson = fileEffects.find(fileEffect => fileEffect.filePath === 'package.json')
        const packageJsonParse = packageJson && JSON.parse(packageJson.content);
        const projectName = packageJsonParse.name;
        const fileName = filePath.split('/').pop();
        const fileToBeAddedTo = fileEffect.content;
        const libName = parameters['name'];
        const libPath = parameters['nameFilePath'];
        
        const editInput: any = {
            fileType: 'ts',
            fileName: fileName,
            filePath: filePath,
            fileToBeAddedTo: fileToBeAddedTo,
            edits: [{
              nodeType: 'addJsonKeyValue',
              valueToModify: `paths`,
              codeBlock: {[`@${projectName}/${libName}`]: [`${libPath}/${libName}/src/index.ts`]}
            }]
        };
        const updatedFileToBeAddedTo = morphJson(editInput);
        fileEffect.content = updatedFileToBeAddedTo;
        newFileEffects.push(fileEffect);
    }
  }
  return newFileEffects;
}