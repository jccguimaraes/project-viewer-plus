"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _atom = require("atom");

var _etch = _interopRequireDefault(require("etch"));

var _icons = _interopRequireDefault(require("./icons"));

var _editor = require("../components/editor");

var _confirmDelete = _interopRequireDefault(require("../components/confirm-delete"));

var _state = _interopRequireDefault(require("../services/state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx etch.dom */

/* eslint-disable-next-line require-jsdoc */
class EditorContainer {
  /* eslint-disable-next-line require-jsdoc */
  handleChangeAction(action) {
    if (action === 'delete') {
      const item = new _confirmDelete.default(this.id);
      const modal = atom.workspace.addModalPanel({
        item
      });
      modal.onDidDestroy(() => !_state.default.getEntry(this.id) && atom.workspace.getActivePane().destroyActiveItem());
      return;
    } else if (!this.id && action === 'save') {
      _state.default.addEntry(this.newEntry);
    } else if (action === 'save') {
      _state.default.editEntry(this.id, this.newEntry);
    }

    atom.workspace.getActivePane().destroyActiveItem();
  }
  /* eslint-disable-next-line require-jsdoc */


  handleChangeParent(parentId) {
    this.parentId = parentId;
    this.newEntry.parentId = parentId;
    this.update(this.newEntry);
  }
  /* eslint-disable-next-line require-jsdoc */


  handleChangeName(name) {
    this.update({ ...this.newEntry,
      name
    });
  }
  /* eslint-disable-next-line require-jsdoc */


  handleChangeType(type) {
    let createdEntry;

    switch (type) {
      case 'group':
        createdEntry = _state.default.createGroup();
        break;

      default:
        createdEntry = _state.default.createProject();
    }

    this.update(createdEntry);
  }
  /* eslint-disable-next-line require-jsdoc */


  handleChangeIcon(icon) {
    this.update({ ...this.newEntry,
      icon
    });
  }
  /* eslint-disable-next-line require-jsdoc */


  handleAddPaths(paths) {
    paths.forEach(path => {
      if (this.newEntry.paths.indexOf(path) === -1) {
        this.newEntry.paths.push(path);
      }
    });
    this.update(this.newEntry);
  }
  /* eslint-disable-next-line require-jsdoc */


  handleRemovePath(path) {
    const id = this.newEntry.paths.indexOf(path);

    if (id !== -1) {
      this.newEntry.paths.splice(id, 1);
    }

    this.update(this.newEntry);
  }
  /* eslint-disable-next-line require-jsdoc */


  getURI() {
    return 'project-viewer-plus-editor';
  }
  /* eslint-disable-next-line require-jsdoc */


  getTitle() {
    return 'PVP - Editor';
  }
  /* eslint-disable-next-line require-jsdoc */


  constructor(id, parentId) {
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();
    this.actions = [];
    this.id = id;

    const entry = _state.default.getEntry(id);

    this.parentId = entry && entry.parentId || parentId || NaN;

    if (entry) {
      this.actions = ['delete'];
      this.entry = { ...entry
      };
      this.newEntry = { ...entry
      };
    }

    _etch.default.initialize(this);
  }
  /* eslint-disable-next-line require-jsdoc */


  async update(props) {
    this.actions = [];

    if (this.id) {
      this.actions.push('delete');
    }

    if (JSON.stringify(this.entry) === JSON.stringify(props)) {
      const id = this.actions.indexOf('save');
      id !== -1 && this.actions.splice(id, 1);
    } else {
      this.actions.push('save');
    }

    this.newEntry = props;

    if (this.parentId) {
      this.newEntry.parentId = this.parentId;
    }

    return _etch.default.update(this);
  }
  /* eslint-disable-next-line require-jsdoc */


  async destroy() {
    delete this.id;
    delete this.entry;
    delete this.newEntry;
    this.emitter.clear();
    this.emitter.dispose();
    this.disposables.dispose();
    await _etch.default.destroy(this);
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    const blocks = [];
    const entry = this.newEntry || this.entry;

    if (!entry) {
      blocks.push(_etch.default.dom(_editor.EditorType, {
        onDidChange: type => this.handleChangeType(type)
      }, _etch.default.dom("h2", null, "Type")));
    } else {
      blocks.push(_etch.default.dom(_editor.EditorName, {
        entry: entry,
        onDidChange: value => this.handleChangeName(value)
      }, _etch.default.dom("h2", null, "Name")), _etch.default.dom(_icons.default, {
        entry: entry,
        onDidChange: icon => this.handleChangeIcon(icon)
      }, _etch.default.dom("h2", null, "Icons")));
    }

    if (entry && entry.type === 'project') {
      blocks.push(_etch.default.dom(_editor.EditorPaths, {
        entry: entry,
        onDidAddPaths: paths => this.handleAddPaths(paths),
        onDidRemovePath: path => this.handleRemovePath(path)
      }, _etch.default.dom("h2", null, "Paths")));
    } else if (this.entry && entry.type === 'group') {
      blocks.push(_etch.default.dom(_editor.EditorOrder, null, _etch.default.dom("h2", null, "Order")));
    }

    if (entry) {
      blocks.push(_etch.default.dom(_editor.EditorGroups, {
        groups: _state.default.getGroupsInGroup(),
        selectedId: this.parentId,
        onDidClick: parentId => this.handleChangeParent(parentId)
      }, _etch.default.dom("h2", null, "Add to Group")));
    }

    return _etch.default.dom("div", {
      className: "project-viewer-plus-editor pane-item native-key-bindings"
    }, _etch.default.dom(_editor.EditorOptions, {
      allowedActions: this.actions,
      onDidClick: action => this.handleChangeAction(action)
    }), blocks.map(block => block));
  }

}

exports.default = EditorContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJoYW5kbGVDaGFuZ2VBY3Rpb24iLCJhY3Rpb24iLCJpdGVtIiwiQ29uZmlybURlbGV0ZSIsImlkIiwibW9kYWwiLCJhdG9tIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsIm9uRGlkRGVzdHJveSIsInN0YXRlIiwiZ2V0RW50cnkiLCJnZXRBY3RpdmVQYW5lIiwiZGVzdHJveUFjdGl2ZUl0ZW0iLCJhZGRFbnRyeSIsIm5ld0VudHJ5IiwiZWRpdEVudHJ5IiwiaGFuZGxlQ2hhbmdlUGFyZW50IiwicGFyZW50SWQiLCJ1cGRhdGUiLCJoYW5kbGVDaGFuZ2VOYW1lIiwibmFtZSIsImhhbmRsZUNoYW5nZVR5cGUiLCJ0eXBlIiwiY3JlYXRlZEVudHJ5IiwiY3JlYXRlR3JvdXAiLCJjcmVhdGVQcm9qZWN0IiwiaGFuZGxlQ2hhbmdlSWNvbiIsImljb24iLCJoYW5kbGVBZGRQYXRocyIsInBhdGhzIiwiZm9yRWFjaCIsInBhdGgiLCJpbmRleE9mIiwicHVzaCIsImhhbmRsZVJlbW92ZVBhdGgiLCJzcGxpY2UiLCJnZXRVUkkiLCJnZXRUaXRsZSIsImNvbnN0cnVjdG9yIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJhY3Rpb25zIiwiZW50cnkiLCJOYU4iLCJldGNoIiwiaW5pdGlhbGl6ZSIsInByb3BzIiwiSlNPTiIsInN0cmluZ2lmeSIsImRlc3Ryb3kiLCJjbGVhciIsImRpc3Bvc2UiLCJyZW5kZXIiLCJibG9ja3MiLCJ2YWx1ZSIsImdldEdyb3Vwc0luR3JvdXAiLCJtYXAiLCJibG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQVFBOztBQUNBOzs7O0FBZkE7O0FBaUJBO0FBQ2UsTUFBTUEsZUFBTixDQUFzQjtBQUNuQztBQUNBQyxFQUFBQSxr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RixFQU1HdUQsTUFBTSxDQUFDRyxHQUFQLENBQVdDLEtBQUssSUFBSUEsS0FBcEIsQ0FOSCxDQURGO0FBVUQ7O0FBeE5rQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG5pbXBvcnQgSWNvbnMgZnJvbSAnLi9pY29ucyc7XG5pbXBvcnQge1xuICBFZGl0b3JUeXBlLFxuICBFZGl0b3JPcmRlcixcbiAgRWRpdG9yT3B0aW9ucyxcbiAgRWRpdG9yTmFtZSxcbiAgRWRpdG9yUGF0aHMsXG4gIEVkaXRvckdyb3Vwc1xufSBmcm9tICcuLi9jb21wb25lbnRzL2VkaXRvcic7XG5pbXBvcnQgQ29uZmlybURlbGV0ZSBmcm9tICcuLi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JDb250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VBY3Rpb24gKGFjdGlvbikge1xuICAgIGlmIChhY3Rpb24gPT09ICdkZWxldGUnKSB7XG4gICAgICBjb25zdCBpdGVtID0gbmV3IENvbmZpcm1EZWxldGUodGhpcy5pZCk7XG4gICAgICBjb25zdCBtb2RhbCA9IGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoeyBpdGVtIH0pO1xuXG4gICAgICBtb2RhbC5vbkRpZERlc3Ryb3koXG4gICAgICAgICgpID0+XG4gICAgICAgICAgIXN0YXRlLmdldEVudHJ5KHRoaXMuaWQpICYmXG4gICAgICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZSgpLmRlc3Ryb3lBY3RpdmVJdGVtKClcbiAgICAgICk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSBpZiAoIXRoaXMuaWQgJiYgYWN0aW9uID09PSAnc2F2ZScpIHtcbiAgICAgIHN0YXRlLmFkZEVudHJ5KHRoaXMubmV3RW50cnkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChhY3Rpb24gPT09ICdzYXZlJykge1xuICAgICAgc3RhdGUuZWRpdEVudHJ5KHRoaXMuaWQsIHRoaXMubmV3RW50cnkpO1xuICAgIH1cblxuICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKS5kZXN0cm95QWN0aXZlSXRlbSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlUGFyZW50IChwYXJlbnRJZCkge1xuICAgIHRoaXMucGFyZW50SWQgPSBwYXJlbnRJZDtcbiAgICB0aGlzLm5ld0VudHJ5LnBhcmVudElkID0gcGFyZW50SWQ7XG4gICAgdGhpcy51cGRhdGUodGhpcy5uZXdFbnRyeSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VOYW1lIChuYW1lKSB7XG4gICAgdGhpcy51cGRhdGUoe1xuICAgICAgLi4udGhpcy5uZXdFbnRyeSxcbiAgICAgIG5hbWVcbiAgICB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZVR5cGUgKHR5cGUpIHtcbiAgICBsZXQgY3JlYXRlZEVudHJ5O1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdncm91cCc6XG4gICAgICAgIGNyZWF0ZWRFbnRyeSA9IHN0YXRlLmNyZWF0ZUdyb3VwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY3JlYXRlZEVudHJ5ID0gc3RhdGUuY3JlYXRlUHJvamVjdCgpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlKGNyZWF0ZWRFbnRyeSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VJY29uIChpY29uKSB7XG4gICAgdGhpcy51cGRhdGUoe1xuICAgICAgLi4udGhpcy5uZXdFbnRyeSxcbiAgICAgIGljb25cbiAgICB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUFkZFBhdGhzIChwYXRocykge1xuICAgIHBhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICBpZiAodGhpcy5uZXdFbnRyeS5wYXRocy5pbmRleE9mKHBhdGgpID09PSAtMSkge1xuICAgICAgICB0aGlzLm5ld0VudHJ5LnBhdGhzLnB1c2gocGF0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGUodGhpcy5uZXdFbnRyeSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVSZW1vdmVQYXRoIChwYXRoKSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLm5ld0VudHJ5LnBhdGhzLmluZGV4T2YocGF0aCk7XG5cbiAgICBpZiAoaWQgIT09IC0xKSB7XG4gICAgICB0aGlzLm5ld0VudHJ5LnBhdGhzLnNwbGljZShpZCwgMSk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGUodGhpcy5uZXdFbnRyeSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiAncHJvamVjdC12aWV3ZXItcGx1cy1lZGl0b3InO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VGl0bGUgKCkge1xuICAgIHJldHVybiAnUFZQIC0gRWRpdG9yJztcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChpZCwgcGFyZW50SWQpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgdGhpcy5hY3Rpb25zID0gW107XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIGNvbnN0IGVudHJ5ID0gc3RhdGUuZ2V0RW50cnkoaWQpO1xuICAgIHRoaXMucGFyZW50SWQgPSAoZW50cnkgJiYgZW50cnkucGFyZW50SWQpIHx8IHBhcmVudElkIHx8IE5hTjtcblxuICAgIGlmIChlbnRyeSkge1xuICAgICAgdGhpcy5hY3Rpb25zID0gWydkZWxldGUnXTtcbiAgICAgIHRoaXMuZW50cnkgPSB7IC4uLmVudHJ5IH07XG4gICAgICB0aGlzLm5ld0VudHJ5ID0geyAuLi5lbnRyeSB9O1xuICAgIH1cblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLmFjdGlvbnMgPSBbXTtcblxuICAgIGlmICh0aGlzLmlkKSB7XG4gICAgICB0aGlzLmFjdGlvbnMucHVzaCgnZGVsZXRlJyk7XG4gICAgfVxuXG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHRoaXMuZW50cnkpID09PSBKU09OLnN0cmluZ2lmeShwcm9wcykpIHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5hY3Rpb25zLmluZGV4T2YoJ3NhdmUnKTtcbiAgICAgIGlkICE9PSAtMSAmJiB0aGlzLmFjdGlvbnMuc3BsaWNlKGlkLCAxKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmFjdGlvbnMucHVzaCgnc2F2ZScpO1xuICAgIH1cblxuICAgIHRoaXMubmV3RW50cnkgPSBwcm9wcztcblxuICAgIGlmICh0aGlzLnBhcmVudElkKSB7XG4gICAgICB0aGlzLm5ld0VudHJ5LnBhcmVudElkID0gdGhpcy5wYXJlbnRJZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBkZWxldGUgdGhpcy5pZDtcbiAgICBkZWxldGUgdGhpcy5lbnRyeTtcbiAgICBkZWxldGUgdGhpcy5uZXdFbnRyeTtcbiAgICB0aGlzLmVtaXR0ZXIuY2xlYXIoKTtcbiAgICB0aGlzLmVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgYmxvY2tzID0gW107XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm5ld0VudHJ5IHx8IHRoaXMuZW50cnk7XG5cbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvclR5cGUgb25EaWRDaGFuZ2U9e3R5cGUgPT4gdGhpcy5oYW5kbGVDaGFuZ2VUeXBlKHR5cGUpfT5cbiAgICAgICAgICA8aDI+VHlwZTwvaDI+XG4gICAgICAgIDwvRWRpdG9yVHlwZT5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JOYW1lXG4gICAgICAgICAgZW50cnk9e2VudHJ5fVxuICAgICAgICAgIG9uRGlkQ2hhbmdlPXt2YWx1ZSA9PiB0aGlzLmhhbmRsZUNoYW5nZU5hbWUodmFsdWUpfVxuICAgICAgICA+XG4gICAgICAgICAgPGgyPk5hbWU8L2gyPlxuICAgICAgICA8L0VkaXRvck5hbWU+LFxuICAgICAgICA8SWNvbnMgZW50cnk9e2VudHJ5fSBvbkRpZENoYW5nZT17aWNvbiA9PiB0aGlzLmhhbmRsZUNoYW5nZUljb24oaWNvbil9PlxuICAgICAgICAgIDxoMj5JY29uczwvaDI+XG4gICAgICAgIDwvSWNvbnM+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgIGJsb2Nrcy5wdXNoKFxuICAgICAgICA8RWRpdG9yUGF0aHNcbiAgICAgICAgICBlbnRyeT17ZW50cnl9XG4gICAgICAgICAgb25EaWRBZGRQYXRocz17cGF0aHMgPT4gdGhpcy5oYW5kbGVBZGRQYXRocyhwYXRocyl9XG4gICAgICAgICAgb25EaWRSZW1vdmVQYXRoPXtwYXRoID0+IHRoaXMuaGFuZGxlUmVtb3ZlUGF0aChwYXRoKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxoMj5QYXRoczwvaDI+XG4gICAgICAgIDwvRWRpdG9yUGF0aHM+XG4gICAgICApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmVudHJ5ICYmIGVudHJ5LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgIGJsb2Nrcy5wdXNoKFxuICAgICAgICA8RWRpdG9yT3JkZXI+XG4gICAgICAgICAgPGgyPk9yZGVyPC9oMj5cbiAgICAgICAgPC9FZGl0b3JPcmRlcj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGVudHJ5KSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvckdyb3Vwc1xuICAgICAgICAgIGdyb3Vwcz17c3RhdGUuZ2V0R3JvdXBzSW5Hcm91cCgpfVxuICAgICAgICAgIHNlbGVjdGVkSWQ9e3RoaXMucGFyZW50SWR9XG4gICAgICAgICAgb25EaWRDbGljaz17cGFyZW50SWQgPT4gdGhpcy5oYW5kbGVDaGFuZ2VQYXJlbnQocGFyZW50SWQpfVxuICAgICAgICA+XG4gICAgICAgICAgPGgyPkFkZCB0byBHcm91cDwvaDI+XG4gICAgICAgIDwvRWRpdG9yR3JvdXBzPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvciBwYW5lLWl0ZW0gbmF0aXZlLWtleS1iaW5kaW5nc1wiPlxuICAgICAgICA8RWRpdG9yT3B0aW9uc1xuICAgICAgICAgIGFsbG93ZWRBY3Rpb25zPXt0aGlzLmFjdGlvbnN9XG4gICAgICAgICAgb25EaWRDbGljaz17YWN0aW9uID0+IHRoaXMuaGFuZGxlQ2hhbmdlQWN0aW9uKGFjdGlvbil9XG4gICAgICAgIC8+XG5cbiAgICAgICAge2Jsb2Nrcy5tYXAoYmxvY2sgPT4gYmxvY2spfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19