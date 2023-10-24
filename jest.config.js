module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t)s$': 'ts-jest'
  },
  transformIgnorePatterns: [
    "node_modules/(?!(hast-util-from-html|devlop|hast-util-from-parse5|)/)"
  ],
  globals: { 
    'ts-jest': { 
      diagnostics: false,
      useESM: true
    } 
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)s$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
