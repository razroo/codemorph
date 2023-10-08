import { morphCode } from "../../morph";
import { EditHtmlFile, EditHtmlInput } from "../interfaces/edit-html.interface";

describe('insertIntoHtmlTag', () => {
    it('should insert html into the specified tag', () => {
      const fileToBeAddedTo = `<div class="wrapper">
<div class="container">Your component goes here</div>
</div>
`;
      const codeBlock = '<div>new div content</div>';
      const insertIntoHtmlTag: EditHtmlFile = {
        nodeType: 'insertIntoHtmlTag',
        codeBlock: codeBlock,
        tagNameToInsertInto: 'div',
        className: 'container'
      };

      const editHtmlInput: EditHtmlInput = {
        fileType: 'html',
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
          insertIntoHtmlTag
        ]
      };

      const expected = `<div class="wrapper">
<div class="container">Your component goes here <div>new div content</div></div>
</div>
`;
      const newHtmlString = morphCode(editHtmlInput);
      expect(newHtmlString).toEqual(expected);
    });
  });