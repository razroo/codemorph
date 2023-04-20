// color related items
export { getPalette, createColorVariables } from './rz/global-variables';

// export { Blah as default } from './lib'
export { replaceTagParameters, parseEJSCode, replaceCurlyBrace } from './replace';

// general utils
export { getVersionAndNameString, determineType, determineFilePathParameter, readPackageJson, extractProjectName,
    getAllDirectoriesFromVsCodeFolder, determineLanguagesUsed, replaceCodeModEditsTemplateVariables } from './rz/utils';

// export typescript related edits
export { EditInput, EditFile, morphCode, effects, communityPaths, types } from './rz/morph';

// export typescript related edits
export { getCodeModParams, getCodeModOptions } from './rz/params';

// global variables
export { names, codeCmsVariablesToIgnore, powerUpVariables, powerUpVariablesFlatData, existingFileNames} from './rz/global-variables';

// global variables interfaces
export { CodeCmsVariablesToIgnore, PowerUpVariables } from './rz/global-variables/interfaces';

// types for angular code generation side-effects
export { angularTypes, AngularTypeNames, defaultAngularTechnologies } from './rz/angular';

// types react code generation side-effects
export { reactTypes, ReactTypeNames } from './rz/react';