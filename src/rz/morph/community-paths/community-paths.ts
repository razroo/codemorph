export enum CommunityPaths {
  Angular = 'angular',
  React = 'react',
  Aws = 'aws',
  Azure = 'azure',
  Gcp = 'gcp',
  Git = 'git',
  Npm = 'npm',
  Pnmp = 'pnpm',
  Yarn = 'yarn',
  Python = 'python',
  Docker = 'docker'
}

export const communityPaths = Object.values(CommunityPaths);

export const supportedCommunityPaths = [
  {
    id: 'angular',
    displayName: 'Angular',
  },
  {
    id: 'react',
    displayName: 'React',
  },
  {
    id: 'aws',
    displayName: 'Aws',
  },
  {
    id: 'git',
    displayName: 'Git',
  },
  {
    id: 'npm',
    displayName: 'Npm',
  },
  {
    id: 'pnpm',
    displayName: 'Pnmp',
  },
  {
    id: 'yarn',
    displayName: 'Yarn',
  },
  {
    id: 'python',
    displayName: 'Python',
  }
];