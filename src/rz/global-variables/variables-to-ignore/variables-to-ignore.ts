import { PowerUpVariables } from "../interfaces";

export const codeCmsVariablesToIgnore: string[] = ['className', 'propertyName', 'constantName', 'fileName'];

export const powerUpVariables: PowerUpVariables[] = [
  {
    name: 'name',
    description: 'Template variable to be used for class creation',
    defaultValue: 'name',
    variableDependency: 'name',
    variablesToImplement: [
      {
        name: 'className',
        description: 'Hyphenated to UpperCamelCase',
        codeExample: 'my-name to MyName',
        variableDependency: 'name'
      },
      {
        name: 'propertyName',
        description: 'Hyphenated to lowerCamelCase',
        codeExample: 'my-name to myName',
        variableDependency: 'name'
      },
      {
        name: 'constantName',
        description: 'Hyphenated to CONSTANT_CASE',
        codeExample: 'my-name to MY_NAME'
      },
      {
        name: 'fileName',
        description: 'Upper camelCase to lowercase, hyphenated',
        codeExample: 'myName to my-name'
      },
      {
        name: 'titleName',
        description: 'camelCase to Title Case',
        codeExample: 'myName to My Name'
      },
      {
        name: 'nameSchema',
        description: 'will create a nameSchema variable that allows you to select schema values from the schema object',
        codeExample: `<% for(let i = 0; i < nameSchema.length; i++) { %>
          <div> <%= nameSchema[i] %> </div>
        <% } %>`
      }
    ]
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
    variableDependency: 'existingFileName',
    type: 'system',
    variablesToImplement: [
      {
        name: 'existingFileClassName',
        description: 'Hyphenated to UpperCamelCase',
        codeExample: 'my-name to MyName',
        variableDependency: 'existingFileName'
      },
      {
        name: 'existingFilePropertyName',
        description: 'Hyphenated to lowerCamelCase',
        codeExample: 'my-name to myName',
        variableDependency: 'existingFileName'
      },
      {
        name: 'existingFileConstantName',
        description: 'Hyphenated to CONSTANT_CASE',
        codeExample: 'my-name to MY_NAME',
        variableDependency: 'existingFileName'
      },
      {
        name: 'existingFileTitleName',
        description: 'camelCase to Title Case',
        codeExample: 'myName to My Name',
        variableDependency: 'existingFileName'
      }
    ]
  },
  {
    name: 'primary',
    description: 'primary color to be used within app',
    defaultValue: 'primary',
    variableDependency: 'primary',
    variablesToImplement: [
      {
        name: 'primaryLighter',
        description: 'Lighter color of primary',
        codeExample: 'primary to primaryLighter'
      },
      {
        name: 'primaryDarker',
        description: 'Darker color of primary',
        codeExample: 'primary to primaryDarker'
      }
    ]
  },
  {
    name: 'accent',
    description: 'accent color to be used within app',
    defaultValue: 'accent',
    variableDependency: 'accent',
    variablesToImplement: [
      {
        name: 'accentLighter',
        description: 'Lighter color of accent',
        codeExample: 'accent to accentLighter'
      },
      {
        name: 'accentDarker',
        description: 'Darker color of accent',
        codeExample: 'accent to accentDarker'
      }
    ]
  },
  {
    name: 'warn',
    defaultValue: 'warn',
    description: 'warn color to be used within app',
    variableDependency: 'warn',
    variablesToImplement: [
      {
        name: 'warnLighter',
        description: 'Lighter color of warn',
        codeExample: 'warn to warnLighter'
      },
      {
        name: 'warnDarker',
        description: 'Darker color of warn',
        codeExample: 'warn to warnDarker'
      }
    ]
  },
  {
    name: 'infrastructureCommandPath',
    description: 'Template variable to be used for infrastructure commands',
    defaultValue: 'infrastructureCommandPath',
    stubValue: 'infrastructureCommandPath',
    variableDependency: 'infrastructureCommandPath'
  }
]