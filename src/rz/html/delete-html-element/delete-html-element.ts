import visit from 'unist-util-visit';
import { EditHtmlFile } from "../../angular/interfaces/edit-html.interface";
import { convertToAngularHtmlAndPrettify, parseHtml } from '../../angular/morph-angular-html';

export function deleteHtmlElement(editHtmlFile: EditHtmlFile, astNode: any): any {

  function deleteNode(node: any, parent: any) {
    if (node.type === 'element' && node.name === editHtmlFile.codeBlock) {
      // Check if the current node matches the one to delete
      if (parent) {
        // If there is a parent, remove the current node from the parent's children
        parent.children = [];
      } 
    }

    // Recursively process child nodes
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        deleteNode(node.children[i], node);
      }
    }
  }

  // Start the deletion process
  astNode.rootNodes.forEach((node: any) => {
    deleteNode(node, null);
  });

  return astNode;
}