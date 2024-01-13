import { EditJson } from './../interfaces/json-morph.interface';
import { editJson } from './edit-json';

describe('editJson', () => {
  it('should modify nested json and return a string value', () => {
    const mockJson = {
      "scripts": {
        "build": "ng build",
        "test": "hello"
      }
    };
    const stringifiedMockJson = JSON.stringify(mockJson);
  
    const mockEditJson: EditJson = {
      nodeType: 'editJson',
      valueToModify: '/scripts/build',
      codeBlock: "nx build:two"
    }
    const modifiedJson = editJson(mockEditJson, stringifiedMockJson);
    const expected = {
      scripts: {
        build: "nx build:two",
        test: "hello"
      }
    };

    expect(modifiedJson).toEqual(expected);
  });

  it('should edit nested json and return value', () => {
    const mockJson = {
      contributes: {
        menus: {}
      }
    };

    const stringifiedMockJson = JSON.stringify(mockJson);
  
    const mockEditJson: EditJson = {
      nodeType: 'editJson',
      valueToModify: '/contributes/menus',
      codeBlock: {data: "test"}
    }
    const modifiedJson = editJson(mockEditJson, stringifiedMockJson);
    const expected = {
      contributes: {
        menus: {
          data: 'test'
        }
      }
    };

    expect(modifiedJson).toEqual(expected);
  });
});