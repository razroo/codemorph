import { EditFileEffect } from "../../../morph/interfaces/morph.interface";
import { exportTsFiles, isTsFile } from "../../../utils/add-export";
import { findClosestFileUsingPaths } from "../../../utils/find-closest-file/find-closest-file";
import { exportInIndex } from "../../export-in-index";
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
  return exportInIndex(fileEffects)
}