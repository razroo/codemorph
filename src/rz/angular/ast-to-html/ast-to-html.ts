import {
  Attribute,
  CDATA,
  Comment,
  DocType,
  Element,
  Node,
  Text,
} from "angular-html-parser/lib/compiler/src/ml_parser/ast";

export function astToHtml(rootNodes: Node[]): string {
  return rootNodes.map(nodeToString).join("");
}

const voidElements = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];

function nodeToString(node: Node): string {
  switch (node.type) {
    case "element":
      return elementToString(node);
    case "text":
      return textToString(node);
    case "cdata":
      return cdataToString(node);
    case "attribute":
      return attributeToString(node);
    case "docType":
      return docTypeToString(node);
    case "comment":
      return commentToString(node);
  }
}
function elementToString(node: Element): string {
  if(voidElements.includes(node.name)) {
    return `<${node.name}${astToHtml(node.attrs)} >`;
  } else {
    return `<${node.name}${astToHtml(node.attrs)}>${astToHtml(node.children)}</${
      node.name
    }>`;
  }
  
}
function textToString(node: Text): string {
  return node.value;
}
function cdataToString(node: CDATA): string {
  return `<![CDATA[${node.value}]]>`;
}
function attributeToString(node: Attribute): string {
  if(node.value) {
    return ` ${node.name}="${node.value}"`;
  } else {
    return ` ${node.name}`;
  }
}

function docTypeToString(node: DocType): string {
  return `<!DOCTYPE ${node.value}>`;
}
function commentToString(node: Comment): string {
  return `<!-- ${node.value} -->`;
}