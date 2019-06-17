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
    this.entry.paths.push(paths);
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
        { onDidChange: paths => this.handleChangePaths(paths) },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJoYW5kbGVDaGFuZ2VJY29uIiwiaWNvbiIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVDaGFuZ2VOYW1lIiwidmFsdWUiLCJlbnRyeSIsIm5hbWUiLCJoYW5kbGVDaGFuZ2VBY3Rpb24iLCJhY3Rpb24iLCJpZCIsInN0YXRlIiwiYWRkRW50cnkiLCJlZGl0RW50cnkiLCJhdG9tIiwid29ya3NwYWNlIiwiZ2V0QWN0aXZlUGFuZSIsImRlc3Ryb3lBY3RpdmVJdGVtIiwiaGFuZGxlQ2hhbmdlVHlwZSIsInR5cGUiLCJjcmVhdGVHcm91cCIsImNyZWF0ZVByb2plY3QiLCJ1cGRhdGUiLCJoYW5kbGVBZGRQYXRocyIsInBhdGhzIiwicHVzaCIsImdldFVSSSIsImdldFRpdGxlIiwiY29uc3RydWN0b3IiLCJkaXNwb3NhYmxlcyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJlbWl0dGVyIiwiRW1pdHRlciIsImdldEVudHJ5IiwiZXRjaCIsImluaXRpYWxpemUiLCJwcm9wcyIsImRlc3Ryb3kiLCJjbGVhciIsImRpc3Bvc2UiLCJyZW5kZXIiLCJibG9ja3MiLCJoYW5kbGVDaGFuZ2VQYXRocyIsIm1hcCIsImJsb2NrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7a1FBQUE7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztBQU9BOzs7Ozs7QUFFQTtBQUNlLE1BQU1BLGVBQU4sQ0FBc0I7QUFDbkM7QUFDQUMsbUJBQWtCQyxJQUFsQixFQUF3QjtBQUN0QkMsWUFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0Q7O0FBRUQ7QUFDQUcsbUJBQWtCQyxLQUFsQixFQUF5QjtBQUN2QixTQUFLQyxLQUFMLENBQVdDLElBQVgsR0FBa0JGLEtBQWxCO0FBQ0Q7O0FBRUQ7QUFDQUcscUJBQW9CQyxNQUFwQixFQUE0QjtBQUMxQlAsWUFBUUMsR0FBUixDQUFZTSxNQUFaLEVBQW9CLEtB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O0FBQUMsdUJBQUQ7QUFBQTtBQUNFLGlCQUFPLEtBQUtDLEtBRGQ7QUFFRSx1QkFBYUwsUUFBUSxLQUFLRCxnQkFBTCxDQUFzQkMsSUFBdEI7QUFGdkI7QUFJRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSkYsT0FQRjtBQWNEOztBQUVELFFBQUksS0FBS0ssS0FBTCxJQUFjLEtBQUtBLEtBQUwsQ0FBV2EsSUFBWCxLQUFvQixTQUF0QyxFQUFpRDtBQUMvQ3NCLGFBQU9oQixJQUFQLENBQ0U7QUFBQywyQkFBRDtBQUFBLFVBQWEsYUFBYUQsU0FBUyxLQUFLa0IsaUJBQUwsQ0FBdUJsQixLQUF2QixDQUFuQztBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixPQURGO0FBS0QsS0FORCxNQU9LLElBQUksS0FBS2xCLEtBQUwsSUFBYyxLQUFLQSxLQUFMLENBQVdhLElBQVgsS0FBb0IsT0FBdEMsRUFBK0M7QUFDbERzQixhQUFPaEIsSUFBUCxDQUNFO0FBQUMsMkJBQUQ7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixPQURGO0FBS0Q7O0FBRUQsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLDBEQUFmO0FBQ0UseUJBQUMscUJBQUQsSUFBZSxZQUFZaEIsVUFBVSxLQUFLRCxrQkFBTCxDQUF3QkMsTUFBeEIsQ0FBckMsR0FERjtBQUVHZ0MsYUFBT0UsR0FBUCxDQUFXQyxTQUFTQSxLQUFwQjtBQUZILEtBREY7QUFNRDtBQS9Ja0M7a0JBQWhCN0MsZSIsImZpbGUiOiJlZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuaW1wb3J0IEljb25zIGZyb20gJy4vaWNvbnMnO1xuaW1wb3J0IHtcbiAgRWRpdG9yVHlwZSxcbiAgRWRpdG9yT3JkZXIsXG4gIEVkaXRvck9wdGlvbnMsXG4gIEVkaXRvck5hbWUsXG4gIEVkaXRvclBhdGhzXG59IGZyb20gJy4uL2NvbXBvbmVudHMvZWRpdG9yJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JDb250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VJY29uIChpY29uKSB7XG4gICAgY29uc29sZS5sb2coaWNvbik7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VOYW1lICh2YWx1ZSkge1xuICAgIHRoaXMuZW50cnkubmFtZSA9IHZhbHVlO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlQWN0aW9uIChhY3Rpb24pIHtcbiAgICBjb25zb2xlLmxvZyhhY3Rpb24sIHRoaXMuZW50cnkpO1xuXG4gICAgaWYgKCF0aGlzLmlkICYmIGFjdGlvbiA9PT0gJ3NhdmUnKSB7XG4gICAgICBzdGF0ZS5hZGRFbnRyeSh0aGlzLmVudHJ5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYWN0aW9uID09PSAnc2F2ZScpIHtcbiAgICAgIHN0YXRlLmVkaXRFbnRyeSh0aGlzLmlkLCB0aGlzLmVudHJ5KTtcbiAgICB9XG5cbiAgICBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lKCkuZGVzdHJveUFjdGl2ZUl0ZW0oKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZVR5cGUgKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgdGhpcy5lbnRyeSA9IHN0YXRlLmNyZWF0ZUdyb3VwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5lbnRyeSA9IHN0YXRlLmNyZWF0ZVByb2plY3QoKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGUodGhpcy5lbnRyeSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VJY29uIChpY29uKSB7XG4gICAgdGhpcy5lbnRyeS5pY29uID0gaWNvbjtcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmVudHJ5KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUFkZFBhdGhzIChwYXRocykge1xuICAgIHRoaXMuZW50cnkucGF0aHMucHVzaChwYXRocyk7XG4gICAgdGhpcy51cGRhdGUodGhpcy5lbnRyeSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiAncHJvamVjdC12aWV3ZXItcGx1cy1lZGl0b3InO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VGl0bGUgKCkge1xuICAgIHJldHVybiAnUFZQIC0gRWRpdG9yJztcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChpZCkge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvcicsIGlkKTtcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgY29uc3QgZW50cnkgPSBzdGF0ZS5nZXRFbnRyeShpZCk7XG5cbiAgICBpZiAoZW50cnkpIHtcbiAgICAgIHRoaXMuZW50cnkgPSB7IC4uLmVudHJ5IH07XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ2VkaXRvcicsIGlkLCB0aGlzLmVudHJ5KTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLmVudHJ5ID0gcHJvcHM7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgZGVsZXRlIHRoaXMuaWQ7XG4gICAgZGVsZXRlIHRoaXMuZW50cnk7XG4gICAgdGhpcy5lbWl0dGVyLmNsZWFyKCk7XG4gICAgdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGJsb2NrcyA9IFtdO1xuXG4gICAgaWYgKCF0aGlzLmVudHJ5KSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvclR5cGUgb25EaWRDaGFuZ2U9e3R5cGUgPT4gdGhpcy5oYW5kbGVDaGFuZ2VUeXBlKHR5cGUpfT5cbiAgICAgICAgICA8aDI+VHlwZTwvaDI+XG4gICAgICAgIDwvRWRpdG9yVHlwZT5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JOYW1lXG4gICAgICAgICAgZW50cnk9e3RoaXMuZW50cnl9XG4gICAgICAgICAgb25EaWRDaGFuZ2U9e3ZhbHVlID0+IHRoaXMuaGFuZGxlQ2hhbmdlTmFtZSh2YWx1ZSl9XG4gICAgICAgID5cbiAgICAgICAgICA8aDI+TmFtZTwvaDI+XG4gICAgICAgIDwvRWRpdG9yTmFtZT4sXG4gICAgICAgIDxJY29uc1xuICAgICAgICAgIGVudHJ5PXt0aGlzLmVudHJ5fVxuICAgICAgICAgIG9uRGlkQ2hhbmdlPXtpY29uID0+IHRoaXMuaGFuZGxlQ2hhbmdlSWNvbihpY29uKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxoMj5JY29uczwvaDI+XG4gICAgICAgIDwvSWNvbnM+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVudHJ5ICYmIHRoaXMuZW50cnkudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvclBhdGhzIG9uRGlkQ2hhbmdlPXtwYXRocyA9PiB0aGlzLmhhbmRsZUNoYW5nZVBhdGhzKHBhdGhzKX0+XG4gICAgICAgICAgPGgyPlBhdGhzPC9oMj5cbiAgICAgICAgPC9FZGl0b3JQYXRocz5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuZW50cnkgJiYgdGhpcy5lbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvck9yZGVyPlxuICAgICAgICAgIDxoMj5PcmRlcjwvaDI+XG4gICAgICAgIDwvRWRpdG9yT3JkZXI+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2plY3Qtdmlld2VyLXBsdXMtZWRpdG9yIHBhbmUtaXRlbSBuYXRpdmUta2V5LWJpbmRpbmdzXCI+XG4gICAgICAgIDxFZGl0b3JPcHRpb25zIG9uZGlkQ2xpY2s9e2FjdGlvbiA9PiB0aGlzLmhhbmRsZUNoYW5nZUFjdGlvbihhY3Rpb24pfSAvPlxuICAgICAgICB7YmxvY2tzLm1hcChibG9jayA9PiBibG9jayl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=