import { createRelativePath, findNearestIndexFile } from './add-export';

test('findNearestIndexFile()', () => {
  const currentDir = __dirname;
  const indexPath = currentDir + "/index.ts";
  const result = findNearestIndexFile(currentDir);
  // index.ts file added to folder specifically for this unit test
  expect(result).toBe(indexPath);
});

describe('createRelativePath', () => {
  it('should create a relative path via two paths if they are in the same folder level', () => {
    const pathToBeExported = 'src/rz/utils/add-export/add-export.ts';
    const pathToBeUpdated = 'src/rz/utils/add-export/index.ts';

    expect(createRelativePath(pathToBeExported, pathToBeUpdated)).toEqual('./add-export');
  });

  it('should create a relative path via two paths if path to be exported is levels above', () => {
    const pathToBeExported = 'src/rz/utils/add-export.ts';
    const pathToBeUpdated = 'src/rz/utils/add-export/index.ts';

    expect(createRelativePath(pathToBeExported, pathToBeUpdated)).toEqual('../add-export');
  });

  it('should create a relative path via two paths if path to be exported is levels below', () => {
    const pathToBeExported = 'src/rz/utils/add-export/libs/src/add-export.ts';
    const pathToBeUpdated = 'src/rz/utils/add-export/index.ts';

    expect(createRelativePath(pathToBeExported, pathToBeUpdated)).toEqual('./libs/src/add-export');
  });
});
