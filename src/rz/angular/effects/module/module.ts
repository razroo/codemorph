import { EditFileEffect } from "../../../morph/interfaces/morph.interface";
import { exportInIndex } from "../../export-in-index";

export function moduleEffects(fileEffects: EditFileEffect[]): EditFileEffect[]{
  return exportInIndex(fileEffects)
}