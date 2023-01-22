![Razzle Logo](assets/razzle-logo-small.png "Razzle - Extensible Codemod Library")

Razzle is an extensible, easy to understand, easy contribute, easy to use Codemod library. Razzle-dazzle your codebase like you've never before. 

# Novelty behind Razzle library 

What the Razzle library does that is unique, is that it creates a unified interface across different programming languages. It uses a simple object to make modifications. e.g. 

### Typescript
```
{
  "import": '{ NgModule }',
  "path": '@angular/core'
}
```

### SCSS
```
{
  "import": '',
  "path": 'libs/common/styles/razroo-styles.scss'
}
```

## Assumption Made
Razzle is always used in an editing circumstance. There is no need to speicify that file is being editied. Razzle will update the string 

## Benefits of such 
1. This will be consumer facing. By allowing a singular object, we can simplify the frontend shown to users in the content management system. 
2. Developers don't have to dig into specifics for each programming language. They can simply keep an eye on the top level interface. 

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
