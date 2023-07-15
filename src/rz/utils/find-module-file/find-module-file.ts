import * as glob from 'glob';

export function findClosestModuleFile(path: string, fileNameToFind = 'module.ts'): string {
    let currentDir = path;
    while (currentDir.length > 0) {
        const modulePath = currentDir + `/*.${fileNameToFind}`;
        const modules = glob.sync(modulePath);
        if (modules.length > 0) {
          return modules[0];
        }
        currentDir = currentDir.substring(0, currentDir.lastIndexOf("/"));
    }
    return "";
}
