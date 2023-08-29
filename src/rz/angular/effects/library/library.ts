import { morphJson } from "../../../json/json-morph";
import { EditFileEffect } from "../../../morph/interfaces/morph.interface";
import { AngularOptionalType } from "../../types/types";

// returns package json as well, so can get package json data
export function returnRootTsConfig(filePathWithName: string, fileTree: string[], optionalTypes: AngularOptionalType[]): string[] {
  return ['tsconfig.base.json', 'package.json'];  
}

export function libraryEffects(fileEffects: EditFileEffect[]): EditFileEffect[] {
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
        
        const editInput: any = {
            fileType: 'ts',
            fileName: fileName,
            filePath: filePath,
            fileToBeAddedTo: fileToBeAddedTo,
            edits: [{
            nodeType: 'addJsonKeyValue',
            valueToModify: '/compilerOptions/paths',
            codeBlock: {["@" + projectName + "/home"]: ["libs/home/src/index.ts"]}
            }]
        };
        const updatedFileToBeAddedTo = morphJson(editInput);
        fileEffect.content = updatedFileToBeAddedTo;
    }
  }
  return fileEffects;
}