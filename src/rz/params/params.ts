import { getHtmlOptions, getHtmlParameters } from "./html-params/html-params";
import { getJsonOptions, getJsonParameters } from "./json-params/json-params";
import { getScssOptions, getScssParameters } from "./scss-params/scss-params";
import { getTsOptions, getTsParameters } from "./typescript-params/typescript-params";

export function getCodeModParams(fileType: string, optionName: string): any {
  switch(fileType) {
    case 'html':
      return getHtmlParameters(optionName)
    case 'ts':
    case 'spec.ts':
      return getTsParameters(optionName);
    case 'scss':
      return getScssParameters(optionName);
    case 'json':
      return getJsonParameters(optionName);  
  }
}

export function getCodeModOptions(fileType: string): any {
  switch(fileType) {
    case 'html':
      return getHtmlOptions()
    case 'ts':
    case 'spec.ts':
      return getTsOptions();
    case 'scss':
      return getScssOptions();
    case 'json':
      return getJsonOptions();  
  }
}