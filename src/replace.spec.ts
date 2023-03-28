import { parseEJSCode, replaceCurlyBrace } from './replace';

describe('replaceCurlyBrace', () => {
  it('should replaceCurlyBrace with respective parameters', () => {
    const mockParameters = {
      name: 'test',
      selector: 'test-two',
      className: ''
    };
    const mockFileStringWithCurlyBrace = 'src/{selector}/{name}.component.html';

    const result = replaceCurlyBrace(mockParameters, mockFileStringWithCurlyBrace);
    const expected = 'src/test-two/test.component.html';

    expect(result).toEqual(expected);
  });

  it('should replace with curly braces if curly brace values shows up more than once and replace value with kebab case', () => {
    const mockParameters = {
      nameFilePath:"libs/common/ui/src/lib/{name}-dialog",
      name:"Hello World"
    };
    const mockFileStringWithCurlyBrace = '{nameFilePath}/{name}-dialog.component.ts';

    const result = replaceCurlyBrace(mockParameters, mockFileStringWithCurlyBrace, true);
    const expected = 'libs/common/ui/src/lib/hello-world-dialog/hello-world-dialog.component.ts';

    expect(result).toEqual(expected);
  })

  it('parseEJSCode should parse for loop correctly', () => {
    const mockParameters = {
      colors: ['blue', 'green', 'red', 'yellow'],
    };
    const mockFileString = "import x from 'y';\nclass DynamicClass = {\n<% for(let i=0; i<colors.length; i++) { %>\n<%= colors[i] %>: string;\n<% } %>\n}";

    const result = parseEJSCode(mockParameters as any, mockFileString);
    const expected = "import x from 'y';\nclass DynamicClass = {\n\nblue: string;\n\ngreen: string;\n\nred: string;\n\nyellow: string;\n\n}";
    expect(result).toEqual(expected);
  })

});