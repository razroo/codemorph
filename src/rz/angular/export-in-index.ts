import { EditFileEffect } from "../morph/interfaces/morph.interface";
import { morphTypescript } from "../typescript/morph-typescript";
import { createRelativePath } from "../utils/add-export";

export function exportInIndex(fileEffects: EditFileEffect[]){
    for(const fileEffect of fileEffects) {
        const filePath = fileEffect.filePath;
        const originFilePath = fileEffect.originFilePath;
        if(filePath.includes('index.ts')) {
          const fileName = filePath.split('/').pop();
          const fileToBeAddedTo = fileEffect.content;
          const exportPath = createRelativePath(originFilePath, filePath);
          const editInput: any = {
            fileType: 'ts',
            fileName: fileName,
            filePath: filePath,
            fileToBeAddedTo: fileToBeAddedTo,
            edits: [{
              nodeType: 'export',
              codeBlock: '',
              path: exportPath
            }]
          };
          const updatedFileToBeAddedTo = morphTypescript(editInput);
          fileEffect.content = updatedFileToBeAddedTo;
        }
    }
    return fileEffects;
}