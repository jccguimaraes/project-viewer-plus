"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = require("./base");

/* eslint max-len: ["error", { "ignoreStrings": true }] */
var _default = {
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
        default: _base.DATABASE_FILE,
        order: 2
      }
    },
    order: 1
  }
};
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb25zdGFudHMvY29uZmlnLmpzIl0sIm5hbWVzIjpbImRhdGFiYXNlIiwidHlwZSIsInRpdGxlIiwicHJvcGVydGllcyIsImxvY2FsUGF0aCIsImRlZmF1bHQiLCJhdG9tIiwiZ2V0Q29uZmlnRGlyUGF0aCIsIm9yZGVyIiwiZmlsZU5hbWUiLCJEQVRBQkFTRV9GSUxFIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBREE7ZUFHZTtBQUNiQSxFQUFBQSxRQUFRLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFFLFFBREU7QUFFUkMsSUFBQUEsS0FBSyxFQUFFLFVBRkM7QUFHUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLE1BQUFBLFNBQVMsRUFBRTtBQUNURixRQUFBQSxLQUFLLEVBQUUsNkJBREU7QUFFVEQsUUFBQUEsSUFBSSxFQUFFLFFBRkc7QUFHVEksUUFBQUEsT0FBTyxFQUFFQyxJQUFJLENBQUNDLGdCQUFMLEVBSEE7QUFJVEMsUUFBQUEsS0FBSyxFQUFFO0FBSkUsT0FERDtBQU9WQyxNQUFBQSxRQUFRLEVBQUU7QUFDUlAsUUFBQUEsS0FBSyxFQUFFLDJCQURDO0FBRVJELFFBQUFBLElBQUksRUFBRSxRQUZFO0FBR1JJLFFBQUFBLE9BQU8sRUFBRUssbUJBSEQ7QUFJUkYsUUFBQUEsS0FBSyxFQUFFO0FBSkM7QUFQQSxLQUhKO0FBaUJSQSxJQUFBQSxLQUFLLEVBQUU7QUFqQkM7QUFERyxDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IG1heC1sZW46IFtcImVycm9yXCIsIHsgXCJpZ25vcmVTdHJpbmdzXCI6IHRydWUgfV0gKi9cbmltcG9ydCB7IERBVEFCQVNFX0ZJTEUgfSBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGFiYXNlOiB7XG4gICAgdHlwZTogJ29iamVjdCcsXG4gICAgdGl0bGU6ICdEYXRhYmFzZScsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbG9jYWxQYXRoOiB7XG4gICAgICAgIHRpdGxlOiAnUGF0aCB0byBsb2NhbCBkYXRhYmFzZSBmaWxlJyxcbiAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgIGRlZmF1bHQ6IGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLFxuICAgICAgICBvcmRlcjogMVxuICAgICAgfSxcbiAgICAgIGZpbGVOYW1lOiB7XG4gICAgICAgIHRpdGxlOiAnTmFtZSBvZiB0aGUgZGF0YWJhc2UgZmlsZScsXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBkZWZhdWx0OiBEQVRBQkFTRV9GSUxFLFxuICAgICAgICBvcmRlcjogMlxuICAgICAgfVxuICAgIH0sXG4gICAgb3JkZXI6IDFcbiAgfVxufTtcbiJdfQ==