import { SourceFile } from "ts-morph";

// used for the individual function params
export interface EditCodeBlockInput {
  sourceFile: SourceFile;
  codeBlock: string | any;
  nodeToInsertInto?: string;
  type?: string;
  name?: string;
  path?: string;
  parameters?: any;
  bodyText?: string;
  isExported?: boolean;
}