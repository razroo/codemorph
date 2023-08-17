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
import { angularEffects, angularFilesToAffect, angularStandaloneEffects } from '../angular/angular-effects';
import { reactTypes } from '../react';
import { TemplateInputParameter } from '../utils/interfaces/template-parameters';
import { EditFileEffect } from './interfaces/morph.interface';

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

// sister function to "effects"
// This function happens first and then effects is called
export function filesToAffect(filePathWithName: string, fileTree: string[], parameter: TemplateInputParameter, programmingLanguage: string): string[] {
  switch(programmingLanguage) {
    case 'angular':
      return angularFilesToAffect(filePathWithName, fileTree, (parameter.type) as AngularTypeNames, (parameter.optionalTypes) as any as AngularOptionalType[]);
    default:
      return [];
  }
}

// 2.0 effects api 
// sister function to "fileToAffect"
// effects are called whenever a file is generated
// such as automatically exporting file in closes index ts file
// type respresents component, guard, pipe etc, which is specific to programming language
// allows effects to work in any environment e.g. backend, system, frontend thus standalone
export function standaloneEffects(programmingLanguage: string, parameter: TemplateInputParameter, fileEffects: EditFileEffect[]): EditFileEffect[] {
  switch(programmingLanguage) {
    case CommunityPaths.Angular:
      return angularStandaloneEffects((parameter.type) as AngularTypeNames, fileEffects)
    default:
      return []  
  }
}

// effects are called whenever a file is generated
// such as automatically exporting file in closes index ts file
// type respresents component, guard, pipe etc, which is specific to programming language
export function effects(filePathWithName: string, parameter: TemplateInputParameter, programmingLanguage: string, parameters?: string): void {
  const parsedParemeters: Parameters = typeof parameters === 'string' ? JSON.parse(parameters) : parameters;

  switch(programmingLanguage) {
    case CommunityPaths.Angular:
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