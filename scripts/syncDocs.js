var childProcess = require('child_process');
var path = require('path');
var shelljs = require('shelljs');

var npmInstallPackage = require('npm-install-package');

// var niv = require('npm-install-version');

var TEMP = path.join(__dirname, '..', 'node_modules', '.npm-install-version-temp');

var pkgMulti = require('../package-multi');

var aframeVersions = pkgMulti.dependencies.aframe;

// [Object.keys(aframeVersions)[0]].forEach(function (version) {
//   // shelljs.mkdir('-p', TEMP);
//   // shelljs.cd(TEMP);
//   // shelljs.exec('npm install ' + aframeVersions[version]);
//   niv.install(aframeVersions[version]);

//   var installOptions = {
//     cwd: TEMP,
//     stdio: [null, null, null]
//   };
//   childProcess.spawnSync('npm', ['install', aframeVersions[version]], installOptions);

//   // var dest = path.join(__dirname, '..', 'src', 'docs', version);
//   // console.log('dest', dest, aframeVersions[version]);
//   // shelljs.cp('-R', path.join(TEMP, aframeVersions[version]), dest);
// });

[Object.keys(aframeVersions)[0]].forEach(function (version) {
  // shelljs.mkdir('-p', TEMP);
  // shelljs.cd(TEMP);
  // shelljs.exec('npm install ' + aframeVersions[version]);
  // niv.install(aframeVersions[version]);

  const devDeps = [ 'map-limit', 'minimist', 'cliclopts' ]
  const opts = { saveDev: true, cache: true }
  npmInstallPackage(aframeVersions[version]);

  // var installOptions = {
  //   cwd: TEMP,
  //   stdio: [null, null, null]
  // };
  // childProcess.spawnSync('npm', ['install', aframeVersions[version]], installOptions);

  // var dest = path.join(__dirname, '..', 'src', 'docs', version);
  // console.log('dest', dest, aframeVersions[version]);
  // shelljs.cp('-R', path.join(TEMP, aframeVersions[version]), dest);
});
