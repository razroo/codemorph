import { EditFileEffect } from "../../../morph/interfaces/morph.interface";
import { morphTypescript } from "../../../typescript/morph-typescript";
import { createRelativePath, exportTsFiles, isTsFile } from "../../../utils/add-export";
import { findClosestFileUsingPaths } from "../../../utils/find-closest-file/find-closest-file";
import { AngularOptionalType } from "../../types/types";

export function exportComponentFile(filePathWithName: string): void {
  if(isTsFile(filePathWithName)) {
    exportTsFiles(filePathWithName);
  }
}

export function closestIndexFileToImportTo(filePathWithName: string, fileTree: string[], optionalTypes: AngularOptionalType[]): string[] {
  if(isTsFile(filePathWithName)) {
    return findClosestFileUsingPaths(filePathWithName, fileTree, 'index.ts');
  } else {
    return [];
  }
}

export function standaloneComponentEffects(fileEffects: EditFileEffect[]): EditFileEffect[] {
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