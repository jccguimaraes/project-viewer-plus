/* eslint max-len: ["error", { "ignoreStrings": true }] */

export default {
  database: {
    type: 'object',
    title: 'Database',
    properties: {
      localPath: {
        title: 'Path to local database file',
        type: 'string',
        default: atom.getConfigDirPath(),
        order: 1
      }
    },
    order: 1
  }
};
