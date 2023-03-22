import { PowerUpVariables } from "../interfaces"

export const powerUpVariablesFlatData: PowerUpVariables[] = [
    {
      name: 'name',
      description: 'Template variable to be used for class creation',
      defaultValue: 'name',
      stubValue: 'name',
      variableDependency: 'name'
    },
    {
      name: 'className',
      defaultValue: 'className',
      description: 'Hyphenated to UpperCamelCase',
      codeExample: 'my-name to MyName',
      stubValue: 'className',
      variableDependency: 'name'
    },
    {
      name: 'propertyName',
      defaultValue: 'propertyName',
      stubValue: 'propertyName',
      description: 'Hyphenated to lowerCamelCase',
      codeExample: 'my-name to myName',
      variableDependency: 'name'
    },
    {
      name: 'constantName',
      defaultValue: 'constantName',
      stubValue: 'constantName',
      description: 'Hyphenated to CONSTANT_CASE',
      codeExample: 'my-name to MY_NAME',
      variableDependency: 'name'
    },
    {
      name: 'fileName',
      defaultValue: 'fileName',
      stubValue: 'fileName',
      description: 'Upper camelCase to lowercase, hyphenated',
      codeExample: 'myName to my-name',
      variableDependency: 'name'
    },
    {
      name: 'titleName',
      description: 'will create a Title Case title out of your kebab-case name',
      defaultValue: '<%= titleName %>',
      stubValue: 'titleName',
      codeExample: 'myName to My Name',
      variableDependency: 'name'
    },
    {
      name: 'nameSchema',
      description: 'will create a nameSchema variable that allows you to select schema values from the schema object',
      defaultValue: '<%= nameSchema %>',
      stubValue: 'nameSchema',
      codeExample: `<% for(let i = 0; i < nameSchema.length; i++) { %>
        <div> <%= nameSchema[i] %> </div>
      <% } %>`,
      variableDependency: 'name'
    },
    {
      name: 'orgName',
      description: 'Will dyanmically get organization name',
      defaultValue: '<%= orgName %>',
      stubValue: 'orgName',
      variableDependency: 'orgName'
    },
    {
      name: 'projectName',
      description: 'Will dynamically get project name',
      defaultValue: '<%= projectName %>',
      stubValue: 'projectName',
      variableDependency: 'projectName'
    },
    {
      name: 'existingFileName',
      description: 'Template variable to be used for code snippets. Will use existing file name for name.',
      defaultValue: 'existingFileName',
      type: 'system',
      stubValue: 'existingFileName',
      variableDependency: 'existingFileName'
    },
    {
      name: 'existingFileClassName',
      description: 'Hyphenated to UpperCamelCase',
      defaultValue: 'existingFileName',
      type: 'system',
      stubValue: 'existingFileClassName',
      variableDependency: 'existingFileName'
    },
    {
      name: 'existingFilePropertyName',
      description: 'Hyphenated to lowerCamelCase',
      defaultValue: 'existingFilePropertyName',
      type: 'system',
      stubValue: 'existingFilePropertyName',
      variableDependency: 'existingFileName'
    },
    {
      name: 'existingFileConstantName',
      description: 'Hyphenated to CONSTANT_CASE',
      defaultValue: 'existingFileConstantName',
      type: 'system',
      stubValue: 'existingFileConstantName',
      variableDependency: 'existingFileName'
    },
    {
      name: 'existingFileTitleName',
      description: 'camelCase to Title Case',
      defaultValue: 'existingFileTitleName',
      type: 'system',
      stubValue: 'existingFileTitleName',
      variableDependency: 'existingFileName'
    },
    {
      name: 'primary',
      description: 'primary color to be used within app',
      defaultValue: 'primary',
      stubValue: 'primary',
      variableDependency: 'primary'
    },
    {
      name: 'primaryLighter',
      defaultValue: 'primaryLighter',
      stubValue: 'primaryLighter',
      description: 'Lighter color of primary',
      codeExample: 'primary to primaryLighter',
      variableDependency: 'primary'
    },
    {
      name: 'primaryDarker',
      defaultValue: 'primaryDarker',
      stubValue: 'primaryDarker',
      description: 'Darker color of primary',
      codeExample: 'primary to primaryDarker',
      variableDependency: 'primary'
    },
    {
      name: 'accent',
      stubValue: 'accent',
      description: 'accent color to be used within app',
      defaultValue: 'accent',
      variableDependency: 'accent'
    },
    {
        name: 'accentLighter',
        stubValue: 'accentLighter',
        defaultValue: 'accentLighter',
        description: 'Lighter color of accent',
        codeExample: 'accent to accentLighter',
        variableDependency: 'accent'
    },
    {
      name: 'accentDarker',
      stubValue: 'accentDarker',
      defaultValue: 'accentDarker',
      description: 'Darker color of accent',
      codeExample: 'accent to accentDarker',
      variableDependency: 'accent'
    },
    {
      name: 'warn',
      stubValue: 'warn',
      defaultValue: 'warn',
      description: 'warn color to be used within app',
      variableDependency: 'warn'
    },
    {
      name: 'warnLighter',
      stubValue: 'warnLighter',
      defaultValue: 'warnLighter',
      description: 'Lighter color of warn',
      codeExample: 'warn to warnLighter',
      variableDependency: 'warn'
    },
    {
      name: 'warnDarker',
      stubValue: 'warnDarker',
      defaultValue: 'warnDarker',
      description: 'Darker color of warn',
      codeExample: 'warn to warnDarker',
      variableDependency: 'warn'
    },
    {
      name: 'infrastructureCommandPath',
      description: 'Template variable to be used for infrastructure commands',
      defaultValue: 'infrastructureCommandPath',
      stubValue: 'infrastructureCommandPath',
      variableDependency: 'infrastructureCommandPath'
    },
  ]