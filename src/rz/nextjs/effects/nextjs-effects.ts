import { NOT_SUPPORTED_TYPE } from "../../morph";
import { EditFileEffect, NOT_SUPPORTED } from "../../morph/interfaces/morph.interface";
import { NextjsOptionalType, NextjsTypeNames } from "../types/nextjs-types";
import { nextJsLibraryEffects, returnRootTsConfig } from "./library/nextjs-library";

export function nextjsFilesToAffect(filePathWithName: string, fileTree: string[], type: NextjsTypeNames, optionalTypes: NextjsOptionalType[]): string[] | NOT_SUPPORTED_TYPE {
    switch(type) {
      case NextjsTypeNames.Library:
        return returnRootTsConfig(filePathWithName, fileTree, optionalTypes);
      default:
        return NOT_SUPPORTED;
    }
}

export function nextjsStandaloneEffects(type: NextjsTypeNames, fileEffects: EditFileEffect[], parameters?: any): EditFileEffect[] {
    switch(type) {
      case NextjsTypeNames.Library:
        return nextJsLibraryEffects(fileEffects, parameters);    
      default:
        return [];  
    }
}