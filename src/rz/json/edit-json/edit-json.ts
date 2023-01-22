import { EditJson } from "../interfaces/json-morph.interface";
import { JSONPath } from 'jsonpath-plus';
import pointer = require('json-pointer');

export function editJson(editJson: EditJson, json: string): any {
  const codeBlock = eval(editJson.codeBlock);
  json = JSON.parse(json);
  //2. Set value
  pointer.set(json, editJson.valueToModify, codeBlock);
 
  //3. Return modified value
  return json;
}

export function addJsonKeyValue(editJson: EditJson, json: string): any {
  const codeBlock = typeof editJson.codeBlock === 'string' ?  JSON.parse((editJson.codeBlock)) : editJson.codeBlock;
  json = JSON.parse(json);
  //Get Pointer  
  const JsonPointer = JSONPath({path: `$..${editJson.valueToModify}`, json, resultType: 'pointer'});
  const firstJsonMatchedPointer = JsonPointer[0];

  //Get value of json
  const jsonToEdit = pointer.get(json, firstJsonMatchedPointer);

  //Set value
  pointer.set(json, firstJsonMatchedPointer, {...jsonToEdit, ...codeBlock});
 
  //Return modified value
  return json;
}
  
