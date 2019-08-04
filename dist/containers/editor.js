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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable-next-line require-jsdoc */
class EditorContainer {
  /* eslint-disable-next-line require-jsdoc */
  handleChangeAction(action) {
    console.log(action, this.entry);

    if (action === 'delete') {
      var item = new _confirmDelete.default(this.id);
      var modal = atom.workspace.addModalPanel({
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


  handleChangeParent(parentId) {}
  /* eslint-disable-next-line require-jsdoc */


  handleChangeName(name) {
    this.update(_objectSpread({}, this.newEntry, {
      name
    }));
  }
  /* eslint-disable-next-line require-jsdoc */


  handleChangeType(type) {
    var createdEntry;

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
    this.update(_objectSpread({}, this.newEntry, {
      icon
    }));
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
    var id = this.newEntry.paths.indexOf(path);

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
    console.log('created editor', id, parentId);
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();
    this.actions = [];
    this.id = id;

    var entry = _state.default.getEntry(id);

    var parentEntry = _state.default.getEntry(parentId);

    if (entry) {
      this.actions = ['delete'];
      this.entry = _objectSpread({}, entry);
      this.newEntry = _objectSpread({}, entry);
    }

    if (parentEntry) {
      this.parentId = parentId;
    }

    console.log('editor', id, this.entry);

    _etch.default.initialize(this);
  }
  /* eslint-disable-next-line require-jsdoc */


  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.actions = [];

      if (_this.id) {
        _this.actions.push('delete');
      }

      if (JSON.stringify(_this.entry) === JSON.stringify(props)) {
        var id = _this.actions.indexOf('save');

        id !== -1 && _this.actions.splice(id, 1);
      } else {
        _this.actions.push('save');
      }

      _this.newEntry = props;

      if (_this.parentId) {
        _this.newEntry.parentId = _this.parentId;
      }

      return _etch.default.update(_this);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      delete _this2.id;
      delete _this2.entry;
      delete _this2.newEntry;

      _this2.emitter.clear();

      _this2.emitter.dispose();

      _this2.disposables.dispose();

      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    var blocks = [];
    var entry = this.newEntry || this.entry;

    if (!entry && this.parentId !== undefined) {
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
        groups: _state.default.getGroupsInGroup()
      }, _etch.default.dom("h2", null, "Groups")));
    }

    return _etch.default.dom("div", {
      className: "project-viewer-plus-editor pane-item native-key-bindings"
    }, _etch.default.dom(_editor.EditorOptions, {
      allowedActions: this.actions,
      ondidClick: action => this.handleChangeAction(action)
    }), blocks.map(block => block));
  }

}

