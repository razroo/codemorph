import { exportTsFiles, isTsFile } from "../../../utils/add-export";

export function exportComponentFile(filePathWithName: string): void {
  if(isTsFile(filePathWithName)) {
    exportTsFiles(filePathWithName);
  }
}