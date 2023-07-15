import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, parse, relative} from "path";
import { morphTypescript } from '../../typescript/morph-typescript';

export function findNearestIndexFile(path: string, fileNameToFind = 'index.ts'): string {
    let currentDir = path;
    while (currentDir.length > 0) {
        const indexPath = currentDir + `/${fileNameToFind}`;
        if (existsSync(indexPath)) {
           return indexPath;
        }
        currentDir = currentDir.substring(0, currentDir.lastIndexOf("/"));
    }
    return "";
}

// takes in file path and exports it in closest index.ts file
export function exportTsFiles(filePathWithName: string): void {
  if(isTsFile(filePathWithName)) {
    const indexTsFile = findNearestIndexFile(filePathWithName);
    const exportPath = createRelativePath(filePathWithName, indexTsFile);
    const fileToBeAddedTo = readFileSync(indexTsFile, 'utf-8').toString();
    const editInput: any = {
      fileType: 'ts',
      fileName: 'index.ts',
      filePath: indexTsFile,
      fileToBeAddedTo: fileToBeAddedTo,
      edits: [{
        nodeType: 'export',
        codeBlock: '',
        path: exportPath
      }]
    };
    const updatedFileToBeAddedTo = morphTypescript(editInput);
    // TODO extract write file logic from morphCode logic
    writeFileSync(indexTsFile, updatedFileToBeAddedTo);
  }
}

export function createRelativePath(
  pathToBeExported: string,
  pathToBeUpdated: string,
): string {
  let relativePath = relative(
    dirname(pathToBeUpdated),
    dirname(pathToBeExported),
  );
  if(relativePath && relativePath.substr(0, 2) !== '..') {
    relativePath = './' + relativePath
  }

  return `${relativePath ? relativePath : '.'}/${parse(pathToBeExported).name}`;
}

export function isTsFile(filePathWithName: string): boolean {
    return filePathWithName.endsWith(".ts") && !filePathWithName.endsWith(".spec.ts");
}