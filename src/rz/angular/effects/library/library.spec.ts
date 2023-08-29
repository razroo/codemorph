import { returnRootTsConfig } from "./library";

describe('Library', () => {
  it('should return the root tsconfig', () => {
    const result = returnRootTsConfig('', [], []);
    expect(result).toEqual(['tsconfig.base.json']);
  });  
});