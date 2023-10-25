import { EditInput, morphCode } from "../../morph";
import { EditHtmlFile } from "../interfaces/edit-html.interface";

describe('addSiblingHtml', () => {
  it('should add sibling html code after', () => {
    const fileToBeAddedTo = `<div>
<devgen-header> </devgen-header>
</div>`;
    const siblingCodeBlock = '<devgen-footer></<devgen-footer>'
    const addSiblingHtml: EditHtmlFile = {
        nodeType: 'addSiblingHtml',
        codeBlock: siblingCodeBlock,
        tagNameToInsert: 'devgen-footer',
        siblingTagName: 'devgen-header'
    };
    
    const editHtmlInput: any = {
      fileType: 'html',
      fileToBeAddedTo: fileToBeAddedTo,
      edits: [
        addSiblingHtml
      ]
    };
  
    const expected = `<div>
<devgen-header> </devgen-header>
<devgen-footer> </devgen-footer>
</div>`;
  
    const newHtmlString = morphCode(editHtmlInput);
  
    expect(newHtmlString).toEqual(expected);
  });  
});