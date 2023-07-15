import { EditJson, EditJsonInput } from './interfaces/json-morph.interface';
import { addJsonKeyValue, editJson } from './edit-json/edit-json';

export function morphJson(editJsonInput: EditJsonInput): string {
  let json = editJsonInput.fileToBeAddedTo;

  editJsonInput.edits.forEach((editJsonValue: EditJson) => {
    switch(editJsonValue.nodeType) {
      case 'editJson': 
        json = editJson(editJsonValue, json as string);
        break;
      case 'addJsonKeyValue': 
        json = addJsonKeyValue(editJsonValue, json as string);
        break;
    }
  });
  return JSON.stringify(json, null, 2);
}