import { readFileSync } from 'fs';
import { EditJson } from './../interfaces/json-morph.interface';
import { editJson, addJsonKeyValue } from './edit-json';
describe('editJson', () => {
  it('should edit json and return value', () => {
    const mockJson = readFileSync('src/rz/json/snapshots/project.json.snap').toString();
  
    const mockEditJson: EditJson = {
      nodeType: 'editJson',
      valueToModify: '/targets/build/configurations/production/fileReplacements',
      codeBlock: '[{replace: "libs/common/environments/src/lib/environment.ts", with: "libs/common/environments/src/lib/environment.prod.ts"}]'
    }
    const modifiedJson = editJson(mockEditJson, mockJson);
    const expected = JSON.parse(readFileSync('src/rz/json/snapshots/project-output.json.snap').toString());

    expect(modifiedJson).toEqual(expected);
  });

  it('should edit nested json and return value', () => {
    const mockJson = readFileSync('src/rz/json/snapshots/nested-package-json/nested-package.json.snap').toString();
  
    const mockEditJson: EditJson = {
      nodeType: 'editJson',
      valueToModify: '/contributes/menus',
      codeBlock: {data: "test"}
    }
    const modifiedJson = editJson(mockEditJson, mockJson);
    const expected = JSON.parse(readFileSync('src/rz/json/snapshots/nested-package-json/nested-package-output.json.snap').toString());

    expect(modifiedJson).toEqual(expected);
  });

  it('should add a key value', () => {
    const mockJson = readFileSync('src/rz/json/snapshots/package-json/package.json.snap').toString();
    const mockEditJson: EditJson = {
      nodeType: 'editJson',
      valueToModify: 'scripts',
      codeBlock: '{"test:ci": "npm run nx -- run-many --target=test --all --parallel --coverage --coverageReporters=lcov && node ./tools/coverageMerger.js"}'
    }

    const modifiedJson = addJsonKeyValue(mockEditJson, mockJson);
    const expected = JSON.parse(readFileSync('src/rz/json/snapshots/package-json/package-output.json.snap').toString());

    expect(modifiedJson).toEqual(expected);
  });
});