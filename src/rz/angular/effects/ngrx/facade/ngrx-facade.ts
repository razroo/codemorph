import { EditInput } from '../../../../morph/interfaces/morph.interface';
import { findClosestModuleFile } from "../../../../utils";
import { createRelativePath, isTsFile } from "../../../../utils/add-export";
import { readFileSync, writeFileSync } from 'fs';
import { morphTypescript } from '../../../../typescript/morph-typescript';

export function addFacadeToNgModule(filePathWithName: string, className: string): void {
    // make sure that spec is not taken
    if(isTsFile(filePathWithName)) {
      const moduleTsFile = findClosestModuleFile(filePathWithName);
      const importPath = createRelativePath(filePathWithName, moduleTsFile);
      const fileName = moduleTsFile.split('.').pop();
      const fileToBeAddedTo = readFileSync(moduleTsFile, 'utf-8').toString();
      const FacadeName = `${className}Facade`;
      const editInput: EditInput = {
        fileType: 'ts',
        fileName: fileName as string,
        filePath: moduleTsFile,
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
          {
            nodeType: 'import',
            codeBlock: `{ ${FacadeName} }`,
            path: importPath,
          },
          {
            nodeType: 'addNgModuleProvider',
            codeBlock: FacadeName,
          }
        ]
      };
      const updatedFileToBeAddedTo = morphTypescript(editInput);
      // TODO extract write file logic from morphCode logic
      writeFileSync(moduleTsFile, updatedFileToBeAddedTo);
    }
}