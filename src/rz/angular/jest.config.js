module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|js|mjs)$': ['ts-jest', { 
      useESM: true, 
      diagnostics: false,
      babelConfig: 'babel.config.json'
    }],
  },
  transformIgnorePatterns: ["node_modules/(?!(angular-html-parser)/)"],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)s$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
