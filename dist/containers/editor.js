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
        null,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJoYW5kbGVDaGFuZ2VJY29uIiwiaWNvbiIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVDaGFuZ2VOYW1lIiwidmFsdWUiLCJlbnRyeSIsIm5hbWUiLCJoYW5kbGVDaGFuZ2VBY3Rpb24iLCJhY3Rpb24iLCJpZCIsInN0YXRlIiwiYWRkRW50cnkiLCJlZGl0RW50cnkiLCJhdG9tIiwid29ya3NwYWNlIiwiZ2V0QWN0aXZlUGFuZSIsImRlc3Ryb3lBY3RpdmVJdGVtIiwiaGFuZGxlQ2hhbmdlVHlwZSIsInR5cGUiLCJjcmVhdGVHcm91cCIsImNyZWF0ZVByb2plY3QiLCJ1cGRhdGUiLCJnZXRVUkkiLCJnZXRUaXRsZSIsImNvbnN0cnVjdG9yIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJnZXRFbnRyeSIsImV0Y2giLCJpbml0aWFsaXplIiwicHJvcHMiLCJkZXN0cm95IiwiY2xlYXIiLCJkaXNwb3NlIiwicmVuZGVyIiwiYmxvY2tzIiwicHVzaCIsIm1hcCIsImJsb2NrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7a1FBQUE7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztBQU9BOzs7Ozs7QUFFQTtBQUNlLE1BQU1BLGVBQU4sQ0FBc0I7QUFDbkM7QUFDQUMsbUJBQWtCQyxJQUFsQixFQUF3QjtBQUN0QkMsWUFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0Q7O0FBRUQ7QUFDQUcsbUJBQWtCQyxLQUFsQixFQUF5QjtBQUN2QixTQUFLQyxLQUFMLENBQVdDLElBQVgsR0FBa0JGLEtBQWxCO0FBQ0Q7O0FBRUQ7QUFDQUcscUJBQW9CQyxNQUFwQixFQUE0QjtBQUMxQlAsWUFBUUMsR0FBUixDQUFZTSxNQUFaLEVBQW9CLEtBQUtILEtBQXpCOztBQUVBLFFBQUksQ0FBQyxLQUFLSSxFQUFOLElBQVlELFdB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LEtBQW9CLFNBQXRDLEVBQWlEO0FBQy9DbUIsYUFBT0MsSUFBUCxDQUNFO0FBQUMsMkJBQUQ7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixPQURGO0FBS0QsS0FORCxNQU9LLElBQUksS0FBS2pDLEtBQUwsSUFBYyxLQUFLQSxLQUFMLENBQVdhLElBQVgsS0FBb0IsT0FBdEMsRUFBK0M7QUFDbERtQixhQUFPQyxJQUFQLENBQ0U7QUFBQywyQkFBRDtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLE9BREY7QUFLRDs7QUFFRCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsMERBQWY7QUFDRSx5QkFBQyxxQkFBRCxJQUFlLFlBQVk5QixVQUFVLEtBQUtELGtCQUFMLENBQXdCQyxNQUF4QixDQUFyQyxHQURGO0FBRUc2QixhQUFPRSxHQUFQLENBQVdDLFNBQVNBLEtBQXBCO0FBRkgsS0FERjtBQU1EO0FBeklrQztrQkFBaEIxQyxlIiwiZmlsZSI6ImVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG5pbXBvcnQgSWNvbnMgZnJvbSAnLi9pY29ucyc7XG5pbXBvcnQge1xuICBFZGl0b3JUeXBlLFxuICBFZGl0b3JPcmRlcixcbiAgRWRpdG9yT3B0aW9ucyxcbiAgRWRpdG9yTmFtZSxcbiAgRWRpdG9yUGF0aHNcbn0gZnJvbSAnLi4vY29tcG9uZW50cy9lZGl0b3InO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvckNvbnRhaW5lciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZUljb24gKGljb24pIHtcbiAgICBjb25zb2xlLmxvZyhpY29uKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZU5hbWUgKHZhbHVlKSB7XG4gICAgdGhpcy5lbnRyeS5uYW1lID0gdmFsdWU7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VBY3Rpb24gKGFjdGlvbikge1xuICAgIGNvbnNvbGUubG9nKGFjdGlvbiwgdGhpcy5lbnRyeSk7XG5cbiAgICBpZiAoIXRoaXMuaWQgJiYgYWN0aW9uID09PSAnc2F2ZScpIHtcbiAgICAgIHN0YXRlLmFkZEVudHJ5KHRoaXMuZW50cnkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChhY3Rpb24gPT09ICdzYXZlJykge1xuICAgICAgc3RhdGUuZWRpdEVudHJ5KHRoaXMuaWQsIHRoaXMuZW50cnkpO1xuICAgIH1cblxuICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKS5kZXN0cm95QWN0aXZlSXRlbSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlVHlwZSAodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICB0aGlzLmVudHJ5ID0gc3RhdGUuY3JlYXRlR3JvdXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmVudHJ5ID0gc3RhdGUuY3JlYXRlUHJvamVjdCgpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmVudHJ5KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZUljb24gKGljb24pIHtcbiAgICB0aGlzLmVudHJ5Lmljb24gPSBpY29uO1xuICAgIHRoaXMudXBkYXRlKHRoaXMuZW50cnkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VVJJICgpIHtcbiAgICByZXR1cm4gJ3Byb2plY3Qtdmlld2VyLXBsdXMtZWRpdG9yJztcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFRpdGxlICgpIHtcbiAgICByZXR1cm4gJ1BWUCAtIEVkaXRvcic7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAoaWQpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBlZGl0b3InLCBpZCk7XG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIGNvbnN0IGVudHJ5ID0gc3RhdGUuZ2V0RW50cnkoaWQpO1xuXG4gICAgaWYgKGVudHJ5KSB7XG4gICAgICB0aGlzLmVudHJ5ID0geyAuLi5lbnRyeSB9O1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdlZGl0b3InLCBpZCwgdGhpcy5lbnRyeSk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgdGhpcy5lbnRyeSA9IHByb3BzO1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGRlbGV0ZSB0aGlzLmlkO1xuICAgIGRlbGV0ZSB0aGlzLmVudHJ5O1xuICAgIHRoaXMuZW1pdHRlci5jbGVhcigpO1xuICAgIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBibG9ja3MgPSBbXTtcblxuICAgIGlmICghdGhpcy5lbnRyeSkge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JUeXBlIG9uRGlkQ2hhbmdlPXt0eXBlID0+IHRoaXMuaGFuZGxlQ2hhbmdlVHlwZSh0eXBlKX0+XG4gICAgICAgICAgPGgyPlR5cGU8L2gyPlxuICAgICAgICA8L0VkaXRvclR5cGU+XG4gICAgICApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGJsb2Nrcy5wdXNoKFxuICAgICAgICA8RWRpdG9yTmFtZVxuICAgICAgICAgIGVudHJ5PXt0aGlzLmVudHJ5fVxuICAgICAgICAgIG9uRGlkQ2hhbmdlPXt2YWx1ZSA9PiB0aGlzLmhhbmRsZUNoYW5nZU5hbWUodmFsdWUpfVxuICAgICAgICA+XG4gICAgICAgICAgPGgyPk5hbWU8L2gyPlxuICAgICAgICA8L0VkaXRvck5hbWU+LFxuICAgICAgICA8SWNvbnNcbiAgICAgICAgICBlbnRyeT17dGhpcy5lbnRyeX1cbiAgICAgICAgICBvbkRpZENoYW5nZT17aWNvbiA9PiB0aGlzLmhhbmRsZUNoYW5nZUljb24oaWNvbil9XG4gICAgICAgID5cbiAgICAgICAgICA8aDI+SWNvbnM8L2gyPlxuICAgICAgICA8L0ljb25zPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbnRyeSAmJiB0aGlzLmVudHJ5LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JQYXRocz5cbiAgICAgICAgICA8aDI+UGF0aHM8L2gyPlxuICAgICAgICA8L0VkaXRvclBhdGhzPlxuICAgICAgKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5lbnRyeSAmJiB0aGlzLmVudHJ5LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgIGJsb2Nrcy5wdXNoKFxuICAgICAgICA8RWRpdG9yT3JkZXI+XG4gICAgICAgICAgPGgyPk9yZGVyPC9oMj5cbiAgICAgICAgPC9FZGl0b3JPcmRlcj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvamVjdC12aWV3ZXItcGx1cy1lZGl0b3IgcGFuZS1pdGVtIG5hdGl2ZS1rZXktYmluZGluZ3NcIj5cbiAgICAgICAgPEVkaXRvck9wdGlvbnMgb25kaWRDbGljaz17YWN0aW9uID0+IHRoaXMuaGFuZGxlQ2hhbmdlQWN0aW9uKGFjdGlvbil9IC8+XG4gICAgICAgIHtibG9ja3MubWFwKGJsb2NrID0+IGJsb2NrKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==