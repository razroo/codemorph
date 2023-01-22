import { getVersionAndNameString } from './razroo-path';

describe('getVersionAndNameString', () => {
  it('should return a name and version if it exists', () => {
    const mockPathId = 'angular-13.3.0'
    const expected = getVersionAndNameString(mockPathId);
    expect(expected).toEqual({
      name: 'angular',
      version: '13.3.0'
    })
  });

  it('should return name only if no version', () => {
    const mockPathId = 'angular';
    const expected = getVersionAndNameString(mockPathId);
    expect(expected).toEqual({
      name: 'angular',
      version: undefined
    })
  });
});