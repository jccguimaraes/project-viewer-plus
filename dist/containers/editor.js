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


  handleChangeParent(parentId) {
    this.parentId = parentId;
    this.newEntry.parentId = parentId;
    this.update(this.newEntry);
  }
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
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();
    this.actions = [];
    this.id = id;

    var entry = _state.default.getEntry(id);

    this.parentId = entry && entry.parentId || parentId || NaN;

    if (entry) {
      this.actions = ['delete'];
      this.entry = _objectSpread({}, entry);
      this.newEntry = _objectSpread({}, entry);
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJoYW5kbGVDaGFuZ2VBY3Rpb24iLCJhY3Rpb24iLCJpdGVtIiwiQ29uZmlybURlbGV0ZSIsImlkIiwibW9kYWwiLCJhdG9tIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsIm9uRGlkRGVzdHJveSIsInN0YXRlIiwiZ2V0RW50cnkiLCJnZXRBY3RpdmVQYW5lIiwiZGVzdHJveUFjdGl2ZUl0ZW0iLCJhZGRFbnRyeSIsIm5ld0VudHJ5IiwiZWRpdEVudHJ5IiwiaGFuZGxlQ2hhbmdlUGFyZW50IiwicGFyZW50SWQiLCJ1cGRhdGUiLCJoYW5kbGVDaGFuZ2VOYW1lIiwibmFtZSIsImhhbmRsZUNoYW5nZVR5cGUiLCJ0eXBlIiwiY3JlYXRlZEVudHJ5IiwiY3JlYXRlR3JvdXAiLCJjcmVhdGVQcm9qZWN0IiwiaGFuZGxlQ2hhbmdlSWNvbiIsImljb24iLCJoYW5kbGVBZGRQYXRocyIsInBhdGhzIiwiZm9yRWFjaCIsInBhdGgiLCJpbmRleE9mIiwicHVzaCIsImhhbmRsZVJlbW92ZVBhdGgiLCJzcGxpY2UiLCJnZXRVUkkiLCJnZXRUaXRsZSIsImNvbnN0cnVjdG9yIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJhY3Rpb25zIiwiZW50cnkiLCJOYU4iLCJldGNoIiwiaW5pdGlhbGl6ZSIsInByb3BzIiwiSlNPTiIsInN0cmluZ2lmeSIsImRlc3Ryb3kiLCJjbGVhciIsImRpc3Bvc2UiLCJyZW5kZXIiLCJibG9ja3MiLCJ2YWx1ZSIsImdldEdyb3Vwc0luR3JvdXAiLCJtYXAiLCJibG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQVFBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsZUFBTixDQUFzQjtBQUNuQztBQUNBQyxFQUFB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ZixPQUNFLGtCQUFDLHFCQUFEO0FBQ0UsTUFBQSxjQUFjLEVBQUUsS0FBSzBCLE9BRHZCO0FBRUUsTUFBQSxVQUFVLEVBQUUzQyxNQUFNLElBQUksS0FBS0Qsa0JBQUwsQ0FBd0JDLE1BQXhCO0FBRnhCLE1BREYsRUFNR3VELE1BQU0sQ0FBQ0csR0FBUCxDQUFXQyxLQUFLLElBQUlBLEtBQXBCLENBTkgsQ0FERjtBQVVEOztBQXhOa0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuaW1wb3J0IEljb25zIGZyb20gJy4vaWNvbnMnO1xuaW1wb3J0IHtcbiAgRWRpdG9yVHlwZSxcbiAgRWRpdG9yT3JkZXIsXG4gIEVkaXRvck9wdGlvbnMsXG4gIEVkaXRvck5hbWUsXG4gIEVkaXRvclBhdGhzLFxuICBFZGl0b3JHcm91cHNcbn0gZnJvbSAnLi4vY29tcG9uZW50cy9lZGl0b3InO1xuaW1wb3J0IENvbmZpcm1EZWxldGUgZnJvbSAnLi4vY29tcG9uZW50cy9jb25maXJtLWRlbGV0ZSc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc2VydmljZXMvc3RhdGUnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yQ29udGFpbmVyIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlQWN0aW9uIChhY3Rpb24pIHtcbiAgICBpZiAoYWN0aW9uID09PSAnZGVsZXRlJykge1xuICAgICAgY29uc3QgaXRlbSA9IG5ldyBDb25maXJtRGVsZXRlKHRoaXMuaWQpO1xuICAgICAgY29uc3QgbW9kYWwgPSBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHsgaXRlbSB9KTtcblxuICAgICAgbW9kYWwub25EaWREZXN0cm95KFxuICAgICAgICAoKSA9PlxuICAgICAgICAgICFzdGF0ZS5nZXRFbnRyeSh0aGlzLmlkKSAmJlxuICAgICAgICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKS5kZXN0cm95QWN0aXZlSXRlbSgpXG4gICAgICApO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYgKCF0aGlzLmlkICYmIGFjdGlvbiA9PT0gJ3NhdmUnKSB7XG4gICAgICBzdGF0ZS5hZGRFbnRyeSh0aGlzLm5ld0VudHJ5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYWN0aW9uID09PSAnc2F2ZScpIHtcbiAgICAgIHN0YXRlLmVkaXRFbnRyeSh0aGlzLmlkLCB0aGlzLm5ld0VudHJ5KTtcbiAgICB9XG5cbiAgICBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lKCkuZGVzdHJveUFjdGl2ZUl0ZW0oKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZVBhcmVudCAocGFyZW50SWQpIHtcbiAgICB0aGlzLnBhcmVudElkID0gcGFyZW50SWQ7XG4gICAgdGhpcy5uZXdFbnRyeS5wYXJlbnRJZCA9IHBhcmVudElkO1xuICAgIHRoaXMudXBkYXRlKHRoaXMubmV3RW50cnkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlTmFtZSAobmFtZSkge1xuICAgIHRoaXMudXBkYXRlKHtcbiAgICAgIC4uLnRoaXMubmV3RW50cnksXG4gICAgICBuYW1lXG4gICAgfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VUeXBlICh0eXBlKSB7XG4gICAgbGV0IGNyZWF0ZWRFbnRyeTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICBjcmVhdGVkRW50cnkgPSBzdGF0ZS5jcmVhdGVHcm91cCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNyZWF0ZWRFbnRyeSA9IHN0YXRlLmNyZWF0ZVByb2plY3QoKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZShjcmVhdGVkRW50cnkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlSWNvbiAoaWNvbikge1xuICAgIHRoaXMudXBkYXRlKHtcbiAgICAgIC4uLnRoaXMubmV3RW50cnksXG4gICAgICBpY29uXG4gICAgfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVBZGRQYXRocyAocGF0aHMpIHtcbiAgICBwYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgaWYgKHRoaXMubmV3RW50cnkucGF0aHMuaW5kZXhPZihwYXRoKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5uZXdFbnRyeS5wYXRocy5wdXNoKHBhdGgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlKHRoaXMubmV3RW50cnkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlUmVtb3ZlUGF0aCAocGF0aCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5uZXdFbnRyeS5wYXRocy5pbmRleE9mKHBhdGgpO1xuXG4gICAgaWYgKGlkICE9PSAtMSkge1xuICAgICAgdGhpcy5uZXdFbnRyeS5wYXRocy5zcGxpY2UoaWQsIDEpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlKHRoaXMubmV3RW50cnkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VVJJICgpIHtcbiAgICByZXR1cm4gJ3Byb2plY3Qtdmlld2VyLXBsdXMtZWRpdG9yJztcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFRpdGxlICgpIHtcbiAgICByZXR1cm4gJ1BWUCAtIEVkaXRvcic7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAoaWQsIHBhcmVudElkKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICBjb25zdCBlbnRyeSA9IHN0YXRlLmdldEVudHJ5KGlkKTtcbiAgICB0aGlzLnBhcmVudElkID0gKGVudHJ5ICYmIGVudHJ5LnBhcmVudElkKSB8fCBwYXJlbnRJZCB8fCBOYU47XG5cbiAgICBpZiAoZW50cnkpIHtcbiAgICAgIHRoaXMuYWN0aW9ucyA9IFsnZGVsZXRlJ107XG4gICAgICB0aGlzLmVudHJ5ID0geyAuLi5lbnRyeSB9O1xuICAgICAgdGhpcy5uZXdFbnRyeSA9IHsgLi4uZW50cnkgfTtcbiAgICB9XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgdGhpcy5hY3Rpb25zID0gW107XG5cbiAgICBpZiAodGhpcy5pZCkge1xuICAgICAgdGhpcy5hY3Rpb25zLnB1c2goJ2RlbGV0ZScpO1xuICAgIH1cblxuICAgIGlmIChKU09OLnN0cmluZ2lmeSh0aGlzLmVudHJ5KSA9PT0gSlNPTi5zdHJpbmdpZnkocHJvcHMpKSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuYWN0aW9ucy5pbmRleE9mKCdzYXZlJyk7XG4gICAgICBpZCAhPT0gLTEgJiYgdGhpcy5hY3Rpb25zLnNwbGljZShpZCwgMSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5hY3Rpb25zLnB1c2goJ3NhdmUnKTtcbiAgICB9XG5cbiAgICB0aGlzLm5ld0VudHJ5ID0gcHJvcHM7XG5cbiAgICBpZiAodGhpcy5wYXJlbnRJZCkge1xuICAgICAgdGhpcy5uZXdFbnRyeS5wYXJlbnRJZCA9IHRoaXMucGFyZW50SWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgZGVsZXRlIHRoaXMuaWQ7XG4gICAgZGVsZXRlIHRoaXMuZW50cnk7XG4gICAgZGVsZXRlIHRoaXMubmV3RW50cnk7XG4gICAgdGhpcy5lbWl0dGVyLmNsZWFyKCk7XG4gICAgdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGJsb2NrcyA9IFtdO1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5uZXdFbnRyeSB8fCB0aGlzLmVudHJ5O1xuXG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JUeXBlIG9uRGlkQ2hhbmdlPXt0eXBlID0+IHRoaXMuaGFuZGxlQ2hhbmdlVHlwZSh0eXBlKX0+XG4gICAgICAgICAgPGgyPlR5cGU8L2gyPlxuICAgICAgICA8L0VkaXRvclR5cGU+XG4gICAgICApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGJsb2Nrcy5wdXNoKFxuICAgICAgICA8RWRpdG9yTmFtZVxuICAgICAgICAgIGVudHJ5PXtlbnRyeX1cbiAgICAgICAgICBvbkRpZENoYW5nZT17dmFsdWUgPT4gdGhpcy5oYW5kbGVDaGFuZ2VOYW1lKHZhbHVlKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxoMj5OYW1lPC9oMj5cbiAgICAgICAgPC9FZGl0b3JOYW1lPixcbiAgICAgICAgPEljb25zIGVudHJ5PXtlbnRyeX0gb25EaWRDaGFuZ2U9e2ljb24gPT4gdGhpcy5oYW5kbGVDaGFuZ2VJY29uKGljb24pfT5cbiAgICAgICAgICA8aDI+SWNvbnM8L2gyPlxuICAgICAgICA8L0ljb25zPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZW50cnkgJiYgZW50cnkudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvclBhdGhzXG4gICAgICAgICAgZW50cnk9e2VudHJ5fVxuICAgICAgICAgIG9uRGlkQWRkUGF0aHM9e3BhdGhzID0+IHRoaXMuaGFuZGxlQWRkUGF0aHMocGF0aHMpfVxuICAgICAgICAgIG9uRGlkUmVtb3ZlUGF0aD17cGF0aCA9PiB0aGlzLmhhbmRsZVJlbW92ZVBhdGgocGF0aCl9XG4gICAgICAgID5cbiAgICAgICAgICA8aDI+UGF0aHM8L2gyPlxuICAgICAgICA8L0VkaXRvclBhdGhzPlxuICAgICAgKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5lbnRyeSAmJiBlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvck9yZGVyPlxuICAgICAgICAgIDxoMj5PcmRlcjwvaDI+XG4gICAgICAgIDwvRWRpdG9yT3JkZXI+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChlbnRyeSkge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JHcm91cHNcbiAgICAgICAgICBncm91cHM9e3N0YXRlLmdldEdyb3Vwc0luR3JvdXAoKX1cbiAgICAgICAgICBzZWxlY3RlZElkPXt0aGlzLnBhcmVudElkfVxuICAgICAgICAgIG9uRGlkQ2xpY2s9e3BhcmVudElkID0+IHRoaXMuaGFuZGxlQ2hhbmdlUGFyZW50KHBhcmVudElkKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxoMj5BZGQgdG8gR3JvdXA8L2gyPlxuICAgICAgICA8L0VkaXRvckdyb3Vwcz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvamVjdC12aWV3ZXItcGx1cy1lZGl0b3IgcGFuZS1pdGVtIG5hdGl2ZS1rZXktYmluZGluZ3NcIj5cbiAgICAgICAgPEVkaXRvck9wdGlvbnNcbiAgICAgICAgICBhbGxvd2VkQWN0aW9ucz17dGhpcy5hY3Rpb25zfVxuICAgICAgICAgIG9uRGlkQ2xpY2s9e2FjdGlvbiA9PiB0aGlzLmhhbmRsZUNoYW5nZUFjdGlvbihhY3Rpb24pfVxuICAgICAgICAvPlxuXG4gICAgICAgIHtibG9ja3MubWFwKGJsb2NrID0+IGJsb2NrKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==