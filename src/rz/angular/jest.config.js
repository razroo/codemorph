module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  transformIgnorePatterns: [
    "node_modules/(?!(hast-util-from-html|devlop|hast-util-from-parse5|hastscript|property-information|comma-separated-tokens|hast-util-parse-selector|space-separated-tokens|vfile-location|web-namespaces|vfile|vfile-message|unist-util-stringify-position)/)"
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
