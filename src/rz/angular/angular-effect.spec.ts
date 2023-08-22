import { NOT_SUPPORTED } from "../morph";
import { angularFilesToAffect } from "./angular-effects";

describe('AngularEffects', () => {
  it('should return NOT_SUPPORTED if not supported', () => {
    const filePath = 'libs/hello.ts';
    const fileTree: string[] = [];
    const type = 'zulu' as any;

    const result = angularFilesToAffect(filePath, fileTree, type, []);
    expect(result).toEqual(NOT_SUPPORTED)
  })
})