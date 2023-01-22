import { readFileSync } from 'fs';
import { EditInput } from '../../morph/interfaces/morph.interface';
import { morphTypescript } from '../morph-typescript';

describe('addConstructorMethod', () => {
    it('should add a constructor to a private method if existing constructor', () => {
        const editTypescriptInput: EditInput = {
            fileToBeAddedTo: readFileSync('src/rz/typescript/add-constructor-method/snapshots/add-constructor-method/add-constructor-method.ts.snap').toString(),
            fileName: 'name',
            edits: [
            {
                nodeType: 'addConstructorMethod',
                codeBlock: 'userService',
                type: 'UserService'
            }
            ]
        };

        const typescriptString = morphTypescript(editTypescriptInput);

        const expected = readFileSync('src/rz/typescript/add-constructor-method/snapshots/add-constructor-method/add-constructor-method-output.ts.snap').toString();

        expect(typescriptString).toEqual(expected);  
    });

    it('should add a constructor to a private method even if no existing constructor', () => {
        const editTypescriptInput: EditInput = {
            fileToBeAddedTo: readFileSync('src/rz/typescript/add-constructor-method/snapshots/add-constructor-method/add-constructor-method-no-constructor.ts.snap').toString(),
            fileName: 'name',
            edits: [
            {
                nodeType: 'addConstructorMethod',
                codeBlock: 'userService',
                type: 'UserService'
            }
            ]
        };

        const typescriptString = morphTypescript(editTypescriptInput);

        const expected = readFileSync('src/rz/typescript/add-constructor-method/snapshots/add-constructor-method/add-constructor-method-output.ts.snap').toString();

        expect(typescriptString).toEqual(expected);  
    });
})
