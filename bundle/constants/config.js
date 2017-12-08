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
      },
      saveChanges: {
        title: 'Save Changes',
        description: 'If set to `true`, it will save all changes related to the position and visibility of the `project-viewer-plus`\'s <em>item</em> in the placed <em>dock</em>.',
        type: 'boolean',
        default: false,
        order: 4
      }
    },
    order: 2
  },
  packages: {
    title: 'Packages',
    type: 'object',
    properties: {
      treeView: {
        title: 'tree-view',
        description: 'Tick to disable messing with `tree-view` package.',
        type: 'boolean',
        default: false,
        order: 1
      },
      findAndReplace: {
        title: 'find-and-replace',
        description: 'Tick to disable messing with `find-and-replace` package.',
        type: 'boolean',
        default: false,
        order: 2
      },
      statusBar: {
        title: 'status-bar',
        description: 'Tick to disable messing with `status-bar` package.',
        type: 'boolean',
        default: false,
        order: 3
      },
      linter: {
        title: 'linter & linter-ui-default',
        description: 'Tick to disable messing with `linter` and `linter-ui-default` packages.',
        type: 'boolean',
        default: false,
        order: 4
      },
      github: {
        title: 'github',
        description: 'Tick to disable messing with `github` package.',
        type: 'boolean',
        default: false,
        order: 5
      }
    },
    order: 3
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb25zdGFudHMvY29uZmlnLmpzIl0sIm5hbWVzIjpbImRhdGFiYXNlIiwidHlwZSIsInRpdGxlIiwicHJvcGVydGllcyIsImxvY2FsUGF0aCIsImRlZmF1bHQiLCJhdG9tIiwiZ2V0Q29uZmlnRGlyUGF0aCIsIm9yZGVyIiwiZG9jayIsInBvc2l0aW9uIiwiZGVzY3JpcHRpb24iLCJlbnVtIiwiaXNWaXNpYmxlIiwiaXNBY3RpdmUiLCJzYXZlQ2hhbmdlcyIsInBhY2thZ2VzIiwidHJlZVZpZXciLCJmaW5kQW5kUmVwbGFjZSIsInN0YXR1c0JhciIsImxpbnRlciIsImdpdGh1YiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7O2tCQUVlO0FBQ2JBLFlBQVU7QUFDUkMsVUFBTSxRQURFO0FBRVJDLFdBQU8sVUFGQztBQUdSQyxnQkFBWTtBQUNWQyxpQkFBVztBQUNURixlQUFPLDZCQURFO0FBRVRELGNBQU0sUUFGRztBQUdUSSxpQkFBU0MsS0FBS0MsZ0JBQUwsRUFIQTtBQUlUQyxlQUFPO0FBSkU7QUFERCxLQUhKO0FBV1JBLFdBQU87QUFYQyxHQURHO0FBY2JDLFFBQU07QUFDSlIsVUFBTSxRQURGO0FBRUpDLFdBQU8sTUFGSDtBQUdKQyxnQkFBWTtBQUNWTyxnQkFBVTtBQUNSUixlQUFPLFVBREM7QUFFUlMscUJBQWEsa0RBRkw7QUFHUlYsY0FBTSxRQUhFO0FBSVJJLGlCQUFTLE9BSkQ7QUFLUk8sY0FBTSxDQUNKLE1BREksRUFFSixPQUZJLENBTEU7QUFTUkosZUFBTztBQVRDLE9BREE7QUFZVkssaUJBQVc7QUFDVFgsZUFBTyxjQURFO0FBRVRTLHFCQUFhLCtPQUZKO0FBR1RWLGNBQU0sU0FIRztBQUlUSSxpQkFBUyxJQUpBO0FBS1RHLGVBQU87QUFMRSxPQVpEO0FBbUJWTSxnQkFBVTtBQUNSWixlQUFPLGVBREM7QUFFUlMscUJBQWEsMlFBRkw7QUFHUlYsY0FBTSxTQUhFO0FBSVJJLGlCQUFTLElBSkQ7QUFLUkcsZUFBTztBQUxDLE9BbkJBO0FBMEJWTyxtQkFBYTtBQUNYYixlQUFPLGNBREk7QUFFWFMscUJBQWEsOEpBRkY7QUFHWFYsY0FBTSxTQUhLO0FBSVhJLGlCQUFTLEtBSkU7QUFLWEcsZUFBTztBQUxJO0FBMUJILEtBSFI7QUFxQ0pBLFdBQU87QUFyQ0gsR0FkTztBQXFEYlEsWUFBVTtBQUNSZCxXQUFPLFVBREM7QUFFUkQsVUFBTSxRQUZFO0FBR1JFLGdCQUFZO0FBQ1ZjLGdCQUFVO0FBQ1JmLGVBQU8sV0FEQztBQUVSUyxxQkFBYSxtREFGTDtBQUdSVixjQUFNLFNBSEU7QUFJUkksaUJBQVMsS0FKRDtBQUtSRyxlQUFPO0FBTEMsT0FEQTtBQVFWVSxzQkFBZ0I7QUFDZGhCLGVBQU8sa0JBRE87QUFFZFMscUJBQWEsMERBRkM7QUFHZFYsY0FBTSxTQUhRO0FBSWRJLGlCQUFTLEtBSks7QUFLZEcsZUFBTztBQUxPLE9BUk47QUFlVlcsaUJBQVc7QUFDVGpCLGVBQU8sWUFERTtBQUVUUyxxQkFBYSxvREFGSjtBQUdUVixjQUFNLFNBSEc7QUFJVEksaUJBQVMsS0FKQTtBQUtURyxlQUFPO0FBTEUsT0FmRDtBQXNCVlksY0FBUTtBQUNObEIsZUFBTyw0QkFERDtBQUVOUyxxQkFBYSx5RUFGUDtBQUdOVixjQUFNLFNBSEE7QUFJTkksaUJBQVMsS0FKSDtBQUtORyxlQUFPO0FBTEQsT0F0QkU7QUE2QlZhLGNBQVE7QUFDTm5CLGVBQU8sUUFERDtBQUVOUyxxQkFBYSxnREFGUDtBQUdOVixjQUFNLFNBSEE7QUFJTkksaUJBQVMsS0FKSDtBQUtORyxlQUFPO0FBTEQ7QUE3QkUsS0FISjtBQXdDUkEsV0FBTztBQXhDQztBQXJERyxDIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBtYXgtbGVuOiBbXCJlcnJvclwiLCB7IFwiaWdub3JlU3RyaW5nc1wiOiB0cnVlIH1dICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YWJhc2U6IHtcbiAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICB0aXRsZTogJ0RhdGFiYXNlJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBsb2NhbFBhdGg6IHtcbiAgICAgICAgdGl0bGU6ICdQYXRoIHRvIGxvY2FsIGRhdGFiYXNlIGZpbGUnLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgZGVmYXVsdDogYXRvbS5nZXRDb25maWdEaXJQYXRoKCksXG4gICAgICAgIG9yZGVyOiAxXG4gICAgICB9XG4gICAgfSxcbiAgICBvcmRlcjogMVxuICB9LFxuICBkb2NrOiB7XG4gICAgdHlwZTogJ29iamVjdCcsXG4gICAgdGl0bGU6ICdEb2NrJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBwb3NpdGlvbjoge1xuICAgICAgICB0aXRsZTogJ1Bvc2l0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdJbiB3aGljaCBkb2NrIHRvIHBvc2l0aW9uIGBwcm9qZWN0LXZpZXdlci1wbHVzYC4nLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgZGVmYXVsdDogJ3JpZ2h0JyxcbiAgICAgICAgZW51bTogW1xuICAgICAgICAgICdsZWZ0JyxcbiAgICAgICAgICAncmlnaHQnXG4gICAgICAgIF0sXG4gICAgICAgIG9yZGVyOiAxXG4gICAgICB9LFxuICAgICAgaXNWaXNpYmxlOiB7XG4gICAgICAgIHRpdGxlOiAnVmlzaWJsZSBkb2NrJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdJZiBzZXQgdG8gYHRydWVgLCBpdCB3aWxsIHNob3cgdGhlIDxlbT5kb2NrPC9lbT4gd2hlcmUgYHByb2plY3Qtdmlld2VyLXBsdXNgIGlzIHBsYWNlZC48YnI+PGJyPjxzcGFuIGNsYXNzPVwicHYtbm90aWNlLXdhcm5pbmdcIj53YXJuaW5nOjwvc3Bhbj48YnI+S2VlcCBpbiBtaW5kIHRoYXQgdGhpcyBtYXkvb3Igd2lsbCBpbXBhY3Qgb3RoZXIgPGVtPml0ZW1zPC9lbT4gb24gdGhlIHBsYWNlZCA8ZW0+ZG9jazwvZW0+LicsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgb3JkZXI6IDJcbiAgICAgIH0sXG4gICAgICBpc0FjdGl2ZToge1xuICAgICAgICB0aXRsZTogJ0FjdGl2YXRlIGRvY2snLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0lmIHNldCB0byBgdHJ1ZWAsIGl0IHdpbGwgbWFrZSBgcHJvamVjdC12aWV3ZXItcGx1c2AgdGhlIHZpc2libGUgPGVtPml0ZW08L2VtPiBpbiB0aGUgcGxhY2VkIDxlbT5kb2NrPC9lbT4uPGJyPjxicj48c3BhbiBjbGFzcz1cInB2LW5vdGljZS13YXJuaW5nXCI+d2FybmluZzo8L3NwYW4+PGJyPklmIDxlbT5pdGVtPC9lbT4gaXMgcG9zaXRpb25lZCBpbiB0aGUgbGVmdCA8ZW0+ZG9jazwvZW0+IGl0IG1heSBoaWRlIHRoZSBgdHJlZS12aWV3YCA8ZW0+aXRlbTwvZW0+LicsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgb3JkZXI6IDNcbiAgICAgIH0sXG4gICAgICBzYXZlQ2hhbmdlczoge1xuICAgICAgICB0aXRsZTogJ1NhdmUgQ2hhbmdlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnSWYgc2V0IHRvIGB0cnVlYCwgaXQgd2lsbCBzYXZlIGFsbCBjaGFuZ2VzIHJlbGF0ZWQgdG8gdGhlIHBvc2l0aW9uIGFuZCB2aXNpYmlsaXR5IG9mIHRoZSBgcHJvamVjdC12aWV3ZXItcGx1c2BcXCdzIDxlbT5pdGVtPC9lbT4gaW4gdGhlIHBsYWNlZCA8ZW0+ZG9jazwvZW0+LicsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIG9yZGVyOiA0XG4gICAgICB9XG4gICAgfSxcbiAgICBvcmRlcjogMlxuICB9LFxuICBwYWNrYWdlczoge1xuICAgIHRpdGxlOiAnUGFja2FnZXMnLFxuICAgIHR5cGU6ICdvYmplY3QnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHRyZWVWaWV3OiB7XG4gICAgICAgIHRpdGxlOiAndHJlZS12aWV3JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdUaWNrIHRvIGRpc2FibGUgbWVzc2luZyB3aXRoIGB0cmVlLXZpZXdgIHBhY2thZ2UuJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgb3JkZXI6IDFcbiAgICAgIH0sXG4gICAgICBmaW5kQW5kUmVwbGFjZToge1xuICAgICAgICB0aXRsZTogJ2ZpbmQtYW5kLXJlcGxhY2UnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RpY2sgdG8gZGlzYWJsZSBtZXNzaW5nIHdpdGggYGZpbmQtYW5kLXJlcGxhY2VgIHBhY2thZ2UuJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgb3JkZXI6IDJcbiAgICAgIH0sXG4gICAgICBzdGF0dXNCYXI6IHtcbiAgICAgICAgdGl0bGU6ICdzdGF0dXMtYmFyJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdUaWNrIHRvIGRpc2FibGUgbWVzc2luZyB3aXRoIGBzdGF0dXMtYmFyYCBwYWNrYWdlLicsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIG9yZGVyOiAzXG4gICAgICB9LFxuICAgICAgbGludGVyOiB7XG4gICAgICAgIHRpdGxlOiAnbGludGVyICYgbGludGVyLXVpLWRlZmF1bHQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RpY2sgdG8gZGlzYWJsZSBtZXNzaW5nIHdpdGggYGxpbnRlcmAgYW5kIGBsaW50ZXItdWktZGVmYXVsdGAgcGFja2FnZXMuJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgb3JkZXI6IDRcbiAgICAgIH0sXG4gICAgICBnaXRodWI6IHtcbiAgICAgICAgdGl0bGU6ICdnaXRodWInLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RpY2sgdG8gZGlzYWJsZSBtZXNzaW5nIHdpdGggYGdpdGh1YmAgcGFja2FnZS4nLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICBvcmRlcjogNVxuICAgICAgfVxuICAgIH0sXG4gICAgb3JkZXI6IDNcbiAgfVxufTtcbiJdfQ==