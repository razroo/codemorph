import * as ejs from 'ejs';

export const replaceTagParameters = (
  parameters: Record<string, string>,
  toReplace: string
): string => {
  for (const [key, value] of Object.entries(parameters)) {
    const keyString = `<%= ${key} %>`;
    const keyStringRegex = new RegExp(keyString, 'g');
    toReplace = toReplace.replace(keyStringRegex, value);
  }
  return toReplace;
};


export const parseEJSCode = (
  parameters: Record<string, string>,
  toReplace: string
) => {
  return ejs.render(toReplace, parameters)
}

export const replaceCurlyBrace = (mockParameters: object, mockFileStringWithCurlyBrace: string): string => {
  let result = mockFileStringWithCurlyBrace;
  for(let key in mockParameters) {
      result = result.replaceAll('{' + key + '}', mockParameters[key]);
  }
  return result;
}