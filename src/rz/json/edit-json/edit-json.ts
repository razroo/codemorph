import { EditJson } from "../interfaces/json-morph.interface";
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
  
