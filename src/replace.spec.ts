import { replaceCurlyBrace } from './replace';

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

  it('should replace with curly braces if curly brace values shows up more than once', () => {
    const mockParameters = {
      nameFilePath:"libs/common/ui/src/lib/{name}-dialog",
      name:"blue",
      projectName:"razroo-angular-starter",
      className:"Blue",
      propertyName:"blue",
      constantName:"BLUE",
      fileName:"blue",
      titleName:"Blue"
    };
    const mockFileStringWithCurlyBrace = '{nameFilePath}/{name}-dialog.component.ts';

    const result = replaceCurlyBrace(mockParameters, mockFileStringWithCurlyBrace);
    const expected = 'libs/common/ui/src/lib/blue-dialog/blue-dialog.component.ts';

    expect(result).toEqual(expected);
  })

});