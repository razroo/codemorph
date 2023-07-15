import { CommunityPaths } from './community-paths/community-paths';
import { AngularOptionalType, AngularTypeNames, angularTypes } from './../angular/types/types';
import { EditScssInput } from './../scss/interfaces/morph-scss.interface';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { EditHtmlInput } from './../angular/interfaces/edit-html.interface';
import { morphHtml } from "../angular/morph-angular-html";
import { morphTypescript } from '../typescript/morph-typescript';
import { morphScss } from '../scss/morph-scss';
import { morphJson } from '../json/json-morph';
import { EditJsonInput } from '../json/interfaces/json-morph.interface';
import { angularEffects } from '../angular/angular-effects';
import { reactTypes } from '../react';
import { TemplateInputParameter } from '../utils/interfaces/template-parameters';

// takes in singular object and makes all edits to files 
// used when editing a file
export function morphCode(editInput: any): string {
  switch(editInput.fileType) {
    case 'html':
      return morphHtml(editInput as EditHtmlInput)
    case 'ts':
    case 'spec.ts':
      return morphTypescript(editInput);  
    case 'scss':
      return morphScss(editInput as EditScssInput);
    case 'json':
      return morphJson(editInput as EditJsonInput);  
    default :
      return ''  
  }
}

export interface Parameters {
  className?: string;
  constantName?: string;
}

// effects are called whenever a file is generated
// such as automatically exporting file in closes index ts file
// type respresents component, guard, pipe etc, which is specific to programming language
export function effects(filePathWithName: string, parameter: TemplateInputParameter, programmingLanguage: string, parameters?: string): void {
  const parsedParemeters: Parameters = typeof parameters === 'string' ? JSON.parse(parameters) : parameters;

  switch(programmingLanguage) {
    case 'angular':
      angularEffects(filePathWithName, (parameter.type) as AngularTypeNames, parsedParemeters, (parameter.optionalTypes) as any as AngularOptionalType[]);
  }
}

export function types(programmingLanguage: string): any[] {
  switch(programmingLanguage) {
    case CommunityPaths.Angular: 
      return angularTypes;
    case CommunityPaths.React: 
      return reactTypes;  
    default: 
      return [];  
  }

}