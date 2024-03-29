import { Parameters } from "../morph";
import { EditFileEffect, NOT_SUPPORTED, NOT_SUPPORTED_TYPE } from "../morph/interfaces/morph.interface";
import { addClassToDeclarationsAndImports, componentEffects, fileToAddClassToDeclarationsAndImports } from "./effects/component/component-effects";
import { exportGraphqlFile, graphqlEffects } from "./effects/graphql/graphql";
import { exportInterfaceFile, interfaceEffects } from "./effects/interface/interface";
import { directiveEffects, exportDirectiveFile } from "./effects/directive/directive";
import { addEffectToNgModule } from "./effects/ngrx/effects/ngrx-effects";
import { addFacadeToNgModule } from "./effects/ngrx/facade/ngrx-facade";
import { addReducerToNgModule } from "./effects/ngrx/reducer/ngrx-reducer";
import { exportServiceFile, serviceEffects } from "./effects/service/service";
import { closestIndexFileToImportTo, exportComponentFile, standaloneComponentEffects } from "./effects/standalone-component/standalone-component";
import { AngularTypeNames, AngularOptionalType } from "./types/types";
import { libraryEffects, returnRootTsConfig } from './effects/library/library';
import { exportPipeFile, pipeEffects } from "./effects/pipe/pipe";
import { moduleEffects } from "./effects/module/module";
import { standalonePipeEffects } from "./effects/standalone-pipe/standalone-pipe";

export function angularFilesToAffect(filePathWithName: string, fileTree: string[], type: AngularTypeNames, optionalTypes: AngularOptionalType[]): string[] | NOT_SUPPORTED_TYPE {
  switch(type) {
    case AngularTypeNames.Component:
      return fileToAddClassToDeclarationsAndImports(filePathWithName, fileTree, optionalTypes);
    case AngularTypeNames.StandaloneComponent:
      return closestIndexFileToImportTo(filePathWithName, fileTree, optionalTypes);
    case AngularTypeNames.Library:
      return returnRootTsConfig(filePathWithName, fileTree, optionalTypes);
    case AngularTypeNames.Service: 
      return closestIndexFileToImportTo(filePathWithName, fileTree, optionalTypes)
    case AngularTypeNames.Pipe: 
      return closestIndexFileToImportTo(filePathWithName, fileTree, optionalTypes)
    case AngularTypeNames.StandalonePipe: 
      return closestIndexFileToImportTo(filePathWithName, fileTree, optionalTypes);
    case AngularTypeNames.Interface: 
      return closestIndexFileToImportTo(filePathWithName, fileTree, optionalTypes)
    case AngularTypeNames.Graphql: 
      return closestIndexFileToImportTo(filePathWithName, fileTree, optionalTypes)
    case AngularTypeNames.Directive: 
      return closestIndexFileToImportTo(filePathWithName, fileTree, optionalTypes)
    case AngularTypeNames.Module: 
      return closestIndexFileToImportTo(filePathWithName, fileTree, optionalTypes)
    default:
      return NOT_SUPPORTED;
  }
}

export function angularStandaloneEffects(type: AngularTypeNames, fileEffects: EditFileEffect[], parameters?: any): EditFileEffect[] {
  switch(type) {
    case AngularTypeNames.Component:
      return componentEffects(fileEffects);
    case AngularTypeNames.StandaloneComponent:
      return standaloneComponentEffects(fileEffects);
    case AngularTypeNames.Service:
      return serviceEffects(fileEffects);
    case AngularTypeNames.Directive:
      return directiveEffects(fileEffects);
    case AngularTypeNames.Pipe:
      return pipeEffects(fileEffects);
    case AngularTypeNames.StandalonePipe:
      return standalonePipeEffects(fileEffects);
    case AngularTypeNames.Library:
      return libraryEffects(fileEffects, parameters);    
    case AngularTypeNames.Interface:
      return interfaceEffects(fileEffects);    
    case AngularTypeNames.Graphql:
      return graphqlEffects(fileEffects);    
    case AngularTypeNames.Module:
      return moduleEffects(fileEffects);    
    default:
      return [];
  }
}

export function angularEffects(filePathWithName: string, type: AngularTypeNames, parameters: Parameters, optionalTypes: AngularOptionalType[]): void {
  switch (type) {
    case AngularTypeNames.Component:
      addClassToDeclarationsAndImports(filePathWithName, (parameters as any).className, optionalTypes);
      break;
    case AngularTypeNames.StandaloneComponent:
      exportComponentFile(filePathWithName)
      break;
    case AngularTypeNames.Service:
      exportServiceFile(filePathWithName);
      break;
    case AngularTypeNames.Pipe: 
      exportPipeFile(filePathWithName);
      break;
    case AngularTypeNames.StandalonePipe: 
      exportPipeFile(filePathWithName);
      break;
    case AngularTypeNames.Interface:
      exportInterfaceFile(filePathWithName)
      break;
    case AngularTypeNames.Graphql:
      exportGraphqlFile(filePathWithName)
      break;
    case AngularTypeNames.NgrxEffects:
      addEffectToNgModule(filePathWithName, (parameters as any).className)
      break;
    case AngularTypeNames.NgrxFacade:
      addFacadeToNgModule(filePathWithName, (parameters as any).className)
      break;
    case AngularTypeNames.NgrxReducer:
      addReducerToNgModule(filePathWithName, (parameters as any).className, (parameters as any).constantName)
      break;
    case AngularTypeNames.Directive:
      exportDirectiveFile(filePathWithName);
      break;
  }
}