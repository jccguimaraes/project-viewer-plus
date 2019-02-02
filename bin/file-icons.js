'use strict';

const fs = require('fs');

const icons = [];
const version = '2.1.29';

const isArray = arr => {
  if (Array.isArray(arr)) {
    return arr.forEach(isArray);
  }

  if (
    arr &&
    typeof arr.endsWith === 'function' &&
    arr.endsWith('-icon') &&
    !icons.includes(arr.replace('-icon', ''))
  ) {
    icons.push(arr.replace('-icon', ''));
  }
};

const getIcons = () => {
  return JSON.stringify(icons, null, 2).replace(/"/g, '\'');
};

isArray(require('./../node_modules/file-icons/lib/icons/.icondb'));

if (!icons.length) {
  throw 'NO ICONS';
}

fs.writeFile(
  './lib/constants/icons.js',
  `/* eslint-disable max-lines */\n// v${version} (total: ${
    icons.length
  })\nexport default ${getIcons()};\n`,
  err => {
    if (err) {
      throw err;
    }
  }
);
