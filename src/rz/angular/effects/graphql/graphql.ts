import { exportTsFiles, isTsFile } from "../../../utils/add-export";

export function exportGraphqlFile(filePathWithName: string): void {
  if (isTsFile(filePathWithName)) {
    exportTsFiles(filePathWithName);
  }
}