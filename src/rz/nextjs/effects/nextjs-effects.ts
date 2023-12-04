import { AngularOptionalType } from "../../angular/types/types";
import { NOT_SUPPORTED_TYPE } from "../../morph";
import { EditFileEffect } from "../../morph/interfaces/morph.interface";
import { NextjsOptionalType, NextjsTypeNames } from "../types/nextjs-types";
import { nextJsLibraryEffects, returnRootTsConfig } from "./library/nextjs-library";

export function nextjsFilesToAffect(filePathWithName: string, fileTree: string[], type: NextjsTypeNames, optionalTypes: NextjsOptionalType[]): string[] | NOT_SUPPORTED_TYPE {
    switch(type) {
      case NextjsTypeNames.Library:
        return returnRootTsConfig(filePathWithName, fileTree, optionalTypes);
    }
}

export function angularStandaloneEffects(type: NextjsTypeNames, fileEffects: EditFileEffect[], parameters?: any): EditFileEffect[] {
    switch(type) {
      case NextjsTypeNames.Library:
        return nextJsLibraryEffects(fileEffects, parameters);    
      default:
        return [];  
    }
}