import { findClosestModuleFile } from './find-module-file';

describe('findClosestModuleFile', () => {
    it('should find the near module', () => {
        const currentDir = __dirname;
        const modulePath = currentDir + "/app.module.ts";
        const result = findClosestModuleFile(currentDir);
        // index.ts file added to folder specifically for this unit test
        expect(result).toBe(modulePath);
    });
});