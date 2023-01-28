import { exportTsFiles, isTsFile } from "../../../utils/add-export";

export function exportDirectiveFile(filePathWithName: string): void {
  if(isTsFile(filePathWithName)) {
    exportTsFiles(filePathWithName);
  }
}