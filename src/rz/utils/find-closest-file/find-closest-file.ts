import { minimatch } from 'minimatch';

export function getFileViaMatch(paths: string[], globPattern: string): any {
  for (const item of paths) {
    if (minimatch(item, globPattern)) {
      return item;
    }
  }
  return undefined;
}
  
export function findClosestFileUsingPaths(filePathWithName: string, paths: string[], fileNameToFind = 'index.ts'): string[] {
  let currentDir = filePathWithName;
  while (currentDir.length > 0) {
    const modulePath = currentDir + `/${fileNameToFind}`;
    const moduleFile = getFileViaMatch(paths, modulePath);
    if(moduleFile) {
      return [moduleFile];
    }
    currentDir = currentDir.substring(0, currentDir.lastIndexOf("/"));
  } 
  return [];
}

export function findClosestFileMatchUsingPaths(filePathWithName: string, paths: string[], fileNameToFind = 'index.ts'): string[] {
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