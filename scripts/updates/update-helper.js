import fs from 'fs';
import path from 'path';
export function copyProjectFolder(
  relativePathInsideProject,
  options = { ignorePattern: undefined },
) {
  const templateFolder = process.cwd() + '_template';

  const copyFrom = path.join(templateFolder, relativePathInsideProject);
  const copyTo = path.join(process.cwd(), relativePathInsideProject);
  console.log(`Copying from '${copyFrom}' to '${copyTo}'`);
  copyRecursively(copyFrom, copyTo, options);
}

function copyRecursively(src, dest, options = { ignorePattern: undefined }) {
  const exists = fs.existsSync(src);
  if (!exists) return;
  const stats = fs.statSync(src);
  if (stats.isFile) {
    fs.copyFileSync(src, dest);
  } else if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }

    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursively(
        path.join(src, childItemName),
        path.join(dest, childItemName),
        options,
      );
    });
  } else {
    if (src.includes('.partial')) return;
    const srcPartialFile = getPartialFileName(src);
    const destPartialFile = getPartialFileName(dest);
    if (fs.existsSync(srcPartialFile) && !fs.existsSync(destPartialFile)) {
      fs.copyFileSync(srcPartialFile, destPartialFile);
    }
    if (fs.existsSync(dest)) {
      if (options?.ignorePattern) {
        if (src.match(options.ignorePattern)) {
          return;
        }
      }
      const sourceFileContent = fs.readFileSync(src);
      const destinationFileContent = fs.readFileSync(dest);
      if (sourceFileContent !== destinationFileContent) {
        fs.cpSync(src, dest, { force: true, preserveTimestamps: true });
      }
    } else {
      fs.cpSync(src, dest, { force: true, preserveTimestamps: true });
    }
  }
}

function getPartialFileName(fileName) {
  return fileName.replace(
    path.extname(fileName),
    '.partial' + path.extname(fileName),
  );
}

export function patchFile(relativePath, search, replace) {
  const filePath = path.join(process.cwd(), relativePath);
  let contents = fs.readFileSync(filePath).toString('utf8');

  contents = contents.replace(search, replace);

  fs.writeFileSync(filePath, contents);
}
export function removePackageReference(relativePath, packageName) {
  // <PackageReference Include="OpenIddict.AspNetCore" Version="4.2.0" />
  patchFile(
    relativePath,
    new RegExp(`<PackageReference\s+Include="${packageName}".*?/>`, ''),
  );
}

export function updatePlaywright(version) {
  patchFile('e2e/package.json', /playwright:v.*-/, `playwright:v${version}-`);
  patchFile(
    '.ci/azure-pipelines-template.yml',
    /playwright:v.*-/,
    `playwright:v${version}-`,
  );
}
