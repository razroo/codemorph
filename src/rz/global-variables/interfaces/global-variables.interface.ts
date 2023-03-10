export type CodeCmsVariablesToIgnore = 'className' | 'propertyName' | 'constantName' | 'fileName';
export interface PowerUpVariables {
    name: string;
    variablesToImplement?: any[];
    defaultValue: string;
    description?: string;
    codeExample?: string;
    stubValue?: string;
    type?: 'system' | undefined;
    variableDependency: string
}