import { JSONPath } from 'jsonpath-plus';
import { EditJson } from "../interfaces/json-morph.interface";
import * as pointer from 'json-pointer';

export function addJsonKeyValue(editJson: EditJson, json: string): any {
    // double json parse hack to make sure /n are removed from string
    const codeBlock = typeof editJson.codeBlock === 'string' ? JSON.parse(JSON.parse(JSON.stringify(editJson.codeBlock))) : editJson.codeBlock;
    json = typeof json === 'string' ? JSON.parse(json) : json;
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