import { EditJson } from "../interfaces/json-morph.interface";
import { JSONPath } from 'jsonpath-plus';
import * as pointer from 'json-pointer';

export function editJson(editJson: EditJson, json: string): any {
  const codeBlock = parseJsonOrString(editJson.codeBlock);
  json = JSON.parse(json);
  //2. Set value
  pointer.set(json as any, editJson.valueToModify, codeBlock);
 
  //3. Return modified value
  return json;
}

function parseJsonOrString(input: string): string | object {
  try {
    const parsedJson = JSON.parse(input);
    if (typeof parsedJson === 'object' && parsedJson !== null) {
      return parsedJson;
    }
  } catch (error) {
    return input;
  }

  return input;
}

export function addJsonKeyValue(editJson: EditJson, json: string): any {
  const codeBlock = typeof editJson.codeBlock === 'string' ?  JSON.parse((editJson.codeBlock)) : editJson.codeBlock;
  json = JSON.parse(json);
  //Get Pointer  
  const JsonPointer = JSONPath({path: `$..${editJson.valueToModify}`, json, resultType: 'pointer'});
  const firstJsonMatchedPointer = JsonPointer[0];

  //Get value of json
  const jsonToEdit = pointer.get(json as any, firstJsonMatchedPointer);

  //Set value
  pointer.set(json as any, firstJsonMatchedPointer, {...jsonToEdit, ...codeBlock});
 
  //Return modified value
  return json;
}
  
