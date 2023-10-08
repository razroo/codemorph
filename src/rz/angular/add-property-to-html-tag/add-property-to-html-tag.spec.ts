import { morphCode } from "../../morph";
import { EditHtmlFile } from "../interfaces/edit-html.interface";

describe('addPropertyToHtmlTag', () => {
  it('should add a property to an html tag and only use the first element', () => {
    const fileToBeAddedTo = `<div>
<devgen-eureka-seven-global-header> </devgen-eureka-seven-global-header>
<devgen-eureka-seven-global-header> </devgen-eureka-seven-global-header>
</div>`;
    const codeBlock = '{"(sideNavToggle)": "sideNavToggle()"}';

    const insertIntoHtmlTag: EditHtmlFile = {
       nodeType: 'addPropertyToHtmlTag',
       codeBlock: codeBlock,
       tagNameToInsertInto: 'devgen-eureka-seven-global-header'
    };

    const editInput = {
      fileType: 'html',
      fileToBeAddedTo: fileToBeAddedTo,
      edits: [
        insertIntoHtmlTag
      ]
    };

    const result = morphCode(editInput);
    const expected = `<div>
  <devgen-eureka-seven-global-header (sideNavToggle)="sideNavToggle()">
  </devgen-eureka-seven-global-header>
  <devgen-eureka-seven-global-header> </devgen-eureka-seven-global-header>
</div>
`;
    expect(result).toEqual(expected);
  });
});