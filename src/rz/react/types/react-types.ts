export enum ReactTypeNames {
  Generic = 'generic',
  Class = 'class',
  Component = 'component'
}

export enum GlobalReactOptionNames {
  
}

export type ReactOptionalTypes = [{name: GlobalReactOptionNames, selected: boolean }];

export interface ReactType {
  name: ReactTypeNames;
  optionalTypes?: ReactOptionalTypes
}

export const reactTypes: ReactType[] =  [
  {name: ReactTypeNames.Generic},
  {name: ReactTypeNames.Class},
  {name: ReactTypeNames.Component},
];