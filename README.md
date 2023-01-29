![Codemorph Logo](assets/codemorph-logo-small.png "Codemorph - Extensible Codemod Library") ![Codemorph Logo](assets/razroo-certified-logo.png "Razroo Certified")

Codemorph is an extensible, easy to understand, easy to contribute, easy to use **Codemod** library. Codemorph-dazzle your codebase like you've never before. 

# How to Install Codemorph 

```
npm install @codemorph/core --save
```

# How to Use Codemorph 

## `morphCode` - Modify string 

The `morphCode` command will take in a string, modify it based on:
1. `fileType` - e.g. `ts`, `html`, 
2. array of edit objects specified in the `edits` key 

```ts
// lets assume we are updating a ts file
import { EditInput, morphCode } from '@codemorph/core';

// Codemorph works against strings and not files
// done intentionally so can work on any platform(e.g. web, code editor, etc.)
const fileToBeAddedTo = readFileSync('libs/src/sample-name/sample-name.component.ts').toString();

const editInput: EditInput = {
  fileType: 'ts',
  fileName: 'sample-name.component.ts',
  fileToBeAddedTo: fileToBeAddedTo,
  edits: [{
    nodeType: 'addFunction',
    name: 'generateAngularComponent',
    type: 'string',
    isExported: true,
    parameters: [{name: 'test', type: 'string'}],
    codeBlock: `console.log('hello world ' + test)`    
  }]
}
const sampleNameComponentModfified = morphCode(editInput);
// this string is now modified. We will write modified string back to initial location
const fileToBeAddedTo = writeFileSync('libs/src/sample-name/sample-name.component.ts', sampleNameComponentModfified);
// file will now have modified code
```

## `effects` - Code modifications that happen as a side effect of xyz

The `effects` function is the other side of the coin with regards to the codeMorph library. 

Whereas the `morphCode` function mentioned above will edit a file, the `effects` function is 
meant to be used alongside creating a new file for the first time/when generating a new code feature. For instance, 
if you were creating a new Angular componnet, you would use the effect for angular component.

```ts
import { effects, TemplateInputParameter } from '@codemorph/core';

// user-card is a sample component folder/file name
const fullPathOfFile = 'libs/src/user-card/user-card.component.ts';
const filePathParameter: TemplateInputParameter = {
  name: 'nameFilePath',
  description: 'this isnt used by effect but can be used to bake documentation into codemod',
  // {name} curly brace here so name can be dynamic. Will use name parameter below
  defaultValue: 'libs/src/user-card/{name}',
  paramType: 'directive'
};
const coreProgrammingLanguage = 'angular';
// used to override <%= name %> inside of file. By default razroo uses name
// however parameters could be anything so can extend effects to however would like
const parameters = [{
  name: 'name',
  description: 'name for the user-card component',
  defaultValue: 'user-card'
}]

effects(fullPathOfFile, filePathParameter, coreProgrammingLanguage, parameters);
// will automatically edit files (no need for readFileSync or writeFileSync)
```

Now our effects knows based on above:
1. Starting point of effect based on file supplied (`fullPathOfFile`)
2. The type of effect we would like to do:
    - `filePathParameter` - Has the paramType of `directive`
    - `coreProgrammingLanguage` - `angular` (i.e. angular directive)
3. What dynamic values we would like in our effects(here it is `name` which is `user-card`) 

In this instance, while different for each, it means that when we generate code 
for an Angular Directive, the Codemorph `effects` function will automatically 
export the directive in the closest `index.ts` file.

### Notes Regarding Razroo Effects Architecture

#### Currently OS level only 

Due to the nature of how effects work i.e. the need to take the entire file system into account
effects currently only work on the OS level. There are efforts from our side to make effects 
work on web and we hope to that feature available sooner than later.

#### We use a single file path to determine effects feature location

Here is why:
1. Effects should be feature based and therefore bite sized. 
2. We wanted effects to recognize the primary file of file(s) being generated. 
Therefore we believe using the filePath as a key for where the entire 
feature is located makes sense. (allows it to be extensible based on library/convention being used)

## Novelty behind Codemorph library 

### Easy To Understand

What the Codemorph library does that is unique, is that it creates a unified interface across different programming languages. It uses a simple object to make modifications. e.g. 

#### Typescript
```
{
  "import": '{ NgModule }',
  "path": '@angular/core'
}
```

#### SCSS
```
{
  "import": '',
  "path": 'libs/common/styles/razroo-styles.scss'
}
```

So your engineers can understand how it works for one programming language and use the same syntax for a different programming language. 

### Easy To Contribute
Codemorph uses a tree of switch case statements to determine type of codemod to use. Simply specify programming language e.g. `angular` and fileType e.g. `.ts` and Codemod will take care of the rest.

### Extensible
If you want to add your own custom codemods, or add your own, you can simply plug and play to the Razroo codemod library. 

## Benefits of such 
1. This will be consumer facing. By allowing a singular object, we can simplify the frontend shown to users in the content management system. 
2. Developers don't have to dig into specifics for each programming language. They can simply keep an eye on the top level interface. 
3. Apis of different codemod libraries can be unified under a singular interface

# Further reading via Razroo blog(soon to be it's own documentation site) 

blog.razroo.com


# APIS Available 

## Typescript 

1. `import`
2. `editImport`
3. `classDeclaration`
4. `classMethod`
5. `addNgModuleImport`
6. `addNgModuleProvider`
7. `addNgModuleImportToSpec`
8. `addToVariableObject`
9. `addConstructorMethod`
```
{
  nodeType: 'addConstructorMethod',
  codeBlock: 'userService',
  type: 'UserService'
}
```
10. addVariableDeclarationStatement
```
{
  nodeType: 'addVariableDeclarationStatement',
  codeBlock: 'gtag',
  type: 'Function'
}
```

## JSON

1. `editJson`
2. `addJsonKeyValue`

## SCSS

1. `addScssBlock`
2. `import`
 

## Angular HTML + HTML

1. `editHtmlTag`
```
{
  "nodeType": "editHtmlTag",
  "codeBlock": "matSort",
  "tagNameToModify": "mat-table"
}
```
2. `addSiblingHtml`
```
{
  "nodeType": "addSiblingHtml",
  "codeBlock": "<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-YOUR-GOOGLE-ID\"></script>",
  "tagNameToInsert": "script",
  "siblingTagName": "link"
},
```
3. `insertIntoHtmlTag`
```
{
  "nodeType": "insertIntoHtmlTag",
  "codeBlock": "<div class=\"Toolbar__Icons\"><fa-icon [icon]=\"faBell\" aria-hidden=\"false\" aria-label=\"Notification Icon\"></fa-icon> <fa-icon [icon]=\"faQuestionCircle\" aria-hidden=\"false\" aria-label=\"Question Icon\"></fa-icon> <fa-icon [icon]=\"faUserCircle\" aria-hidden=\"false\" aria-label=\"Account Icon\"></fa-icon></div>",
  "tagNameToInsertInto": "mat-toolbar"
}
```
