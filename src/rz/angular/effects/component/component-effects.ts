import { EditInput } from '../../../morph/interfaces/morph.interface';
import { readFileSync, writeFileSync } from 'fs';
import { findClosestModuleFile } from "../../../utils";
import { createRelativePath, exportTsFiles, isTsFile } from "../../../utils/add-export";
import { morphTypescript } from '../../../typescript/morph-typescript';
import { GlobalAngularOptionNames, AngularOptionalType } from '../../types/types';
import { names } from '../../../global-variables';

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