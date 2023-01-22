import { exportTsFiles, isTsFile } from "../../../utils/add-export";

export function exportInterfaceFile(filePathWithName: string): void {
  if (isTsFile(filePathWithName)) {
    exportTsFiles(filePathWithName);
  }
}