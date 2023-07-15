import { EditInput } from '../../../../morph/interfaces/morph.interface';
import { findClosestModuleFile } from "../../../../utils";
import { createRelativePath, isTsFile } from "../../../../utils/add-export";
import { readFileSync, writeFileSync } from 'fs';
import { morphTypescript } from '../../../../typescript/morph-typescript';

export function addEffectToNgModule(filePathWithName: string, className: string): void {
    // make sure that spec is not taken
    if(isTsFile(filePathWithName)) {
      const moduleTsFile = findClosestModuleFile(filePathWithName);
      const importPath = createRelativePath(filePathWithName, moduleTsFile);
      const fileName = moduleTsFile.split('.').pop();
      const fileToBeAddedTo = readFileSync(moduleTsFile, 'utf-8').toString();
      const EffectsName = `${className}Effects`;
      const moduleName = `EffectsModule.forFeature([${EffectsName}])`
      const editInput: EditInput = {
        fileType: 'ts',
        fileName: fileName,
        filePath: moduleTsFile,
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
          {
            nodeType: 'import',
            codeBlock: `{ EffectsModule }`,
            path: '@ngrx/effects',
          },  
          {
            nodeType: 'import',
            codeBlock: `{ ${EffectsName} }`,
            path: importPath,
          },
          {
            nodeType: 'addNgModuleImport',
            codeBlock: moduleName,
          }
        ]
      };
      const updatedFileToBeAddedTo = morphTypescript(editInput);
      // TODO extract write file logic from morphCode logic
      writeFileSync(moduleTsFile, updatedFileToBeAddedTo);
    }
}