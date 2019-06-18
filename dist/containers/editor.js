'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @jsx etch.dom */

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

var _editor = require('../components/editor');

var _confirmDelete = require('../components/confirm-delete');

var _confirmDelete2 = _interopRequireDefault(_confirmDelete);

var _state = require('../services/state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class EditorContainer {
  /* eslint-disable-next-line require-jsdoc */
  handleChangeIcon(icon) {
    console.log(icon);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeName(value) {
    this.entry.name = value;
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeAction(action) {
    console.log(action, this.entry);

    if (action === 'delete') {
      const item = new _confirmDelete2.default(this.id);
      const modal = atom.workspace.addModalPanel({ item });

      modal.onDidDestroy(() => !_state2.default.getEntry(this.id) && atom.workspace.getActivePane().destroyActiveItem());

      return;
    } else if (!this.id && action === 'save') {
      _state2.default.addEntry(this.entry);
    } else if (action === 'save') {
      _state2.default.editEntry(this.id, this.entry);
    }

    atom.workspace.getActivePane().destroyActiveItem();
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeType(type) {
    switch (type) {
      case 'group':
        this.entry = _state2.default.createGroup();
        break;
      default:
        this.entry = _state2.default.createProject();
    }
    this.update(this.entry);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeIcon(icon) {
    this.entry.icon = icon;
    this.update(this.entry);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleAddPaths(paths) {
    paths.forEach(path => {
      if (this.entry.paths.indexOf(path) === -1) {
        this.entry.paths.push(path);
      }
    });
    this.update(this.entry);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleRemovePath(path) {
    const id = this.entry.paths.indexOf(path);

    if (id !== -1) {
      this.entry.paths.splice(id, 1);
    }

    this.update(this.entry);
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
  constructor(id) {
    console.log('created editor', id);

    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();

    this.id = id;
    const entry = _state2.default.getEntry(id);

    if (entry) {
      this.entry = _extends({}, entry);
    }

    console.log('editor', id, this.entry);

    _etch2.default.initialize(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async update(props) {
    this.entry = props;
    return _etch2.default.update(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    delete this.id;
    delete this.entry;
    this.emitter.clear();
    this.emitter.dispose();
    this.disposables.dispose();
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    const blocks = [];

    if (!this.entry) {
      blocks.push(_etch2.default.dom(
        _editor.EditorType,
        { onDidChange: type => this.handleChangeType(type) },
        _etch2.default.dom(
          'h2',
          null,
          'Type'
        )
      ));
    } else {
      blocks.push(_etch2.default.dom(
        _editor.EditorName,
        {
          entry: this.entry,
          onDidChange: value => this.handleChangeName(value)
        },
        _etch2.default.dom(
          'h2',
          null,
          'Name'
        )
      ), _etch2.default.dom(
        _icons2.default,
        {
          entry: this.entry,
          onDidChange: icon => this.handleChangeIcon(icon)
        },
        _etch2.default.dom(
          'h2',
          null,
          'Icons'
        )
      ));
    }

    if (this.entry && this.entry.type === 'project') {
      blocks.push(_etch2.default.dom(
        _editor.EditorPaths,
        {
          entry: this.entry,
          onDidAddPaths: paths => this.handleAddPaths(paths),
          onDidRemovePath: path => this.handleRemovePath(path)
        },
        _etch2.default.dom(
          'h2',
          null,
          'Paths'
        )
      ));
    } else if (this.entry && this.entry.type === 'group') {
      blocks.push(_etch2.default.dom(
        _editor.EditorOrder,
        null,
        _etch2.default.dom(
          'h2',
          null,
          'Order'
        )
      ));
    }

    return _etch2.default.dom(
      'div',
      { className: 'project-viewer-plus-editor pane-item native-key-bindings' },
      _etch2.default.dom(_editor.EditorOptions, { ondidClick: action => this.handleChangeAction(action) }),
      blocks.map(block => block)
    );
  }
}
exports.default = EditorContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJoYW5kbGVDaGFuZ2VJY29uIiwiaWNvbiIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVDaGFuZ2VOYW1lIiwidmFsdWUiLCJlbnRyeSIsIm5hbWUiLCJoYW5kbGVDaGFuZ2VBY3Rpb24iLCJhY3Rpb24iLCJpdGVtIiwiQ29uZmlybURlbGV0ZSIsImlkIiwibW9kYWwiLCJhdG9tIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsIm9uRGlkRGVzdHJveSIsInN0YXRlIiwiZ2V0RW50cnkiLCJnZXRBY3RpdmVQYW5lIiwiZGVzdHJveUFjdGl2ZUl0ZW0iLCJhZGRFbnRyeSIsImVkaXRFbnRyeSIsImhhbmRsZUNoYW5nZVR5cGUiLCJ0eXBlIiwiY3JlYXRlR3JvdXAiLCJjcmVhdGVQcm9qZWN0IiwidXBkYXRlIiwiaGFuZGxlQWRkUGF0aHMiLCJwYXRocyIsImZvckVhY2giLCJwYXRoIiwiaW5kZXhPZiIsInB1c2giLCJoYW5kbGVSZW1vdmVQYXRoIiwic3BsaWNlIiwiZ2V0VVJJIiwiZ2V0VGl0bGUiLCJjb25zdHJ1Y3RvciIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZXRjaCIsImluaXRpYWxpemUiLCJwcm9wcyIsImRlc3Ryb3kiLCJjbGVhciIsImRpc3Bvc2UiLCJyZW5kZXIiLCJibG9ja3MiLCJtYXAiLCJibG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tRQUFBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7QUFPQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNlLE1BQU1BLGVBQU4sQ0FBc0I7QUFDbkM7QUFDQUMsbUJBQWtCQyxJQUFsQixFQUF3QjtBQUN0QkMsWUFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0Q7O0FBRUQ7QUFDQUcsbUJBQWtCQyxLQUFsQixFQUF5QjtBQUN2QixTQUFL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QUFJLEtBQUtLLEtBQUwsSUFBYyxLQUFLQSxLQUFMLENBQVdtQixJQUFYLEtBQW9CLFNBQXRDLEVBQWlEO0FBQy9DMEIsYUFBT2pCLElBQVAsQ0FDRTtBQUFDLDJCQUFEO0FBQUE7QUFDRSxpQkFBTyxLQUFLNUIsS0FEZDtBQUVFLHlCQUFld0IsU0FBUyxLQUFLRCxjQUFMLENBQW9CQyxLQUFwQixDQUYxQjtBQUdFLDJCQUFpQkUsUUFBUSxLQUFLRyxnQkFBTCxDQUFzQkgsSUFBdEI7QUFIM0I7QUFLRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTEYsT0FERjtBQVNELEtBVkQsTUFXSyxJQUFJLEtBQUsxQixLQUFMLElBQWMsS0FBS0EsS0FBTCxDQUFXbUIsSUFBWCxLQUFvQixPQUF0QyxFQUErQztBQUNsRDBCLGFBQU9qQixJQUFQLENBQ0U7QUFBQywyQkFBRDtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLE9BREY7QUFLRDs7QUFFRCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsMERBQWY7QUFDRSx5QkFBQyxxQkFBRCxJQUFlLFlBQVl6QixVQUFVLEtBQUtELGtCQUFMLENBQXdCQyxNQUF4QixDQUFyQyxHQURGO0FBRUcwQyxhQUFPQyxHQUFQLENBQVdDLFNBQVNBLEtBQXBCO0FBRkgsS0FERjtBQU1EO0FBOUtrQztrQkFBaEJ0RCxlIiwiZmlsZSI6ImVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG5pbXBvcnQgSWNvbnMgZnJvbSAnLi9pY29ucyc7XG5pbXBvcnQge1xuICBFZGl0b3JUeXBlLFxuICBFZGl0b3JPcmRlcixcbiAgRWRpdG9yT3B0aW9ucyxcbiAgRWRpdG9yTmFtZSxcbiAgRWRpdG9yUGF0aHNcbn0gZnJvbSAnLi4vY29tcG9uZW50cy9lZGl0b3InO1xuaW1wb3J0IENvbmZpcm1EZWxldGUgZnJvbSAnLi4vY29tcG9uZW50cy9jb25maXJtLWRlbGV0ZSc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc2VydmljZXMvc3RhdGUnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yQ29udGFpbmVyIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlSWNvbiAoaWNvbikge1xuICAgIGNvbnNvbGUubG9nKGljb24pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlTmFtZSAodmFsdWUpIHtcbiAgICB0aGlzLmVudHJ5Lm5hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZUFjdGlvbiAoYWN0aW9uKSB7XG4gICAgY29uc29sZS5sb2coYWN0aW9uLCB0aGlzLmVudHJ5KTtcblxuICAgIGlmIChhY3Rpb24gPT09ICdkZWxldGUnKSB7XG4gICAgICBjb25zdCBpdGVtID0gbmV3IENvbmZpcm1EZWxldGUodGhpcy5pZCk7XG4gICAgICBjb25zdCBtb2RhbCA9IGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoeyBpdGVtIH0pO1xuXG4gICAgICBtb2RhbC5vbkRpZERlc3Ryb3koXG4gICAgICAgICgpID0+XG4gICAgICAgICAgIXN0YXRlLmdldEVudHJ5KHRoaXMuaWQpICYmXG4gICAgICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZSgpLmRlc3Ryb3lBY3RpdmVJdGVtKClcbiAgICAgICk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSBpZiAoIXRoaXMuaWQgJiYgYWN0aW9uID09PSAnc2F2ZScpIHtcbiAgICAgIHN0YXRlLmFkZEVudHJ5KHRoaXMuZW50cnkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChhY3Rpb24gPT09ICdzYXZlJykge1xuICAgICAgc3RhdGUuZWRpdEVudHJ5KHRoaXMuaWQsIHRoaXMuZW50cnkpO1xuICAgIH1cblxuICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKS5kZXN0cm95QWN0aXZlSXRlbSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlVHlwZSAodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICB0aGlzLmVudHJ5ID0gc3RhdGUuY3JlYXRlR3JvdXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmVudHJ5ID0gc3RhdGUuY3JlYXRlUHJvamVjdCgpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmVudHJ5KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZUljb24gKGljb24pIHtcbiAgICB0aGlzLmVudHJ5Lmljb24gPSBpY29uO1xuICAgIHRoaXMudXBkYXRlKHRoaXMuZW50cnkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQWRkUGF0aHMgKHBhdGhzKSB7XG4gICAgcGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgIGlmICh0aGlzLmVudHJ5LnBhdGhzLmluZGV4T2YocGF0aCkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuZW50cnkucGF0aHMucHVzaChwYXRoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmVudHJ5KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZVJlbW92ZVBhdGggKHBhdGgpIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuZW50cnkucGF0aHMuaW5kZXhPZihwYXRoKTtcblxuICAgIGlmIChpZCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuZW50cnkucGF0aHMuc3BsaWNlKGlkLCAxKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmVudHJ5KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFVSSSAoKSB7XG4gICAgcmV0dXJuICdwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvcic7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRUaXRsZSAoKSB7XG4gICAgcmV0dXJuICdQVlAgLSBFZGl0b3InO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKGlkKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZWRpdG9yJywgaWQpO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIHRoaXMuaWQgPSBpZDtcbiAgICBjb25zdCBlbnRyeSA9IHN0YXRlLmdldEVudHJ5KGlkKTtcblxuICAgIGlmIChlbnRyeSkge1xuICAgICAgdGhpcy5lbnRyeSA9IHsgLi4uZW50cnkgfTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnZWRpdG9yJywgaWQsIHRoaXMuZW50cnkpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIHRoaXMuZW50cnkgPSBwcm9wcztcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBkZWxldGUgdGhpcy5pZDtcbiAgICBkZWxldGUgdGhpcy5lbnRyeTtcbiAgICB0aGlzLmVtaXR0ZXIuY2xlYXIoKTtcbiAgICB0aGlzLmVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgYmxvY2tzID0gW107XG5cbiAgICBpZiAoIXRoaXMuZW50cnkpIHtcbiAgICAgIGJsb2Nrcy5wdXNoKFxuICAgICAgICA8RWRpdG9yVHlwZSBvbkRpZENoYW5nZT17dHlwZSA9PiB0aGlzLmhhbmRsZUNoYW5nZVR5cGUodHlwZSl9PlxuICAgICAgICAgIDxoMj5UeXBlPC9oMj5cbiAgICAgICAgPC9FZGl0b3JUeXBlPlxuICAgICAgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvck5hbWVcbiAgICAgICAgICBlbnRyeT17dGhpcy5lbnRyeX1cbiAgICAgICAgICBvbkRpZENoYW5nZT17dmFsdWUgPT4gdGhpcy5oYW5kbGVDaGFuZ2VOYW1lKHZhbHVlKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxoMj5OYW1lPC9oMj5cbiAgICAgICAgPC9FZGl0b3JOYW1lPixcbiAgICAgICAgPEljb25zXG4gICAgICAgICAgZW50cnk9e3RoaXMuZW50cnl9XG4gICAgICAgICAgb25EaWRDaGFuZ2U9e2ljb24gPT4gdGhpcy5oYW5kbGVDaGFuZ2VJY29uKGljb24pfVxuICAgICAgICA+XG4gICAgICAgICAgPGgyPkljb25zPC9oMj5cbiAgICAgICAgPC9JY29ucz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW50cnkgJiYgdGhpcy5lbnRyeS50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgIGJsb2Nrcy5wdXNoKFxuICAgICAgICA8RWRpdG9yUGF0aHNcbiAgICAgICAgICBlbnRyeT17dGhpcy5lbnRyeX1cbiAgICAgICAgICBvbkRpZEFkZFBhdGhzPXtwYXRocyA9PiB0aGlzLmhhbmRsZUFkZFBhdGhzKHBhdGhzKX1cbiAgICAgICAgICBvbkRpZFJlbW92ZVBhdGg9e3BhdGggPT4gdGhpcy5oYW5kbGVSZW1vdmVQYXRoKHBhdGgpfVxuICAgICAgICA+XG4gICAgICAgICAgPGgyPlBhdGhzPC9oMj5cbiAgICAgICAgPC9FZGl0b3JQYXRocz5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuZW50cnkgJiYgdGhpcy5lbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvck9yZGVyPlxuICAgICAgICAgIDxoMj5PcmRlcjwvaDI+XG4gICAgICAgIDwvRWRpdG9yT3JkZXI+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2plY3Qtdmlld2VyLXBsdXMtZWRpdG9yIHBhbmUtaXRlbSBuYXRpdmUta2V5LWJpbmRpbmdzXCI+XG4gICAgICAgIDxFZGl0b3JPcHRpb25zIG9uZGlkQ2xpY2s9e2FjdGlvbiA9PiB0aGlzLmhhbmRsZUNoYW5nZUFjdGlvbihhY3Rpb24pfSAvPlxuICAgICAgICB7YmxvY2tzLm1hcChibG9jayA9PiBibG9jayl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=