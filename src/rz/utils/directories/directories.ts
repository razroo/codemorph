import { join } from "path";
import * as fs from 'fs'

interface VsCodeFolderItem {
  path: string;
  name: string;
}

export function getDirectoriesAsFlatFolderArray(pathToGetDirectoriesFrom: string): string[] {
  return fs
     .readdirSync(pathToGetDirectoriesFrom)
     .map((file) => join(pathToGetDirectoriesFrom, file))
     .filter((path) => fs.statSync(path).isDirectory() && !path.includes('.git') && !path.includes('node_modules'))
}

function flatten(lists: any): string[] {
  return lists.reduce((fileOne: string, fileTwo: string) => fileOne.concat(fileTwo), []);
}

// this will get all directories from the top level  down to the last child
export function getAllDirectories(srcpath: string): string[] {
  return [
      srcpath,
      ...flatten(getDirectoriesAsFlatFolderArray(srcpath).map(getAllDirectories)),
  ];
}

export function getAllDirectoriesFromVsCodeFolder(vsCodeFolderItem: VsCodeFolderItem): string[] {
  //TODO change name to directory name
  const { path, name } = vsCodeFolderItem;
  return getAllDirectories(path)?.map((folder) => {
    return folder.slice(folder.search(name), folder.length);
  });
};