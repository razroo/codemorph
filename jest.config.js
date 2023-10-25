module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|js)$': ['ts-jest', { useESM: true, diagnostics: false }],
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)s$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  globals: {
    'ts-jest': {
      skipBabel: true,
      transform: {
        '^.+\\.(ts|js)$': ['ts-jest', { useESM: true, diagnostics: false }],
      },
    },
  },
};
