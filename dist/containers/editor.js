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
    console.log('created editor', id, parentId);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJoYW5kbGVDaGFuZ2VBY3Rpb24iLCJhY3Rpb24iLCJjb25zb2xlIiwibG9nIiwiZW50cnkiLCJpdGVtIiwiQ29uZmlybURlbGV0ZSIsImlkIiwibW9kYWwiLCJhdG9tIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsIm9uRGlkRGVzdHJveSIsInN0YXRlIiwiZ2V0RW50cnkiLCJnZXRBY3RpdmVQYW5lIiwiZGVzdHJveUFjdGl2ZUl0ZW0iLCJhZGRFbnRyeSIsIm5ld0VudHJ5IiwiZWRpdEVudHJ5IiwiaGFuZGxlQ2hhbmdlUGFyZW50IiwicGFyZW50SWQiLCJ1cGRhdGUiLCJoYW5kbGVDaGFuZ2VOYW1lIiwibmFtZSIsImhhbmRsZUNoYW5nZVR5cGUiLCJ0eXBlIiwiY3JlYXRlZEVudHJ5IiwiY3JlYXRlR3JvdXAiLCJjcmVhdGVQcm9qZWN0IiwiaGFuZGxlQ2hhbmdlSWNvbiIsImljb24iLCJoYW5kbGVBZGRQYXRocyIsInBhdGhzIiwiZm9yRWFjaCIsInBhdGgiLCJpbmRleE9mIiwicHVzaCIsImhhbmRsZVJlbW92ZVBhdGgiLCJzcGxpY2UiLCJnZXRVUkkiLCJnZXRUaXRsZSIsImNvbnN0cnVjdG9yIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJhY3Rpb25zIiwiTmFOIiwiZXRjaCIsImluaXRpYWxpemUiLCJwcm9wcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJkZXN0cm95IiwiY2xlYXIiLCJkaXNwb3NlIiwicmVuZGVyIiwiYmxvY2tzIiwidmFsdWUiLCJnZXRHcm91cHNJbkdyb3VwIiwibWFwIiwiYmxvY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFRQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNlLE1BQU1BLGVBQU4sQ0FBc0I7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QUFDckIsSUFBUCxDQUNFLGtCQUFDLG9CQUFEO0FBQ0UsUUFBQSxNQUFNLEVBQUV4QixlQUFNK0MsZ0JBQU4sRUFEVjtBQUVFLFFBQUEsVUFBVSxFQUFFLEtBQUt2QyxRQUZuQjtBQUdFLFFBQUEsVUFBVSxFQUFFQSxRQUFRLElBQUksS0FBS0Qsa0JBQUwsQ0FBd0JDLFFBQXhCO0FBSDFCLFNBS0UsNkNBTEYsQ0FERjtBQVNEOztBQUVELFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0Usa0JBQUMscUJBQUQ7QUFDRSxNQUFBLGNBQWMsRUFBRSxLQUFLMEIsT0FEdkI7QUFFRSxNQUFBLFVBQVUsRUFBRTlDLE1BQU0sSUFBSSxLQUFLRCxrQkFBTCxDQUF3QkMsTUFBeEI7QUFGeEIsTUFERixFQU1HeUQsTUFBTSxDQUFDRyxHQUFQLENBQVdDLEtBQUssSUFBSUEsS0FBcEIsQ0FOSCxDQURGO0FBVUQ7O0FBOU5rQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG5pbXBvcnQgSWNvbnMgZnJvbSAnLi9pY29ucyc7XG5pbXBvcnQge1xuICBFZGl0b3JUeXBlLFxuICBFZGl0b3JPcmRlcixcbiAgRWRpdG9yT3B0aW9ucyxcbiAgRWRpdG9yTmFtZSxcbiAgRWRpdG9yUGF0aHMsXG4gIEVkaXRvckdyb3Vwc1xufSBmcm9tICcuLi9jb21wb25lbnRzL2VkaXRvcic7XG5pbXBvcnQgQ29uZmlybURlbGV0ZSBmcm9tICcuLi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JDb250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VBY3Rpb24gKGFjdGlvbikge1xuICAgIGNvbnNvbGUubG9nKGFjdGlvbiwgdGhpcy5lbnRyeSk7XG5cbiAgICBpZiAoYWN0aW9uID09PSAnZGVsZXRlJykge1xuICAgICAgY29uc3QgaXRlbSA9IG5ldyBDb25maXJtRGVsZXRlKHRoaXMuaWQpO1xuICAgICAgY29uc3QgbW9kYWwgPSBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHsgaXRlbSB9KTtcblxuICAgICAgbW9kYWwub25EaWREZXN0cm95KFxuICAgICAgICAoKSA9PlxuICAgICAgICAgICFzdGF0ZS5nZXRFbnRyeSh0aGlzLmlkKSAmJlxuICAgICAgICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKS5kZXN0cm95QWN0aXZlSXRlbSgpXG4gICAgICApO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYgKCF0aGlzLmlkICYmIGFjdGlvbiA9PT0gJ3NhdmUnKSB7XG4gICAgICBzdGF0ZS5hZGRFbnRyeSh0aGlzLm5ld0VudHJ5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYWN0aW9uID09PSAnc2F2ZScpIHtcbiAgICAgIHN0YXRlLmVkaXRFbnRyeSh0aGlzLmlkLCB0aGlzLm5ld0VudHJ5KTtcbiAgICB9XG5cbiAgICBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lKCkuZGVzdHJveUFjdGl2ZUl0ZW0oKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZVBhcmVudCAocGFyZW50SWQpIHtcbiAgICB0aGlzLnBhcmVudElkID0gcGFyZW50SWQ7XG4gICAgdGhpcy5uZXdFbnRyeS5wYXJlbnRJZCA9IHBhcmVudElkO1xuICAgIHRoaXMudXBkYXRlKHRoaXMubmV3RW50cnkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlTmFtZSAobmFtZSkge1xuICAgIHRoaXMudXBkYXRlKHtcbiAgICAgIC4uLnRoaXMubmV3RW50cnksXG4gICAgICBuYW1lXG4gICAgfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VUeXBlICh0eXBlKSB7XG4gICAgbGV0IGNyZWF0ZWRFbnRyeTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICBjcmVhdGVkRW50cnkgPSBzdGF0ZS5jcmVhdGVHcm91cCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNyZWF0ZWRFbnRyeSA9IHN0YXRlLmNyZWF0ZVByb2plY3QoKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZShjcmVhdGVkRW50cnkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlSWNvbiAoaWNvbikge1xuICAgIHRoaXMudXBkYXRlKHtcbiAgICAgIC4uLnRoaXMubmV3RW50cnksXG4gICAgICBpY29uXG4gICAgfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVBZGRQYXRocyAocGF0aHMpIHtcbiAgICBwYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgaWYgKHRoaXMubmV3RW50cnkucGF0aHMuaW5kZXhPZihwYXRoKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5uZXdFbnRyeS5wYXRocy5wdXNoKHBhdGgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlKHRoaXMubmV3RW50cnkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlUmVtb3ZlUGF0aCAocGF0aCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5uZXdFbnRyeS5wYXRocy5pbmRleE9mKHBhdGgpO1xuXG4gICAgaWYgKGlkICE9PSAtMSkge1xuICAgICAgdGhpcy5uZXdFbnRyeS5wYXRocy5zcGxpY2UoaWQsIDEpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlKHRoaXMubmV3RW50cnkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VVJJICgpIHtcbiAgICByZXR1cm4gJ3Byb2plY3Qtdmlld2VyLXBsdXMtZWRpdG9yJztcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFRpdGxlICgpIHtcbiAgICByZXR1cm4gJ1BWUCAtIEVkaXRvcic7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAoaWQsIHBhcmVudElkKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZWRpdG9yJywgaWQsIHBhcmVudElkKTtcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICB0aGlzLmFjdGlvbnMgPSBbXTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgY29uc3QgZW50cnkgPSBzdGF0ZS5nZXRFbnRyeShpZCk7XG4gICAgdGhpcy5wYXJlbnRJZCA9IChlbnRyeSAmJiBlbnRyeS5wYXJlbnRJZCkgfHwgcGFyZW50SWQgfHwgTmFOO1xuXG4gICAgaWYgKGVudHJ5KSB7XG4gICAgICB0aGlzLmFjdGlvbnMgPSBbJ2RlbGV0ZSddO1xuICAgICAgdGhpcy5lbnRyeSA9IHsgLi4uZW50cnkgfTtcbiAgICAgIHRoaXMubmV3RW50cnkgPSB7IC4uLmVudHJ5IH07XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ2VkaXRvcicsIGlkLCB0aGlzLmVudHJ5KTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLmFjdGlvbnMgPSBbXTtcblxuICAgIGlmICh0aGlzLmlkKSB7XG4gICAgICB0aGlzLmFjdGlvbnMucHVzaCgnZGVsZXRlJyk7XG4gICAgfVxuXG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHRoaXMuZW50cnkpID09PSBKU09OLnN0cmluZ2lmeShwcm9wcykpIHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5hY3Rpb25zLmluZGV4T2YoJ3NhdmUnKTtcbiAgICAgIGlkICE9PSAtMSAmJiB0aGlzLmFjdGlvbnMuc3BsaWNlKGlkLCAxKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmFjdGlvbnMucHVzaCgnc2F2ZScpO1xuICAgIH1cblxuICAgIHRoaXMubmV3RW50cnkgPSBwcm9wcztcblxuICAgIGlmICh0aGlzLnBhcmVudElkKSB7XG4gICAgICB0aGlzLm5ld0VudHJ5LnBhcmVudElkID0gdGhpcy5wYXJlbnRJZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBkZWxldGUgdGhpcy5pZDtcbiAgICBkZWxldGUgdGhpcy5lbnRyeTtcbiAgICBkZWxldGUgdGhpcy5uZXdFbnRyeTtcbiAgICB0aGlzLmVtaXR0ZXIuY2xlYXIoKTtcbiAgICB0aGlzLmVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgYmxvY2tzID0gW107XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm5ld0VudHJ5IHx8IHRoaXMuZW50cnk7XG5cbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvclR5cGUgb25EaWRDaGFuZ2U9e3R5cGUgPT4gdGhpcy5oYW5kbGVDaGFuZ2VUeXBlKHR5cGUpfT5cbiAgICAgICAgICA8aDI+VHlwZTwvaDI+XG4gICAgICAgIDwvRWRpdG9yVHlwZT5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JOYW1lXG4gICAgICAgICAgZW50cnk9e2VudHJ5fVxuICAgICAgICAgIG9uRGlkQ2hhbmdlPXt2YWx1ZSA9PiB0aGlzLmhhbmRsZUNoYW5nZU5hbWUodmFsdWUpfVxuICAgICAgICA+XG4gICAgICAgICAgPGgyPk5hbWU8L2gyPlxuICAgICAgICA8L0VkaXRvck5hbWU+LFxuICAgICAgICA8SWNvbnMgZW50cnk9e2VudHJ5fSBvbkRpZENoYW5nZT17aWNvbiA9PiB0aGlzLmhhbmRsZUNoYW5nZUljb24oaWNvbil9PlxuICAgICAgICAgIDxoMj5JY29uczwvaDI+XG4gICAgICAgIDwvSWNvbnM+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgIGJsb2Nrcy5wdXNoKFxuICAgICAgICA8RWRpdG9yUGF0aHNcbiAgICAgICAgICBlbnRyeT17ZW50cnl9XG4gICAgICAgICAgb25EaWRBZGRQYXRocz17cGF0aHMgPT4gdGhpcy5oYW5kbGVBZGRQYXRocyhwYXRocyl9XG4gICAgICAgICAgb25EaWRSZW1vdmVQYXRoPXtwYXRoID0+IHRoaXMuaGFuZGxlUmVtb3ZlUGF0aChwYXRoKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxoMj5QYXRoczwvaDI+XG4gICAgICAgIDwvRWRpdG9yUGF0aHM+XG4gICAgICApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmVudHJ5ICYmIGVudHJ5LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgIGJsb2Nrcy5wdXNoKFxuICAgICAgICA8RWRpdG9yT3JkZXI+XG4gICAgICAgICAgPGgyPk9yZGVyPC9oMj5cbiAgICAgICAgPC9FZGl0b3JPcmRlcj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGVudHJ5KSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvckdyb3Vwc1xuICAgICAgICAgIGdyb3Vwcz17c3RhdGUuZ2V0R3JvdXBzSW5Hcm91cCgpfVxuICAgICAgICAgIHNlbGVjdGVkSWQ9e3RoaXMucGFyZW50SWR9XG4gICAgICAgICAgb25EaWRDbGljaz17cGFyZW50SWQgPT4gdGhpcy5oYW5kbGVDaGFuZ2VQYXJlbnQocGFyZW50SWQpfVxuICAgICAgICA+XG4gICAgICAgICAgPGgyPkFkZCB0byBHcm91cDwvaDI+XG4gICAgICAgIDwvRWRpdG9yR3JvdXBzPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvciBwYW5lLWl0ZW0gbmF0aXZlLWtleS1iaW5kaW5nc1wiPlxuICAgICAgICA8RWRpdG9yT3B0aW9uc1xuICAgICAgICAgIGFsbG93ZWRBY3Rpb25zPXt0aGlzLmFjdGlvbnN9XG4gICAgICAgICAgb25EaWRDbGljaz17YWN0aW9uID0+IHRoaXMuaGFuZGxlQ2hhbmdlQWN0aW9uKGFjdGlvbil9XG4gICAgICAgIC8+XG5cbiAgICAgICAge2Jsb2Nrcy5tYXAoYmxvY2sgPT4gYmxvY2spfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19