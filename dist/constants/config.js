'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint max-len: ["error", { "ignoreStrings": true }] */

exports.default = {
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
  },
  dock: {
    type: 'object',
    title: 'Dock',
    properties: {
      position: {
        title: 'Position',
        description: 'In which dock to position `project-viewer-plus`.',
        type: 'string',
        default: 'right',
        enum: ['left', 'right'],
        order: 1
      },
      isVisible: {
        title: 'Visible dock',
        description: 'If set to `true`, it will show the <em>dock</em> where `project-viewer-plus` is placed.<br><br><span class="pv-notice-warning">warning:</span><br>Keep in mind that this may/or will impact other <em>items</em> on the placed <em>dock</em>.',
        type: 'boolean',
        default: true,
        order: 2
      },
      isActive: {
        title: 'Activate dock',
        description: 'If set to `true`, it will make `project-viewer-plus` the visible <em>item</em> in the placed <em>dock</em>.<br><br><span class="pv-notice-warning">warning:</span><br>If <em>item</em> is positioned in the left <em>dock</em> it may hide the `tree-view` <em>item</em>.',
        type: 'boolean',
        default: true,
        order: 3
      }
    },
    order: 2
  }
};
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb25zdGFudHMvY29uZmlnLmpzIl0sIm5hbWVzIjpbImRhdGFiYXNlIiwidHlwZSIsInRpdGxlIiwicHJvcGVydGllcyIsImxvY2FsUGF0aCIsImRlZmF1bHQiLCJhdG9tIiwiZ2V0Q29uZmlnRGlyUGF0aCIsIm9yZGVyIiwiZG9jayIsInBvc2l0aW9uIiwiZGVzY3JpcHRpb24iLCJlbnVtIiwiaXNWaXNpYmxlIiwiaXNBY3RpdmUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O2tCQUVlO0FBQ2JBLFlBQVU7QUFDUkMsVUFBTSxRQURFO0FBRVJDLFdBQU8sVUFGQztBQUdSQyxnQkFBWTtBQUNWQyxpQkFBVztBQUNURixlQUFPLDZCQURFO0FBRVRELGNBQU0sUUFGRztBQUdUSSxpQkFBU0MsS0FBS0MsZ0JBQUwsRUFIQTtBQUlUQyxlQUFPO0FBSkU7QUFERCxLQUhKO0FBV1JBLFdBQU87QUFYQyxHQURHO0FBY2JDLFFBQU07QUFDSlIsVUFBTSxRQURGO0FBRUpDLFdBQU8sTUFGSDtBQUdKQyxnQkFBWTtBQUNWTyxnQkFBVTtBQUNSUixlQUFPLFVBREM7QUFFUlMscUJBQWEsa0RBRkw7QUFHUlYsY0FBTSxRQUhFO0FBSVJJLGlCQUFTLE9BSkQ7QUFLUk8sY0FBTSxDQUFDLE1BQUQsRUFBUyxPQUFULENBTEU7QUFNUkosZUFBTztBQU5DLE9BREE7QUFTVkssaUJBQVc7QUFDVFgsZUFBTyxjQURFO0FBRVRTLHFCQUNFLCtPQUhPO0FBSVRWLGNBQU0sU0FKRztBQUtUSSxpQkFBUyxJQUxBO0FBTVRHLGVBQU87QUFORSxPQVREO0FBaUJWTSxnQkFBVTtBQUNSWixlQUFPLGVBREM7QUFFUlMscUJBQ0UsMlFBSE07QUFJUlYsY0FBTSxTQUpFO0FBS1JJLGlCQUFTLElBTEQ7QUFNUkcsZUFBTztBQU5DO0FBakJBLEtBSFI7QUE2QkpBLFdBQU87QUE3Qkg7QUFkTyxDIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBtYXgtbGVuOiBbXCJlcnJvclwiLCB7IFwiaWdub3JlU3RyaW5nc1wiOiB0cnVlIH1dICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YWJhc2U6IHtcbiAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICB0aXRsZTogJ0RhdGFiYXNlJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBsb2NhbFBhdGg6IHtcbiAgICAgICAgdGl0bGU6ICdQYXRoIHRvIGxvY2FsIGRhdGFiYXNlIGZpbGUnLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgZGVmYXVsdDogYXRvbS5nZXRDb25maWdEaXJQYXRoKCksXG4gICAgICAgIG9yZGVyOiAxXG4gICAgICB9XG4gICAgfSxcbiAgICBvcmRlcjogMVxuICB9LFxuICBkb2NrOiB7XG4gICAgdHlwZTogJ29iamVjdCcsXG4gICAgdGl0bGU6ICdEb2NrJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBwb3NpdGlvbjoge1xuICAgICAgICB0aXRsZTogJ1Bvc2l0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdJbiB3aGljaCBkb2NrIHRvIHBvc2l0aW9uIGBwcm9qZWN0LXZpZXdlci1wbHVzYC4nLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgZGVmYXVsdDogJ3JpZ2h0JyxcbiAgICAgICAgZW51bTogWydsZWZ0JywgJ3JpZ2h0J10sXG4gICAgICAgIG9yZGVyOiAxXG4gICAgICB9LFxuICAgICAgaXNWaXNpYmxlOiB7XG4gICAgICAgIHRpdGxlOiAnVmlzaWJsZSBkb2NrJyxcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgJ0lmIHNldCB0byBgdHJ1ZWAsIGl0IHdpbGwgc2hvdyB0aGUgPGVtPmRvY2s8L2VtPiB3aGVyZSBgcHJvamVjdC12aWV3ZXItcGx1c2AgaXMgcGxhY2VkLjxicj48YnI+PHNwYW4gY2xhc3M9XCJwdi1ub3RpY2Utd2FybmluZ1wiPndhcm5pbmc6PC9zcGFuPjxicj5LZWVwIGluIG1pbmQgdGhhdCB0aGlzIG1heS9vciB3aWxsIGltcGFjdCBvdGhlciA8ZW0+aXRlbXM8L2VtPiBvbiB0aGUgcGxhY2VkIDxlbT5kb2NrPC9lbT4uJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICBvcmRlcjogMlxuICAgICAgfSxcbiAgICAgIGlzQWN0aXZlOiB7XG4gICAgICAgIHRpdGxlOiAnQWN0aXZhdGUgZG9jaycsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICdJZiBzZXQgdG8gYHRydWVgLCBpdCB3aWxsIG1ha2UgYHByb2plY3Qtdmlld2VyLXBsdXNgIHRoZSB2aXNpYmxlIDxlbT5pdGVtPC9lbT4gaW4gdGhlIHBsYWNlZCA8ZW0+ZG9jazwvZW0+Ljxicj48YnI+PHNwYW4gY2xhc3M9XCJwdi1ub3RpY2Utd2FybmluZ1wiPndhcm5pbmc6PC9zcGFuPjxicj5JZiA8ZW0+aXRlbTwvZW0+IGlzIHBvc2l0aW9uZWQgaW4gdGhlIGxlZnQgPGVtPmRvY2s8L2VtPiBpdCBtYXkgaGlkZSB0aGUgYHRyZWUtdmlld2AgPGVtPml0ZW08L2VtPi4nLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIG9yZGVyOiAzXG4gICAgICB9XG4gICAgfSxcbiAgICBvcmRlcjogMlxuICB9XG59O1xuIl19