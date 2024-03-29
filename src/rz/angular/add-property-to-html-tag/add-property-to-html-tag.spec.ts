import { morphCode } from "../../morph";
import { EditHtmlFile } from "../interfaces/edit-html.interface";

describe('addPropertyToHtmlTag', () => {
  it('should add a property to an html tag and only use the first element', () => {
    const fileToBeAddedTo = `<div>
<devgen-eureka-seven-global-header (toggleHeader)="toggleHeader()"> </devgen-eureka-seven-global-header>
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
  <devgen-eureka-seven-global-header
    (toggleHeader)="toggleHeader()"
    (sideNavToggle)="sideNavToggle()"
  >
  </devgen-eureka-seven-global-header>
  <devgen-eureka-seven-global-header> </devgen-eureka-seven-global-header>
</div>
`;
    expect(result).toEqual(expected);
  });

  it('should add a property to an html tag and use the class name to determine which element', () => {
      const fileToBeAddedTo = `<div></div>
<div class="Toolbar__Icons"></div>
`;
      const codeBlock = '{"*ngIf": "authenticated"}';
  
      const insertIntoHtmlTag: EditHtmlFile = {
         nodeType: 'addPropertyToHtmlTag',
         codeBlock: codeBlock,
         tagNameToInsertInto: 'div',
         className: 'Toolbar__Icons'
      };
  
      const editInput = {
        fileType: 'html',
        fileToBeAddedTo: fileToBeAddedTo,
        edits: [
          insertIntoHtmlTag
        ]
      };
  
      const result = morphCode(editInput);
      const expected = `<div></div>
<div class="Toolbar__Icons" *ngIf="authenticated"></div>
`;
    expect(result).toEqual(expected);
  });
});