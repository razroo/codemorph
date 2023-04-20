/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as fs from 'fs';
import { dirname, join } from 'path';
import { sync as syncResolve } from 'resolve';
 
 export interface PackageJson {
   name: string;
   version: string;
   dependencies?: Record<string, string>;
   devDependencies?: Record<string, string>;
   peerDependencies?: Record<string, string>;
   optionalDependencies?: Record<string, string>;
 }
 
 function getAllDependencies(pkg: PackageJson): Set<[string, string]> {
   return new Set([
     ...Object.entries(pkg.dependencies || []),
     ...Object.entries(pkg.devDependencies || []),
     ...Object.entries(pkg.peerDependencies || []),
     ...Object.entries(pkg.optionalDependencies || []),
   ]);
 }
 
 export interface PackageTreeNode {
   name: string;
   version: string;
   path: string;
   package: PackageJson | undefined;
 }
 
 export async function readPackageJson(packageJsonPath: string): Promise<PackageJson | undefined> {
   try {
     return JSON.parse((await fs.promises.readFile(packageJsonPath)).toString());
   } catch {
     return undefined;
   }
 }
 
 export async function determineLanguagesUsed(packageJsonMap: Map<string, PackageTreeNode>): Promise<string[]> {
   const languagesUsedArr = [];
   if(packageJsonMap.has('@angular/core')) {
     languagesUsedArr.push('angular');
   }
   if(packageJsonMap.has('react')) {
     languagesUsedArr.push('react');
   }
   return languagesUsedArr;
 }
 