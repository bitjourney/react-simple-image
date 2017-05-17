const path = require('path');
const tsConfigPaths = require('tsconfig-paths');

const tsConfig = require('./tsconfig.json');

const baseUrl = path.join(__dirname, tsConfig.compilerOptions.baseUrl);
const paths = tsConfig.compilerOptions.paths;

paths['src/Image'] = [
  './',
];

tsConfigPaths.register({
  baseUrl,
  paths,
});
