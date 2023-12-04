import { AngularOptionalType } from "../../angular/types/types";
import { NOT_SUPPORTED_TYPE } from "../../morph";
import { NextjsOptionalType, NextjsTypeNames } from "../types/nextjs-types";
import { returnRootTsConfig } from "./library/nextjs-library";

export function nextjsFilesToAffect(filePathWithName: string, fileTree: string[], type: NextjsTypeNames, optionalTypes: NextjsOptionalType[]): string[] | NOT_SUPPORTED_TYPE {
    switch(type) {
      case NextjsTypeNames.Library:
        return returnRootTsConfig(filePathWithName, fileTree, optionalTypes);
    }
}