import { exportTsFiles, isTsFile } from "../../../utils/add-export";
import { findClosestFileUsingPaths } from "../../../utils/find-closest-file/find-closest-file";

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