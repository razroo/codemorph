import { EditFileEffect } from "../../../morph/interfaces/morph.interface";
import { exportTsFiles, isTsFile } from "../../../utils/add-export";
import { findClosestFileUsingPaths } from "../../../utils/find-closest-file/find-closest-file";
import { exportInIndex } from "../../export-in-index";
import { AngularOptionalType } from "../../types/types";

export function exportPipeFile(filePathWithName: string): void {
  if(isTsFile(filePathWithName)) {
    exportTsFiles(filePathWithName);
  }
}

export function standalonePipeEffects(fileEffects: EditFileEffect[]): EditFileEffect[] {
  return exportInIndex(fileEffects)
}