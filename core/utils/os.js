const fs = require("fs");

/**
 * Check file exist or nor in async way
 * @param file {string}
 * @return {Promise}
 * */
const isPathExistAsync = async (file) => {
  return new Promise((resolve, reject) => {
    fs.promises.access(file, fs.constants.F_OK).then(resolve).catch(reject);
  });
};

/**
 * Create directory if it doesn't exist yet
 * @param path {string}
 * @return {void}
 * */
const createDirectory = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

/**
 * Clone file
 * @param source {string}
 * @param destination {string}
 * @return {Promise}
 * */
const copyFile = (source = "", destination = "") => {
  return new Promise((resolve) => {
    // destination already exist => not run
    if (fs.existsSync(destination)) {
      return resolve(
        "The destination has already existed yet - " + destination,
      );
    }

    // source doesn't exist
    if (!fs.existsSync(source)) {
      return resolve("The source doesn't exist - " + source);
    }

    // clone file
    fs.copyFile(source, destination, (err) =>
      err ? resolve(err.message) : resolve(true),
    );
  });
};

module.exports = {
  isPathExistAsync,
  createDirectory,
  copyFile,
};
