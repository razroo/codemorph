export enum NextjsTypeNames {
  Generic = 'generic',
  Library = 'library'
}

export enum GlobalNextjsOptionNames {
  IsExported = 'isExported'
}

export interface NextjsOptionalType {
  name: GlobalNextjsOptionNames, 
  selected: boolean 
}