/* eslint "no-underscore-dangle": "off" */
const Module = require("module");

const originalLoader = Module._load;
const patchedLoader = (request, parent, isMain) => {
  try {
    return originalLoader.call(null, request, parent, isMain);
  } catch (error) {
    const newRequest = `${request}.jsx`;
    return originalLoader.call(null, newRequest, parent, isMain);
  }
};
Module._load = patchedLoader;
