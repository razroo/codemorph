module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', {useESM: true, diagnostics: false}]
  },
  transformIgnorePatterns: [
    "node_modules/(?!(angular-html-parser|unist-util-visit)/)"
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)s$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
