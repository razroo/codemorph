export enum AngularTypeNames {
  Generic = 'generic',
  Class = 'class',
  Component = 'component',
  StandaloneComponent = 'standalone-component',
  Directive = 'directive',
  Enum = 'enum',
  Guard = 'guard',
  Graphql = 'graphql',
  Interceptor = 'interceptor',
  Interface = 'interface',
  Library = 'library',
  Module = 'module',
  NgrxEffects = 'ngrx-effects',
  NgrxFacade = 'ngrx-facade',
  NgrxReducer = 'ngrx-reducer',
  Pipe = 'pipe',
  Resolver = 'resolver',
  Service = 'service',
  ServiceWorker = 'service-worker',
  WebWorker = 'web-worker'
}

export enum GlobalAngularOptionNames {
  IsExported = 'isExported'
}

export interface AngularOptionalType {
  name: GlobalAngularOptionNames, 
  selected: boolean 
}

export interface AngularType {
  name: AngularTypeNames;
  optionalTypes?: AngularOptionalType[]
}

export const angularTypes: Array<AngularType> =  [
  {
    name: AngularTypeNames.Component,
    optionalTypes: [
      {
        name: GlobalAngularOptionNames.IsExported,
        selected: true
      }
    ]
  },
  {name: AngularTypeNames.Generic},
  {name: AngularTypeNames.Class},
  {name: AngularTypeNames.StandaloneComponent},
  {name: AngularTypeNames.Directive},
  {name: AngularTypeNames.Enum},
  {name: AngularTypeNames.Guard},
  {name: AngularTypeNames.Graphql},
  {name: AngularTypeNames.Interceptor},
  {name: AngularTypeNames.Interceptor},
  {name: AngularTypeNames.Interface},
  {name: AngularTypeNames.Library},
  {name: AngularTypeNames.Module},
  {name: AngularTypeNames.NgrxEffects},
  {name: AngularTypeNames.NgrxFacade},
  {name: AngularTypeNames.NgrxReducer},
  {name: AngularTypeNames.Pipe},
  {name: AngularTypeNames.Resolver},
  {name: AngularTypeNames.Service},
  {name: AngularTypeNames.ServiceWorker},
  {name: AngularTypeNames.WebWorker},
];