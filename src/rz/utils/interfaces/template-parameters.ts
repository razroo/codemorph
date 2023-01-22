export interface TemplateInputParameter {
    name: string;
    defaultValue: string;
    inputType?: any;
    type?: string;
    description?: string;
    optionalTypes?: OptionalType[];
    paramType: any;
    originalValue?: string;
}

export interface OptionalType {
  name: string, 
  selected: boolean 
}