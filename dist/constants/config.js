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
        description: 'In which dock to position `project-viewer-plus`. Only valid for new Atom instances',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb25zdGFudHMvY29uZmlnLmpzIl0sIm5hbWVzIjpbImRhdGFiYXNlIiwidHlwZSIsInRpdGxlIiwicHJvcGVydGllcyIsImxvY2FsUGF0aCIsImRlZmF1bHQiLCJhdG9tIiwiZ2V0Q29uZmlnRGlyUGF0aCIsIm9yZGVyIiwiZG9jayIsInBvc2l0aW9uIiwiZGVzY3JpcHRpb24iLCJlbnVtIiwiaXNWaXNpYmxlIiwiaXNBY3RpdmUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O2tCQUVlO0FBQ2JBLFlBQVU7QUFDUkMsVUFBTSxRQURFO0FBRVJDLFdBQU8sVUFGQztBQUdSQyxnQkFBWTtBQUNWQyxpQkFBVztBQUNURixlQUFPLDZCQURFO0FBRVRELGNBQU0sUUFGRztBQUdUSSxpQkFBU0MsS0FBS0MsZ0JBQUwsRUFIQTtBQUlUQyxlQUFPO0FBSkU7QUFERCxLQUhKO0FBV1JBLFdBQU87QUFYQyxHQURHO0FBY2JDLFFBQU07QUFDSlIsVUFBTSxRQURGO0FBRUpDLFdBQU8sTUFGSDtBQUdKQyxnQkFBWTtBQUNWTyxnQkFBVTtBQUNSUixlQUFPLFVBREM7QUFFUlMscUJBQWEsb0ZBRkw7QUFHUlYsY0FBTSxRQUhFO0FBSVJJLGlCQUFTLE9BSkQ7QUFLUk8sY0FBTSxDQUFDLE1BQUQsRUFBUyxPQUFULENBTEU7QUFNUkosZUFBTztBQU5DLE9BREE7QUFTVkssaUJBQVc7QUFDVFgsZUFBTyxjQURFO0FBRVRTLHFCQUNFLCtPQUhPO0FBSVRWLGNBQU0sU0FKRztBQUtUSSxpQkFBUyxJQUxBO0FBTVRHLGVBQU87QUFORSxPQVREO0FBaUJWTSxnQkFBVTtBQUNSWixlQUFPLGVBREM7QUFFUlMscUJBQ0UsMlFBSE07QUFJUlYsY0FBTSxTQUpFO0FBS1JJLGlCQUFTLElBTEQ7QUFNUkcsZUFBTztBQU5DO0FBakJBLEtBSFI7QUE2QkpBLFdBQU87QUE3Qkg7QUFkTyxDIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBtYXgtbGVuOiBbXCJlcnJvclwiLCB7IFwiaWdub3JlU3RyaW5nc1wiOiB0cnVlIH1dICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YWJhc2U6IHtcbiAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICB0aXRsZTogJ0RhdGFiYXNlJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBsb2NhbFBhdGg6IHtcbiAgICAgICAgdGl0bGU6ICdQYXRoIHRvIGxvY2FsIGRhdGFiYXNlIGZpbGUnLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgZGVmYXVsdDogYXRvbS5nZXRDb25maWdEaXJQYXRoKCksXG4gICAgICAgIG9yZGVyOiAxXG4gICAgICB9XG4gICAgfSxcbiAgICBvcmRlcjogMVxuICB9LFxuICBkb2NrOiB7XG4gICAgdHlwZTogJ29iamVjdCcsXG4gICAgdGl0bGU6ICdEb2NrJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBwb3NpdGlvbjoge1xuICAgICAgICB0aXRsZTogJ1Bvc2l0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdJbiB3aGljaCBkb2NrIHRvIHBvc2l0aW9uIGBwcm9qZWN0LXZpZXdlci1wbHVzYC4gT25seSB2YWxpZCBmb3IgbmV3IEF0b20gaW5zdGFuY2VzJyxcbiAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgIGRlZmF1bHQ6ICdyaWdodCcsXG4gICAgICAgIGVudW06IFsnbGVmdCcsICdyaWdodCddLFxuICAgICAgICBvcmRlcjogMVxuICAgICAgfSxcbiAgICAgIGlzVmlzaWJsZToge1xuICAgICAgICB0aXRsZTogJ1Zpc2libGUgZG9jaycsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICdJZiBzZXQgdG8gYHRydWVgLCBpdCB3aWxsIHNob3cgdGhlIDxlbT5kb2NrPC9lbT4gd2hlcmUgYHByb2plY3Qtdmlld2VyLXBsdXNgIGlzIHBsYWNlZC48YnI+PGJyPjxzcGFuIGNsYXNzPVwicHYtbm90aWNlLXdhcm5pbmdcIj53YXJuaW5nOjwvc3Bhbj48YnI+S2VlcCBpbiBtaW5kIHRoYXQgdGhpcyBtYXkvb3Igd2lsbCBpbXBhY3Qgb3RoZXIgPGVtPml0ZW1zPC9lbT4gb24gdGhlIHBsYWNlZCA8ZW0+ZG9jazwvZW0+LicsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgb3JkZXI6IDJcbiAgICAgIH0sXG4gICAgICBpc0FjdGl2ZToge1xuICAgICAgICB0aXRsZTogJ0FjdGl2YXRlIGRvY2snLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICAnSWYgc2V0IHRvIGB0cnVlYCwgaXQgd2lsbCBtYWtlIGBwcm9qZWN0LXZpZXdlci1wbHVzYCB0aGUgdmlzaWJsZSA8ZW0+aXRlbTwvZW0+IGluIHRoZSBwbGFjZWQgPGVtPmRvY2s8L2VtPi48YnI+PGJyPjxzcGFuIGNsYXNzPVwicHYtbm90aWNlLXdhcm5pbmdcIj53YXJuaW5nOjwvc3Bhbj48YnI+SWYgPGVtPml0ZW08L2VtPiBpcyBwb3NpdGlvbmVkIGluIHRoZSBsZWZ0IDxlbT5kb2NrPC9lbT4gaXQgbWF5IGhpZGUgdGhlIGB0cmVlLXZpZXdgIDxlbT5pdGVtPC9lbT4uJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICBvcmRlcjogM1xuICAgICAgfVxuICAgIH0sXG4gICAgb3JkZXI6IDJcbiAgfVxufTtcbiJdfQ==