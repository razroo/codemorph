import { EditFileEffect } from "../../../morph/interfaces/morph.interface";
import { exportTsFiles, isTsFile } from "../../../utils/add-export";
import { exportInIndex } from "../../export-in-index";

export function exportServiceFile(filePathWithName: string): void {
    if (isTsFile(filePathWithName)) {
        exportTsFiles(filePathWithName);
    }
}

export function serviceEffects(fileEffects: EditFileEffect[]): EditFileEffect[]{
    return exportInIndex(fileEffects)
}