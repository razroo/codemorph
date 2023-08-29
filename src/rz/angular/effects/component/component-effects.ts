import { EditFileEffect, EditInput } from '../../../morph/interfaces/morph.interface';
import { readFileSync, writeFileSync } from 'fs';
import { findClosestModuleFile } from "../../../utils";
import { createRelativePath, exportTsFiles, isTsFile } from "../../../utils/add-export";
import { morphTypescript } from '../../../typescript/morph-typescript';
import { GlobalAngularOptionNames, AngularOptionalType } from '../../types/types';
import { names } from '../../../global-variables';
import { findClosestFileMatchUsingPaths } from '../../../utils/find-closest-file/find-closest-file';

export function fileToAddClassToDeclarationsAndImports(filePathWithName: string, fileTree: string[], optionalTypes: AngularOptionalType[]): string[] {
  if(isTsFile(filePathWithName)) {
    return findClosestFileMatchUsingPaths(filePathWithName, fileTree, 'module.ts');
  } else {
    return [];
  }
}

export function componentEffects(fileEffects: EditFileEffect[]): EditFileEffect[] {
  for(const fileEffect of fileEffects) {
    const filePath = fileEffect.filePath;
    const originFilePath = fileEffect.originFilePath;
    if(filePath.includes('module.ts')) {
      const componentFileName = originFilePath.split('/').pop();
      const componentName = (componentFileName as any).split('.')[0];
      const componentClassName = `${names(componentName).className}Component`;
      const importPath = createRelativePath(originFilePath, filePath);
      const fileName = filePath.split('/').pop();
      const fileToBeAddedTo = fileEffect.content;
      const editInput: EditInput = {
        fileType: 'ts',
        fileName: fileName,
        filePath: filePath,
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
          {
            nodeType: 'addNgModuleExport',
            codeBlock: componentClassName,
          },
          {
            nodeType: 'addNgModuleDeclaration',
            codeBlock: componentClassName,
          },
          {
            nodeType: 'import',
            codeBlock: `{ ${componentClassName} }`,
            path: importPath,
          }
        ]
      };
      const updatedFileToBeAddedTo = morphTypescript(editInput);
      fileEffect.content = updatedFileToBeAddedTo;
      console.log('filePath');
      console.log(filePath);
    }
  }
  return fileEffects;
}

export function addClassToDeclarationsAndImports(filePathWithName: string, className: string, optionalTypes: AngularOptionalType[]): void {
    if(isTsFile(filePathWithName)) {
      const moduleTsFile = findClosestModuleFile(filePathWithName);
      const componentFileName = filePathWithName.split('/').pop();
      const componentName = (componentFileName as any).split('.')[0];
      const componentClassName = `${names(componentName).className}Component`;
      const importPath = createRelativePath(filePathWithName, moduleTsFile);
      const fileName = moduleTsFile.split('/').pop();
      const fileToBeAddedTo = readFileSync(moduleTsFile, 'utf-8').toString();
      // const componentName = `${className}Component`;
      const editInput: EditInput = {
        fileType: 'ts',
        fileName: fileName,
        filePath: moduleTsFile,
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
          {
            nodeType: 'addNgModuleExport',
            codeBlock: componentClassName,
          },
          {
            nodeType: 'addNgModuleDeclaration',
            codeBlock: componentClassName,
          },
          {
            nodeType: 'import',
            codeBlock: `{ ${componentClassName} }`,
            path: importPath,
          }
        ]
      };
      if((optionalTypes as any).find((option: any) => option.name === GlobalAngularOptionNames.IsExported).selected){
        exportTsFiles(filePathWithName);
      }
      const updatedFileToBeAddedTo = morphTypescript(editInput);
      // TODO extract write file logic from morphCode logic
      writeFileSync(moduleTsFile, updatedFileToBeAddedTo);
    }
  }