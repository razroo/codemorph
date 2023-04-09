import * as ejs from 'ejs';
import { kebabCase } from 'lodash';

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
): any => {
  return ejs.render(toReplace, parameters)
}

export const replaceCurlyBrace = (mockParameters: Record<string, string>, mockFileStringWithCurlyBrace: string, useKebabCase?: boolean): string => {
  let result = mockFileStringWithCurlyBrace;
  for(const key in mockParameters) {
    // only use kebab case if non file path
    const value = mockParameters[key];
    const isString = typeof value === 'string';
    const valueToReplaceWith = useKebabCase && isString && value.split('/').length < 2 ? kebabCase(value) : value;
    result = result.replace(new RegExp(`{${key}}`, 'g'), valueToReplaceWith);
  }
  const hasCurlyBrace = /{.*}/;
  if (hasCurlyBrace.test(result)) {
    for(const key in mockParameters) {
      // only use kebab case if non file path
      const value = mockParameters[key];
      const isString = typeof value === 'string';
      const valueToReplaceWith = useKebabCase && isString && value.split('/').length < 2 ? kebabCase(value) : value;
      result = result.replace(new RegExp(`{${key}}`, 'g'), valueToReplaceWith);
    }
  }
  return result;
}



