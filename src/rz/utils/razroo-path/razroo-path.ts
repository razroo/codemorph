export function getVersionAndNameString(pathId: string): {name: string, version: string | undefined}  {
    let version: string | undefined;
    const splitPathId = pathId.split('-');
    if(hasSemver(pathId)) {
      version = splitPathId.pop();
    }
    const pathIdName = splitPathId.join('-');
    return {name: pathIdName, version: version};
  }

function hasSemver(pathId: string) {
return /\d+\.\d+\.\d+/.test(pathId);
}