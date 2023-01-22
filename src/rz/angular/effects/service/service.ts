import { exportTsFiles, isTsFile } from "../../../utils/add-export";

export function exportServiceFile(filePathWithName: string): void {
    if (isTsFile(filePathWithName)) {
        exportTsFiles(filePathWithName);
    }
}