export function extractProjectName(url: string): string {
    const urlParts = url.split('/');
    const userName = urlParts[urlParts.length - 2];
    const projectName = urlParts[urlParts.length - 1];
    const projectNameParts = projectName.split('.');
    if(userName.split(':').length > 1) {
      const newUserName = userName.split(':');
      return `${newUserName[newUserName.length - 1]}/${projectNameParts[0]}`.replace('/', '_');
    } else {
      return `${userName}/${projectNameParts[0]}`.replace('/', '_');
    }
    
}
  