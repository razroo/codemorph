import { getAllDirectories, getAllDirectoriesFromVsCodeFolder, getDirectoriesAsFlatFolderArray } from './directories';

describe('getDirectoriesAsFlatFolderArray', () => {
    it('should get the directories for a particular folder', () => {
      const result = getDirectoriesAsFlatFolderArray('src/rz/utils/directories/test-directories');
      const expected = [
        'src/rz/utils/directories/test-directories/test-directory-one',
        'src/rz/utils/directories/test-directories/test-directory-two'
    ];

      expect(result).toEqual(expected);
    });
});

describe('getAllDirectories', () => {
    it('should get the directories and all children folders for a particular folder', () => {
      const result = getAllDirectories('src/rz/utils/directories/test-directories');
      const expected = [
        'src/rz/utils/directories/test-directories',
        'src/rz/utils/directories/test-directories/test-directory-one',
        'src/rz/utils/directories/test-directories/test-directory-one/test-directory-three',
        'src/rz/utils/directories/test-directories/test-directory-two'
      ];

      expect(result).toEqual(expected);
    });
});

describe('getDirectoriesWithoutPrivatePath', () => {
  const mockVsCodeFolder = {name: 'test-directories', path: 'src/rz/utils/directories/test-directories'};
  const expected = [
    'test-directories',
    'test-directories/test-directory-one',
    'test-directories/test-directory-one/test-directory-three',
    'test-directories/test-directory-two'
  ];

  it('should take in a VSCode item and return a folder file directory starting from directoryName', () => {
    expect(getAllDirectoriesFromVsCodeFolder(mockVsCodeFolder)).toEqual(expected);
  })  
})
