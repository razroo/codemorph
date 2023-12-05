import { morphJson } from "../../../json/json-morph";
import { EditFileEffect } from "../../../morph/interfaces/morph.interface";

// returns package json as well, so can get package json data
export function returnRootTsConfig(filePathWithName: string, fileTree: string[], optionalTypes: AngularOptionalType[]): string[] {
  return ['tsconfig.base.json'];
}

// will use the name parameter to get name of library
export function nextJsLibraryEffects(fileEffects: EditFileEffect[], parameters: any): EditFileEffect[] {
    const newFileEffects = [];  
    for(const fileEffect of fileEffects) {
      const filePath = fileEffect.filePath;
      if(filePath.includes('tsconfig.base.json')) {
          const projectName = parameters['projectName'];
          const fileName = filePath.split('/').pop();
          const fileToBeAddedTo = fileEffect.content;
          const libPath = parameters['nameFilePath'];
          const libPathMinusLibFolder = libPath.replace('libs/', '');
          
          const editInput: any = {
              fileType: 'ts',
              fileName: fileName,
              filePath: filePath,
              fileToBeAddedTo: fileToBeAddedTo,
              edits: [{
                nodeType: 'addJsonKeyValue',
                valueToModify: `paths`,
                codeBlock: {[`@${projectName}/${libPathMinusLibFolder}`]: [`${libPath}/src/index.ts`]}
              }]
          };
          const updatedFileToBeAddedTo = morphJson(editInput);
          fileEffect.content = updatedFileToBeAddedTo;
          newFileEffects.push(fileEffect);
      }
    }
  return newFileEffects;
}