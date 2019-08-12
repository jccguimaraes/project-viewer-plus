/* eslint max-len: ["error", { "ignoreStrings": true }] */
import { DATABASE_FILE } from './base';

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
      },
      fileName: {
        title: 'Name of the database file',
        type: 'string',
        default: DATABASE_FILE,
        order: 2
      }
    },
    order: 1
  }
};
