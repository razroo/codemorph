/**
 * Util function to generate different strings based off the provided name.
 *
 * Examples:
 *
 * ```typescript
 * names("my-name") // {name: 'my-name', className: 'MyName', propertyName: 'myName', constantName: 'MY_NAME', fileName: 'my-name'}
 * names("myName") // {name: 'my-name', className: 'MyName', propertyName: 'myName', constantName: 'MY_NAME', fileName: 'my-name'}
 * ```
 * @param name
 */
 export function names(name: string): {
    name: string;
    className: string;
    propertyName: string;
    constantName: string;
    fileName: string;
    titleName: string;
  } {
    return {
      name,
      className: toClassName(name),
      propertyName: toPropertyName(name),
      constantName: toConstantName(name),
      fileName: toFileName(name),
      titleName: toTitleName(name)
    };
  }
  
  /**
   * Hyphenated to UpperCamelCase
   */
  export function toClassName(str: string): string {
    return toCapitalCase(toPropertyName(str));
  }
  
  /**
   * Hyphenated to lowerCamelCase
   */
  export function toPropertyName(s: string): string {
    return s
      .replace(/([^a-zA-Z0-9])+(.)?/g, (_, __, chr) =>
        chr ? chr.toUpperCase() : ''
      )
      .replace(/[^a-zA-Z\d]/g, '')
      .replace(/^([A-Z])/, (m) => m.toLowerCase());
  }
  
  /**
   * Hyphenated to CONSTANT_CASE
   */
  export function toConstantName(s: string): string {
    return s.replace(/([^a-zA-Z0-9])/g, '_').toUpperCase();
  }
  
  /**
   * Upper camelCase to lowercase, hyphenated
   */
  export function toFileName(s: string): string {
    return s
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      .toLowerCase()
      .replace(/[ _]/g, '-');
  }
  
  /**
   * Capitalizes the first letter of a string
   */
  export function toCapitalCase(s: string): string {
    return s.charAt(0).toUpperCase() + s.substr(1);
  }

  export function toTitleName(s: string): string {
    return toClassName(s).split('')
      .map(letter => 
        letter.match(/[A-Z]/)?' ' + letter : letter
      ).join('').trim()
  }
  