exports.default = EditorContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJoYW5kbGVDaGFuZ2VBY3Rpb24iLCJhY3Rpb24iLCJjb25zb2xlIiwibG9nIiwiZW50cnkiLCJpdGVtIiwiQ29uZmlybURlbGV0ZSIsImlkIiwibW9kYWwiLCJhdG9tIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsIm9uRGlkRGVzdHJveSIsInN0YXRlIiwiZ2V0RW50cnkiLCJnZXRBY3RpdmVQYW5lIiwiZGVzdHJveUFjdGl2ZUl0ZW0iLCJhZGRFbnRyeSIsIm5ld0VudHJ5IiwiZWRpdEVudHJ5IiwiaGFuZGxlQ2hhbmdlUGFyZW50IiwicGFyZW50SWQiLCJoYW5kbGVDaGFuZ2VOYW1lIiwibmFtZSIsInVwZGF0ZSIsImhhbmRsZUNoYW5nZVR5cGUiLCJ0eXBlIiwiY3JlYXRlZEVudHJ5IiwiY3JlYXRlR3JvdXAiLCJjcmVhdGVQcm9qZWN0IiwiaGFuZGxlQ2hhbmdlSWNvbiIsImljb24iLCJoYW5kbGVBZGRQYXRocyIsInBhdGhzIiwiZm9yRWFjaCIsInBhdGgiLCJpbmRleE9mIiwicHVzaCIsImhhbmRsZVJlbW92ZVBhdGgiLCJzcGxpY2UiLCJnZXRVUkkiLCJnZXRUaXRsZSIsImNvbnN0cnVjdG9yIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJhY3Rpb25zIiwicGFyZW50RW50cnkiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInByb3BzIiwiSlNPTiIsInN0cmluZ2lmeSIsImRlc3Ryb3kiLCJjbGVhciIsImRpc3Bvc2UiLCJyZW5kZXIiLCJibG9ja3MiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsImdldEdyb3Vwc0luR3JvdXAiLCJtYXAiLCJibG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQVFBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBO0FB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QkFBQyxvQkFBRDtBQUFjLFFBQUEsTUFBTSxFQUFFeEIsZUFBTWdELGdCQUFOO0FBQXRCLFNBQ0UsdUNBREYsQ0FERjtBQUtEOztBQUVELFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0Usa0JBQUMscUJBQUQ7QUFDRSxNQUFBLGNBQWMsRUFBRSxLQUFLZCxPQUR2QjtBQUVFLE1BQUEsVUFBVSxFQUFFOUMsTUFBTSxJQUFJLEtBQUtELGtCQUFMLENBQXdCQyxNQUF4QjtBQUZ4QixNQURGLEVBTUd5RCxNQUFNLENBQUNJLEdBQVAsQ0FBV0MsS0FBSyxJQUFJQSxLQUFwQixDQU5ILENBREY7QUFVRDs7QUExTmtDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgRW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbmltcG9ydCBJY29ucyBmcm9tICcuL2ljb25zJztcbmltcG9ydCB7XG4gIEVkaXRvclR5cGUsXG4gIEVkaXRvck9yZGVyLFxuICBFZGl0b3JPcHRpb25zLFxuICBFZGl0b3JOYW1lLFxuICBFZGl0b3JQYXRocyxcbiAgRWRpdG9yR3JvdXBzXG59IGZyb20gJy4uL2NvbXBvbmVudHMvZWRpdG9yJztcbmltcG9ydCBDb25maXJtRGVsZXRlIGZyb20gJy4uL2NvbXBvbmVudHMvY29uZmlybS1kZWxldGUnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvckNvbnRhaW5lciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZUFjdGlvbiAoYWN0aW9uKSB7XG4gICAgY29uc29sZS5sb2coYWN0aW9uLCB0aGlzLmVudHJ5KTtcblxuICAgIGlmIChhY3Rpb24gPT09ICdkZWxldGUnKSB7XG4gICAgICBjb25zdCBpdGVtID0gbmV3IENvbmZpcm1EZWxldGUodGhpcy5pZCk7XG4gICAgICBjb25zdCBtb2RhbCA9IGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoeyBpdGVtIH0pO1xuXG4gICAgICBtb2RhbC5vbkRpZERlc3Ryb3koXG4gICAgICAgICgpID0+XG4gICAgICAgICAgIXN0YXRlLmdldEVudHJ5KHRoaXMuaWQpICYmXG4gICAgICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZSgpLmRlc3Ryb3lBY3RpdmVJdGVtKClcbiAgICAgICk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSBpZiAoIXRoaXMuaWQgJiYgYWN0aW9uID09PSAnc2F2ZScpIHtcbiAgICAgIHN0YXRlLmFkZEVudHJ5KHRoaXMubmV3RW50cnkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChhY3Rpb24gPT09ICdzYXZlJykge1xuICAgICAgc3RhdGUuZWRpdEVudHJ5KHRoaXMuaWQsIHRoaXMubmV3RW50cnkpO1xuICAgIH1cblxuICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKS5kZXN0cm95QWN0aXZlSXRlbSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlUGFyZW50IChwYXJlbnRJZCkge31cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VOYW1lIChuYW1lKSB7XG4gICAgdGhpcy51cGRhdGUoe1xuICAgICAgLi4udGhpcy5uZXdFbnRyeSxcbiAgICAgIG5hbWVcbiAgICB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZVR5cGUgKHR5cGUpIHtcbiAgICBsZXQgY3JlYXRlZEVudHJ5O1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdncm91cCc6XG4gICAgICAgIGNyZWF0ZWRFbnRyeSA9IHN0YXRlLmNyZWF0ZUdyb3VwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY3JlYXRlZEVudHJ5ID0gc3RhdGUuY3JlYXRlUHJvamVjdCgpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlKGNyZWF0ZWRFbnRyeSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VJY29uIChpY29uKSB7XG4gICAgdGhpcy51cGRhdGUoe1xuICAgICAgLi4udGhpcy5uZXdFbnRyeSxcbiAgICAgIGljb25cbiAgICB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUFkZFBhdGhzIChwYXRocykge1xuICAgIHBhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICBpZiAodGhpcy5uZXdFbnRyeS5wYXRocy5pbmRleE9mKHBhdGgpID09PSAtMSkge1xuICAgICAgICB0aGlzLm5ld0VudHJ5LnBhdGhzLnB1c2gocGF0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGUodGhpcy5uZXdFbnRyeSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVSZW1vdmVQYXRoIChwYXRoKSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLm5ld0VudHJ5LnBhdGhzLmluZGV4T2YocGF0aCk7XG5cbiAgICBpZiAoaWQgIT09IC0xKSB7XG4gICAgICB0aGlzLm5ld0VudHJ5LnBhdGhzLnNwbGljZShpZCwgMSk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGUodGhpcy5uZXdFbnRyeSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiAncHJvamVjdC12aWV3ZXItcGx1cy1lZGl0b3InO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VGl0bGUgKCkge1xuICAgIHJldHVybiAnUFZQIC0gRWRpdG9yJztcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChpZCwgcGFyZW50SWQpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBlZGl0b3InLCBpZCwgcGFyZW50SWQpO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICBjb25zdCBlbnRyeSA9IHN0YXRlLmdldEVudHJ5KGlkKTtcbiAgICBjb25zdCBwYXJlbnRFbnRyeSA9IHN0YXRlLmdldEVudHJ5KHBhcmVudElkKTtcblxuICAgIGlmIChlbnRyeSkge1xuICAgICAgdGhpcy5hY3Rpb25zID0gWydkZWxldGUnXTtcbiAgICAgIHRoaXMuZW50cnkgPSB7IC4uLmVudHJ5IH07XG4gICAgICB0aGlzLm5ld0VudHJ5ID0geyAuLi5lbnRyeSB9O1xuICAgIH1cblxuICAgIGlmIChwYXJlbnRFbnRyeSkge1xuICAgICAgdGhpcy5wYXJlbnRJZCA9IHBhcmVudElkO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdlZGl0b3InLCBpZCwgdGhpcy5lbnRyeSk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgdGhpcy5hY3Rpb25zID0gW107XG5cbiAgICBpZiAodGhpcy5pZCkge1xuICAgICAgdGhpcy5hY3Rpb25zLnB1c2goJ2RlbGV0ZScpO1xuICAgIH1cblxuICAgIGlmIChKU09OLnN0cmluZ2lmeSh0aGlzLmVudHJ5KSA9PT0gSlNPTi5zdHJpbmdpZnkocHJvcHMpKSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuYWN0aW9ucy5pbmRleE9mKCdzYXZlJyk7XG4gICAgICBpZCAhPT0gLTEgJiYgdGhpcy5hY3Rpb25zLnNwbGljZShpZCwgMSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5hY3Rpb25zLnB1c2goJ3NhdmUnKTtcbiAgICB9XG5cbiAgICB0aGlzLm5ld0VudHJ5ID0gcHJvcHM7XG5cbiAgICBpZiAodGhpcy5wYXJlbnRJZCkge1xuICAgICAgdGhpcy5uZXdFbnRyeS5wYXJlbnRJZCA9IHRoaXMucGFyZW50SWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgZGVsZXRlIHRoaXMuaWQ7XG4gICAgZGVsZXRlIHRoaXMuZW50cnk7XG4gICAgZGVsZXRlIHRoaXMubmV3RW50cnk7XG4gICAgdGhpcy5lbWl0dGVyLmNsZWFyKCk7XG4gICAgdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGJsb2NrcyA9IFtdO1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5uZXdFbnRyeSB8fCB0aGlzLmVudHJ5O1xuXG4gICAgaWYgKCFlbnRyeSAmJiB0aGlzLnBhcmVudElkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGJsb2Nrcy5wdXNoKFxuICAgICAgICA8RWRpdG9yVHlwZSBvbkRpZENoYW5nZT17dHlwZSA9PiB0aGlzLmhhbmRsZUNoYW5nZVR5cGUodHlwZSl9PlxuICAgICAgICAgIDxoMj5UeXBlPC9oMj5cbiAgICAgICAgPC9FZGl0b3JUeXBlPlxuICAgICAgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvck5hbWVcbiAgICAgICAgICBlbnRyeT17ZW50cnl9XG4gICAgICAgICAgb25EaWRDaGFuZ2U9e3ZhbHVlID0+IHRoaXMuaGFuZGxlQ2hhbmdlTmFtZSh2YWx1ZSl9XG4gICAgICAgID5cbiAgICAgICAgICA8aDI+TmFtZTwvaDI+XG4gICAgICAgIDwvRWRpdG9yTmFtZT4sXG4gICAgICAgIDxJY29ucyBlbnRyeT17ZW50cnl9IG9uRGlkQ2hhbmdlPXtpY29uID0+IHRoaXMuaGFuZGxlQ2hhbmdlSWNvbihpY29uKX0+XG4gICAgICAgICAgPGgyPkljb25zPC9oMj5cbiAgICAgICAgPC9JY29ucz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JQYXRoc1xuICAgICAgICAgIGVudHJ5PXtlbnRyeX1cbiAgICAgICAgICBvbkRpZEFkZFBhdGhzPXtwYXRocyA9PiB0aGlzLmhhbmRsZUFkZFBhdGhzKHBhdGhzKX1cbiAgICAgICAgICBvbkRpZFJlbW92ZVBhdGg9e3BhdGggPT4gdGhpcy5oYW5kbGVSZW1vdmVQYXRoKHBhdGgpfVxuICAgICAgICA+XG4gICAgICAgICAgPGgyPlBhdGhzPC9oMj5cbiAgICAgICAgPC9FZGl0b3JQYXRocz5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuZW50cnkgJiYgZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JPcmRlcj5cbiAgICAgICAgICA8aDI+T3JkZXI8L2gyPlxuICAgICAgICA8L0VkaXRvck9yZGVyPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZW50cnkpIHtcbiAgICAgIGJsb2Nrcy5wdXNoKFxuICAgICAgICA8RWRpdG9yR3JvdXBzIGdyb3Vwcz17c3RhdGUuZ2V0R3JvdXBzSW5Hcm91cCgpfT5cbiAgICAgICAgICA8aDI+R3JvdXBzPC9oMj5cbiAgICAgICAgPC9FZGl0b3JHcm91cHM+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2plY3Qtdmlld2VyLXBsdXMtZWRpdG9yIHBhbmUtaXRlbSBuYXRpdmUta2V5LWJpbmRpbmdzXCI+XG4gICAgICAgIDxFZGl0b3JPcHRpb25zXG4gICAgICAgICAgYWxsb3dlZEFjdGlvbnM9e3RoaXMuYWN0aW9uc31cbiAgICAgICAgICBvbmRpZENsaWNrPXthY3Rpb24gPT4gdGhpcy5oYW5kbGVDaGFuZ2VBY3Rpb24oYWN0aW9uKX1cbiAgICAgICAgLz5cblxuICAgICAgICB7YmxvY2tzLm1hcChibG9jayA9PiBibG9jayl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=