"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
      }
    },
    order: 1
  }
};
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb25zdGFudHMvY29uZmlnLmpzIl0sIm5hbWVzIjpbImRhdGFiYXNlIiwidHlwZSIsInRpdGxlIiwicHJvcGVydGllcyIsImxvY2FsUGF0aCIsImRlZmF1bHQiLCJhdG9tIiwiZ2V0Q29uZmlnRGlyUGF0aCIsIm9yZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7ZUFFZTtBQUNiQSxFQUFBQSxRQUFRLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFFLFFBREU7QUFFUkMsSUFBQUEsS0FBSyxFQUFFLFVBRkM7QUFHUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLE1BQUFBLFNBQVMsRUFBRTtBQUNURixRQUFBQSxLQUFLLEVBQUUsNkJBREU7QUFFVEQsUUFBQUEsSUFBSSxFQUFFLFFBRkc7QUFHVEksUUFBQUEsT0FBTyxFQUFFQyxJQUFJLENBQUNDLGdCQUFMLEVBSEE7QUFJVEMsUUFBQUEsS0FBSyxFQUFFO0FBSkU7QUFERCxLQUhKO0FBV1JBLElBQUFBLEtBQUssRUFBRTtBQVhDO0FBREcsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBtYXgtbGVuOiBbXCJlcnJvclwiLCB7IFwiaWdub3JlU3RyaW5nc1wiOiB0cnVlIH1dICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YWJhc2U6IHtcbiAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICB0aXRsZTogJ0RhdGFiYXNlJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBsb2NhbFBhdGg6IHtcbiAgICAgICAgdGl0bGU6ICdQYXRoIHRvIGxvY2FsIGRhdGFiYXNlIGZpbGUnLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgZGVmYXVsdDogYXRvbS5nZXRDb25maWdEaXJQYXRoKCksXG4gICAgICAgIG9yZGVyOiAxXG4gICAgICB9XG4gICAgfSxcbiAgICBvcmRlcjogMVxuICB9XG59O1xuIl19