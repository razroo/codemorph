import * as glob from 'glob';
import { minimatch } from 'minimatch';

export function findClosestModuleFile(path: string, fileNameToFind = 'module.ts'): string {
    let currentDir = path;
    while (currentDir.length > 0) {
        const modulePath = currentDir + `/*.${fileNameToFind}`;
        const modules = glob.sync(modulePath);
        if (modules.length > 0) {
          return modules[0];
        }
        currentDir = currentDir.substring(0, currentDir.lastIndexOf("/"));
    }
    return "";
}

export function getFileViaMatch(paths: string[], globPattern: string): any {
  for (const item of paths) {
    if (minimatch(item, globPattern)) {
      return item;
    }
  }
  return undefined;
}

export function findClosestModuleFileUsingPaths(filePathWithName: string, paths: string[], fileNameToFind = 'module.ts'): string[] {
    let currentDir = filePathWithName;
    while (currentDir.length > 0) {
      const modulePath = currentDir + `/*.${fileNameToFind}`;
      const moduleFile = getFileViaMatch(paths, modulePath);
      if(moduleFile) {
        return [moduleFile];
      }
      currentDir = currentDir.substring(0, currentDir.lastIndexOf("/"));
    } 
    return [];
}

