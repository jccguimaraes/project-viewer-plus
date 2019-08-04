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
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb25zdGFudHMvY29uZmlnLmpzIl0sIm5hbWVzIjpbImRhdGFiYXNlIiwidHlwZSIsInRpdGxlIiwicHJvcGVydGllcyIsImxvY2FsUGF0aCIsImRlZmF1bHQiLCJhdG9tIiwiZ2V0Q29uZmlnRGlyUGF0aCIsIm9yZGVyIiwiZG9jayIsInBvc2l0aW9uIiwiZGVzY3JpcHRpb24iLCJlbnVtIiwiaXNWaXNpYmxlIiwiaXNBY3RpdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtlQUVlO0FBQ2JBLEVBQUFBLFFBQVEsRUFBRTtBQUNSQyxJQUFBQSxJQUFJLEVBQUUsUUFERTtBQUVSQyxJQUFBQSxLQUFLLEVBQUUsVUFGQztBQUdSQyxJQUFBQSxVQUFVLEVBQUU7QUFDVkMsTUFBQUEsU0FBUyxFQUFFO0FBQ1RGLFFBQUFBLEtBQUssRUFBRSw2QkFERTtBQUVURCxRQUFBQSxJQUFJLEVBQUUsUUFGRztBQUdUSSxRQUFBQSxPQUFPLEVBQUVDLElBQUksQ0FBQ0MsZ0JBQUwsRUFIQTtBQUlUQyxRQUFBQSxLQUFLLEVBQUU7QUFKRTtBQURELEtBSEo7QUFXUkEsSUFBQUEsS0FBSyxFQUFFO0FBWEMsR0FERztBQWNiQyxFQUFBQSxJQUFJLEVBQUU7QUFDSlIsSUFBQUEsSUFBSSxFQUFFLFFBREY7QUFFSkMsSUFBQUEsS0FBSyxFQUFFLE1BRkg7QUFHSkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1ZPLE1BQUFBLFFBQVEsRUFBRTtBQUNSUixRQUFBQSxLQUFLLEVBQUUsVUFEQztBQUVSUyxRQUFBQSxXQUFXLEVBQUUsb0ZBRkw7QUFHUlYsUUFBQUEsSUFBSSxFQUFFLFFBSEU7QUFJUkksUUFBQUEsT0FBTyxFQUFFLE9BSkQ7QUFLUk8sUUFBQUEsSUFBSSxFQUFFLENBQUMsTUFBRCxFQUFTLE9BQVQsQ0FMRTtBQU1SSixRQUFBQSxLQUFLLEVBQUU7QUFOQyxPQURBO0FBU1ZLLE1BQUFBLFNBQVMsRUFBRTtBQUNUWCxRQUFBQSxLQUFLLEVBQUUsY0FERTtBQUVUUyxRQUFBQSxXQUFXLEVBQ1QsK09BSE87QUFJVFYsUUFBQUEsSUFBSSxFQUFFLFNBSkc7QUFLVEksUUFBQUEsT0FBTyxFQUFFLElBTEE7QUFNVEcsUUFBQUEsS0FBSyxFQUFFO0FBTkUsT0FURDtBQWlCVk0sTUFBQUEsUUFBUSxFQUFFO0FBQ1JaLFFBQUFBLEtBQUssRUFBRSxlQURDO0FBRVJTLFFBQUFBLFdBQVcsRUFDVCwyUUFITTtBQUlSVixRQUFBQSxJQUFJLEVBQUUsU0FKRTtBQUtSSSxRQUFBQSxPQUFPLEVBQUUsSUFMRDtBQU1SRyxRQUFBQSxLQUFLLEVBQUU7QUFOQztBQWpCQSxLQUhSO0FBNkJKQSxJQUFBQSxLQUFLLEVBQUU7QUE3Qkg7QUFkTyxDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IG1heC1sZW46IFtcImVycm9yXCIsIHsgXCJpZ25vcmVTdHJpbmdzXCI6IHRydWUgfV0gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhYmFzZToge1xuICAgIHR5cGU6ICdvYmplY3QnLFxuICAgIHRpdGxlOiAnRGF0YWJhc2UnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGxvY2FsUGF0aDoge1xuICAgICAgICB0aXRsZTogJ1BhdGggdG8gbG9jYWwgZGF0YWJhc2UgZmlsZScsXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBkZWZhdWx0OiBhdG9tLmdldENvbmZpZ0RpclBhdGgoKSxcbiAgICAgICAgb3JkZXI6IDFcbiAgICAgIH1cbiAgICB9LFxuICAgIG9yZGVyOiAxXG4gIH0sXG4gIGRvY2s6IHtcbiAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICB0aXRsZTogJ0RvY2snLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHRpdGxlOiAnUG9zaXRpb24nLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0luIHdoaWNoIGRvY2sgdG8gcG9zaXRpb24gYHByb2plY3Qtdmlld2VyLXBsdXNgLiBPbmx5IHZhbGlkIGZvciBuZXcgQXRvbSBpbnN0YW5jZXMnLFxuICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgZGVmYXVsdDogJ3JpZ2h0JyxcbiAgICAgICAgZW51bTogWydsZWZ0JywgJ3JpZ2h0J10sXG4gICAgICAgIG9yZGVyOiAxXG4gICAgICB9LFxuICAgICAgaXNWaXNpYmxlOiB7XG4gICAgICAgIHRpdGxlOiAnVmlzaWJsZSBkb2NrJyxcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgJ0lmIHNldCB0byBgdHJ1ZWAsIGl0IHdpbGwgc2hvdyB0aGUgPGVtPmRvY2s8L2VtPiB3aGVyZSBgcHJvamVjdC12aWV3ZXItcGx1c2AgaXMgcGxhY2VkLjxicj48YnI+PHNwYW4gY2xhc3M9XCJwdi1ub3RpY2Utd2FybmluZ1wiPndhcm5pbmc6PC9zcGFuPjxicj5LZWVwIGluIG1pbmQgdGhhdCB0aGlzIG1heS9vciB3aWxsIGltcGFjdCBvdGhlciA8ZW0+aXRlbXM8L2VtPiBvbiB0aGUgcGxhY2VkIDxlbT5kb2NrPC9lbT4uJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICBvcmRlcjogMlxuICAgICAgfSxcbiAgICAgIGlzQWN0aXZlOiB7XG4gICAgICAgIHRpdGxlOiAnQWN0aXZhdGUgZG9jaycsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICdJZiBzZXQgdG8gYHRydWVgLCBpdCB3aWxsIG1ha2UgYHByb2plY3Qtdmlld2VyLXBsdXNgIHRoZSB2aXNpYmxlIDxlbT5pdGVtPC9lbT4gaW4gdGhlIHBsYWNlZCA8ZW0+ZG9jazwvZW0+Ljxicj48YnI+PHNwYW4gY2xhc3M9XCJwdi1ub3RpY2Utd2FybmluZ1wiPndhcm5pbmc6PC9zcGFuPjxicj5JZiA8ZW0+aXRlbTwvZW0+IGlzIHBvc2l0aW9uZWQgaW4gdGhlIGxlZnQgPGVtPmRvY2s8L2VtPiBpdCBtYXkgaGlkZSB0aGUgYHRyZWUtdmlld2AgPGVtPml0ZW08L2VtPi4nLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIG9yZGVyOiAzXG4gICAgICB9XG4gICAgfSxcbiAgICBvcmRlcjogMlxuICB9XG59O1xuIl19