import { findClosestModuleFile } from "../../../../utils";
import { createRelativePath, isTsFile } from "../../../../utils/add-export";
import { readFileSync, writeFileSync } from 'fs';
import { morphTypescript } from '../../../../typescript/morph-typescript';

export function addReducerToNgModule(filePathWithName: string, className: string, constantName: string): void {
    // make sure that spec is not taken
    if(isTsFile(filePathWithName)) {
      const moduleTsFile = findClosestModuleFile(filePathWithName);
      const importPath = createRelativePath(filePathWithName, moduleTsFile);
      const fileName = moduleTsFile.split('.').pop();
      const fileToBeAddedTo = readFileSync(moduleTsFile, 'utf-8').toString();
      const ReducerName = `from${className}`;
      const moduleName = `StoreModule.forFeature(${ReducerName}.${constantName}_FEATURE_KEY, ${ReducerName}.reducer)`;
      const editInput: any = {
        fileType: 'ts',
        fileName: fileName,
        filePath: moduleTsFile,
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
          {
            nodeType: 'import',
            codeBlock: `* as fromBooks`,
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