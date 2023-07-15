import { EditScssInput, EditScss } from "./interfaces/morph-scss.interface";

import { parse, stringify } from 'scss-parser';
const parserPostcss = require('prettier/parser-postcss');
const prettier = require('prettier');

export function morphScss(editScssInput: EditScssInput): string {
  const ast = parse((editScssInput as any).fileToBeAddedTo);

  editScssInput.edits.forEach((editScss: EditScss) => {
    switch(editScss.nodeType) {
       case 'addScssBlock':
         addScssCodeBlock(editScss, ast)
         break;
       case 'import':
         addScssImport(editScss, ast)
         break;  
    }
    
  });

  return prettifyAndReturnString(ast);
}

function prettifyAndReturnString(ast: any) {
  return prettier.format(stringify(ast), {
    parser: "scss",
    plugins: [parserPostcss],
    tabWidth: 2,
  });
}

// css-parser is a bit quirky. Taps into AST to manually create space
function addLineToAst(ast: any) {
  ast.value.push({type: 'space', value: '\n'});  
} 

function addScssCodeBlock(editScss: EditScss, ast: any): void {  
  const newCodeBlockAst = parse(editScss.codeBlock); 
  addLineToAst(ast);
  
  (newCodeBlockAst as any).value.forEach((item: any) => {
    ast.value.push(item);
  });
}

function addScssImport(editScss: EditScss, ast: any): void {
  const atRulifiedPath = _atRulifyPath((editScss as any).path);
  const newCodeBlockAst = parse(atRulifiedPath);
  // adding line after import as this will be added to top
  addLineToAst(newCodeBlockAst);
  // using unshift to add line to the top of file
  (newCodeBlockAst as any).value.forEach((item: any) => {
    ast.value.unshift(item);
  });
}

function _atRulifyPath(path: string) {
  return `@import "${path}";`;
}