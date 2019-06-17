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

    if (!this.id && action === 'save') {
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
    if (id) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJoYW5kbGVDaGFuZ2VJY29uIiwiaWNvbiIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVDaGFuZ2VOYW1lIiwidmFsdWUiLCJlbnRyeSIsIm5hbWUiLCJoYW5kbGVDaGFuZ2VBY3Rpb24iLCJhY3Rpb24iLCJpZCIsInN0YXRlIiwiYWRkRW50cnkiLCJlZGl0RW50cnkiLCJhdG9tIiwid29ya3NwYWNlIiwiZ2V0QWN0aXZlUGFuZSIsImRlc3Ryb3lBY3RpdmVJdGVtIiwiaGFuZGxlQ2hhbmdlVHlwZSIsInR5cGUiLCJjcmVhdGVHcm91cCIsImNyZWF0ZVByb2plY3QiLCJ1cGRhdGUiLCJoYW5kbGVBZGRQYXRocyIsInBhdGhzIiwiZm9yRWFjaCIsInBhdGgiLCJpbmRleE9mIiwicHVzaCIsImhhbmRsZVJlbW92ZVBhdGgiLCJzcGxpY2UiLCJnZXRVUkkiLCJnZXRUaXRsZSIsImNvbnN0cnVjdG9yIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJnZXRFbnRyeSIsImV0Y2giLCJpbml0aWFsaXplIiwicHJvcHMiLCJkZXN0cm95IiwiY2xlYXIiLCJkaXNwb3NlIiwicmVuZGVyIiwiYmxvY2tzIiwibWFwIiwiYmxvY2siXSwibWFwcGluZ3MiOiI7Ozs7OztrUUFBQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBT0E7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsZUFBTixDQUFzQjtBQUNuQztBQUNBQyxtQkFBa0JDLElBQWxCLEVBQXdCO0FBQ3RCQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDRDs7QUFFRDtBQUNBRyxtQkFBa0JDLEtBQWxCLEVBQXlCO0FBQ3ZCLFNBQUtDLEtBQUwsQ0FBV0MsSUFBWCxHQUFrQkYsS0FBbEI7QUFDRDs7QUFFRDtBQUNBRyxxQkFBb0JDLE1BQXBCLEVBQTRCO0FB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QywyQkFBRDtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLE9BREY7QUFLRDs7QUFFRCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsMERBQWY7QUFDRSx5QkFBQyxxQkFBRCxJQUFlLFlBQVluQixVQUFVLEtBQUtELGtCQUFMLENBQXdCQyxNQUF4QixDQUFyQyxHQURGO0FBRUdxQyxhQUFPQyxHQUFQLENBQVdDLFNBQVNBLEtBQXBCO0FBRkgsS0FERjtBQU1EO0FBaEtrQztrQkFBaEJqRCxlIiwiZmlsZSI6ImVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG5pbXBvcnQgSWNvbnMgZnJvbSAnLi9pY29ucyc7XG5pbXBvcnQge1xuICBFZGl0b3JUeXBlLFxuICBFZGl0b3JPcmRlcixcbiAgRWRpdG9yT3B0aW9ucyxcbiAgRWRpdG9yTmFtZSxcbiAgRWRpdG9yUGF0aHNcbn0gZnJvbSAnLi4vY29tcG9uZW50cy9lZGl0b3InO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvckNvbnRhaW5lciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZUljb24gKGljb24pIHtcbiAgICBjb25zb2xlLmxvZyhpY29uKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZU5hbWUgKHZhbHVlKSB7XG4gICAgdGhpcy5lbnRyeS5uYW1lID0gdmFsdWU7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VBY3Rpb24gKGFjdGlvbikge1xuICAgIGNvbnNvbGUubG9nKGFjdGlvbiwgdGhpcy5lbnRyeSk7XG5cbiAgICBpZiAoIXRoaXMuaWQgJiYgYWN0aW9uID09PSAnc2F2ZScpIHtcbiAgICAgIHN0YXRlLmFkZEVudHJ5KHRoaXMuZW50cnkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChhY3Rpb24gPT09ICdzYXZlJykge1xuICAgICAgc3RhdGUuZWRpdEVudHJ5KHRoaXMuaWQsIHRoaXMuZW50cnkpO1xuICAgIH1cblxuICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKS5kZXN0cm95QWN0aXZlSXRlbSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlVHlwZSAodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICB0aGlzLmVudHJ5ID0gc3RhdGUuY3JlYXRlR3JvdXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmVudHJ5ID0gc3RhdGUuY3JlYXRlUHJvamVjdCgpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmVudHJ5KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZUljb24gKGljb24pIHtcbiAgICB0aGlzLmVudHJ5Lmljb24gPSBpY29uO1xuICAgIHRoaXMudXBkYXRlKHRoaXMuZW50cnkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQWRkUGF0aHMgKHBhdGhzKSB7XG4gICAgcGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgIGlmICh0aGlzLmVudHJ5LnBhdGhzLmluZGV4T2YocGF0aCkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuZW50cnkucGF0aHMucHVzaChwYXRoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmVudHJ5KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZVJlbW92ZVBhdGggKHBhdGgpIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuZW50cnkucGF0aHMuaW5kZXhPZihwYXRoKTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuZW50cnkucGF0aHMuc3BsaWNlKGlkLCAxKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGUodGhpcy5lbnRyeSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiAncHJvamVjdC12aWV3ZXItcGx1cy1lZGl0b3InO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VGl0bGUgKCkge1xuICAgIHJldHVybiAnUFZQIC0gRWRpdG9yJztcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChpZCkge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvcicsIGlkKTtcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgY29uc3QgZW50cnkgPSBzdGF0ZS5nZXRFbnRyeShpZCk7XG5cbiAgICBpZiAoZW50cnkpIHtcbiAgICAgIHRoaXMuZW50cnkgPSB7IC4uLmVudHJ5IH07XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ2VkaXRvcicsIGlkLCB0aGlzLmVudHJ5KTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLmVudHJ5ID0gcHJvcHM7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgZGVsZXRlIHRoaXMuaWQ7XG4gICAgZGVsZXRlIHRoaXMuZW50cnk7XG4gICAgdGhpcy5lbWl0dGVyLmNsZWFyKCk7XG4gICAgdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGJsb2NrcyA9IFtdO1xuXG4gICAgaWYgKCF0aGlzLmVudHJ5KSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvclR5cGUgb25EaWRDaGFuZ2U9e3R5cGUgPT4gdGhpcy5oYW5kbGVDaGFuZ2VUeXBlKHR5cGUpfT5cbiAgICAgICAgICA8aDI+VHlwZTwvaDI+XG4gICAgICAgIDwvRWRpdG9yVHlwZT5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JOYW1lXG4gICAgICAgICAgZW50cnk9e3RoaXMuZW50cnl9XG4gICAgICAgICAgb25EaWRDaGFuZ2U9e3ZhbHVlID0+IHRoaXMuaGFuZGxlQ2hhbmdlTmFtZSh2YWx1ZSl9XG4gICAgICAgID5cbiAgICAgICAgICA8aDI+TmFtZTwvaDI+XG4gICAgICAgIDwvRWRpdG9yTmFtZT4sXG4gICAgICAgIDxJY29uc1xuICAgICAgICAgIGVudHJ5PXt0aGlzLmVudHJ5fVxuICAgICAgICAgIG9uRGlkQ2hhbmdlPXtpY29uID0+IHRoaXMuaGFuZGxlQ2hhbmdlSWNvbihpY29uKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxoMj5JY29uczwvaDI+XG4gICAgICAgIDwvSWNvbnM+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVudHJ5ICYmIHRoaXMuZW50cnkudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvclBhdGhzXG4gICAgICAgICAgZW50cnk9e3RoaXMuZW50cnl9XG4gICAgICAgICAgb25EaWRBZGRQYXRocz17cGF0aHMgPT4gdGhpcy5oYW5kbGVBZGRQYXRocyhwYXRocyl9XG4gICAgICAgICAgb25EaWRSZW1vdmVQYXRoPXtwYXRoID0+IHRoaXMuaGFuZGxlUmVtb3ZlUGF0aChwYXRoKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxoMj5QYXRoczwvaDI+XG4gICAgICAgIDwvRWRpdG9yUGF0aHM+XG4gICAgICApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmVudHJ5ICYmIHRoaXMuZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JPcmRlcj5cbiAgICAgICAgICA8aDI+T3JkZXI8L2gyPlxuICAgICAgICA8L0VkaXRvck9yZGVyPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvciBwYW5lLWl0ZW0gbmF0aXZlLWtleS1iaW5kaW5nc1wiPlxuICAgICAgICA8RWRpdG9yT3B0aW9ucyBvbmRpZENsaWNrPXthY3Rpb24gPT4gdGhpcy5oYW5kbGVDaGFuZ2VBY3Rpb24oYWN0aW9uKX0gLz5cbiAgICAgICAge2Jsb2Nrcy5tYXAoYmxvY2sgPT4gYmxvY2spfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19