import { toClassName, toConstantName, toFileName, toPropertyName, toTitleName } from "../names";

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
export function existingFileNames(existingFileName: string): {
    existingFileName: string;
    existingFileClassName: string;
    existingFilePropertyName: string;
    existingFileConstantName: string;
    existingFileTitleName: string;
  } {
    return {
      existingFileName,
      existingFileClassName: toClassName(existingFileName),
      existingFilePropertyName: toPropertyName(existingFileName),
      existingFileConstantName: toConstantName(existingFileName),
      existingFileTitleName: toTitleName(existingFileName)
    };
  }
  