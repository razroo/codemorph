import { EditFileEffect } from "../../../morph/interfaces/morph.interface";
import { exportTsFiles, isTsFile } from "../../../utils/add-export";
import { exportInIndex } from "../../export-in-index";

export function exportInterfaceFile(filePathWithName: string): void {
  if (isTsFile(filePathWithName)) {
    exportTsFiles(filePathWithName);
  }
}

export function interfaceEffects(fileEffects: EditFileEffect[]): EditFileEffect[]{
  return exportInIndex(fileEffects)
}