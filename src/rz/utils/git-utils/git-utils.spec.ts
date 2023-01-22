import {extractProjectName} from './git-utils';

describe('extractProjectName', () => {
  it('should extract a user name and project name from a git ssh url', () => {
    const result = extractProjectName('git@github.com:razroo/razroo-angular-starter.git');
    const expected = 'razroo_razroo-angular-starter';
    expect(result).toEqual(expected);
  }); 

  it('should extract a user name and project name from a git https url', () => {
    const result = extractProjectName('https://github.com/razroo/razroo-angular-starter.git');
    const expected = 'razroo_razroo-angular-starter';
    expect(result).toEqual(expected);
  }); 
});