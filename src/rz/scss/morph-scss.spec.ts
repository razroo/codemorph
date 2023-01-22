import { EditScssInput } from './interfaces/morph-scss.interface';
import { readFileSync } from 'fs';
import { morphScss } from "./morph-scss";

describe('morphScss', () => {
  it('should be able to edit a scss file', () => {
    const fileToBeAddedTo = readFileSync('src/rz/scss/snapshots/themes.scss.snap').toString();
    const codeBlock = `.LightMode {
        background: #ffffff;
        color: #000000;
      };
    `

    const editScssInput: EditScssInput = {
      fileToBeAddedTo: fileToBeAddedTo,
      edits: [
        {
          nodeType: 'addScssBlock',
          codeBlock: codeBlock
        }
      ]
    }

    const expected = readFileSync('src/rz/scss/snapshots/themes-output.scss.snap').toString();

    expect(morphScss(editScssInput)).toEqual(expected);
  });

  it('should add scss import to the top of a file', () => {
    const fileToBeAddedTo = readFileSync('src/rz/scss/snapshots/add-import-output/add-import.scss.snap').toString();
    const path = `apps/<%= orgName%>/src/<%= orgName%>-styles.scss`;
    
    const editScssInput: EditScssInput = {
      fileToBeAddedTo: fileToBeAddedTo,
      edits: [
        {
          nodeType: 'import',
          path: path
        }
      ]
    }

    const expected = readFileSync('src/rz/scss/snapshots/add-import-output/add-import-output.scss.snap').toString();

    expect(morphScss(editScssInput)).toEqual(expected);
  });
});