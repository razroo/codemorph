import { morphCode } from '../../morph';
import { EditJson } from './../interfaces/json-morph.interface';
import { addJsonKeyValue } from './add-json';

describe('addJson', () => {
    it('should add json key value if nested json being added', () => {
      const mockJson = `{
        "test": "123",
        "targets": {}
      }`;

      const codeBlock = `{
          "server": {
            "executor": "@angular-devkit/build-angular:server"
          }
      }`;

      const mockAddJson: EditJson = {
        nodeType: 'addJsonKeyValue',
        valueToModify: 'targets',
        codeBlock: codeBlock
      }
      
      const editInput: any = {
        fileType: 'json',
        fileToBeAddedTo: mockJson,
        edits: [
          mockAddJson
        ]
      };

      const modifiedJson = morphCode(editInput);
      const expected = {
        "test": "123",
        "targets": {
          "server": {
            "executor": "@angular-devkit/build-angular:server"
          }
        }
      };

      const result = JSON.parse(modifiedJson);

      expect(result).toEqual(expected);
    });

    it('should add a key value', () => {
      const mockJson = `{
        "scripts": {
          "test": "npm run test"
        }
      }`;

      const mockEditJson: EditJson = {
        nodeType: 'editJson',
        valueToModify: 'scripts',
        codeBlock: '{"test:ci": "npm run nx -- run-many --target=test --all --parallel --coverage --coverageReporters=lcov && node ./tools/coverageMerger.js"}'
      }
  
      const modifiedJson = addJsonKeyValue(mockEditJson, mockJson);
      const expected = {
        scripts: {
          "test": "npm run test",
          "test:ci": "npm run nx -- run-many --target=test --all --parallel --coverage --coverageReporters=lcov && node ./tools/coverageMerger.js"
        }
      };
  
      expect(modifiedJson).toEqual(expected);
    });

    it('should add json key value if nested json being added and edit json', () => {
      const mockJson = `{
        "scripts": {
          "test": "npm run test"
        },
        "test": "123",
        "targets": {}
      }`;

      const codeBlock = `{
          "server": {
            "executor": "@angular-devkit/build-angular:server"
          }
      }`;

      const mockAddJson: EditJson = {
        nodeType: 'addJsonKeyValue',
        valueToModify: 'targets',
        codeBlock: codeBlock
      }

      const mockEditJson: EditJson = {
        nodeType: 'editJson',
        valueToModify: '/contributes/menus',
        codeBlock: {data: "test"}
      }
      
      const editInput: any = {
        fileType: 'json',
        fileToBeAddedTo: mockJson,
        edits: [
          mockAddJson,
          mockEditJson
        ]
      };

      const modifiedJson = morphCode(editInput);
      const expected = {
        "test": "123",
        "targets": {
          "server": {
            "executor": "@angular-devkit/build-angular:server"
          }
        }
      };

      const result = JSON.parse(modifiedJson);

      expect(result).toEqual(expected);
    });
  
});


