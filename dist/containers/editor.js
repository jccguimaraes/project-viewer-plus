'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    this.entry = _state2.default.getEntry(id);
    console.log('editor', id, this.entry);

    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    this.entry = props;
    return _etch2.default.update(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    this.emitter.clear();
    this.emitter.dispose();
    this.disposables.dispose();
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    const icon = this.entry ? this.entry.icon : undefined;
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
        { selected: icon, onIconClick: this.handleIconClick },
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
exports.default = EditorContainer; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJoYW5kbGVDaGFuZ2VJY29uIiwiaWNvbiIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVDaGFuZ2VOYW1lIiwidmFsdWUiLCJlbnRyeSIsIm5hbWUiLCJoYW5kbGVDaGFuZ2VBY3Rpb24iLCJhY3Rpb24iLCJpZCIsInN0YXRlIiwiYWRkRW50cnkiLCJlZGl0RW50cnkiLCJhdG9tIiwid29ya3NwYWNlIiwiZ2V0QWN0aXZlUGFuZSIsImRlc3Ryb3lBY3RpdmVJdGVtIiwiaGFuZGxlQ2hhbmdlVHlwZSIsInR5cGUiLCJjcmVhdGVHcm91cCIsImNyZWF0ZVByb2plY3QiLCJ1cGRhdGUiLCJnZXRVUkkiLCJnZXRUaXRsZSIsImNvbnN0cnVjdG9yIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJnZXRFbnRyeSIsImV0Y2giLCJpbml0aWFsaXplIiwicHJvcHMiLCJkZXN0cm95IiwiY2xlYXIiLCJkaXNwb3NlIiwicmVuZGVyIiwidW5kZWZpbmVkIiwiYmxvY2tzIiwicHVzaCIsImhhbmRsZUljb25DbGljayIsIm1hcCIsImJsb2NrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBT0E7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsZUFBTixDQUFzQjtBQUNuQztBQUNBQyxtQkFBa0JDLElBQWxCLEVBQXdCO0FBQ3RCQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDRDs7QUFFRDtBQUNBRyxtQkFBa0JDLEtBQWxCLEVBQXlCO0FBQ3ZCLFNBQUtDLEtBQUwsQ0FBV0MsSUFBWCxHQUFrQkYsS0FBbEI7QUFDRDs7QUFFRDtBQUNBRyxxQkFBb0JDLE1BQXBCLEVBQTRCO0FBQzFCUCxZQUFRQyxHQUFSLENBQVlNLE1BQVosRUFBb0IsS0FBS0gsS0FBekI7O0FBRUEsUUFBSSxD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LENBQVdhLElBQVgsS0FBb0IsT0FBdEMsRUFBK0M7QUFDbERvQixhQUFPQyxJQUFQLENBQ0U7QUFBQywyQkFBRDtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLE9BREY7QUFLRDs7QUFFRCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsMERBQWY7QUFDRSx5QkFBQyxxQkFBRCxJQUFlLFlBQVkvQixVQUFVLEtBQUtELGtCQUFMLENBQXdCQyxNQUF4QixDQUFyQyxHQURGO0FBRUc4QixhQUFPRyxHQUFQLENBQVdDLFNBQVNBLEtBQXBCO0FBRkgsS0FERjtBQU1EO0FBL0hrQztrQkFBaEI1QyxlLEVBaEJyQiIsImZpbGUiOiJlZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuaW1wb3J0IEljb25zIGZyb20gJy4vaWNvbnMnO1xuaW1wb3J0IHtcbiAgRWRpdG9yVHlwZSxcbiAgRWRpdG9yT3JkZXIsXG4gIEVkaXRvck9wdGlvbnMsXG4gIEVkaXRvck5hbWUsXG4gIEVkaXRvclBhdGhzXG59IGZyb20gJy4uL2NvbXBvbmVudHMvZWRpdG9yJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JDb250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VJY29uIChpY29uKSB7XG4gICAgY29uc29sZS5sb2coaWNvbik7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VOYW1lICh2YWx1ZSkge1xuICAgIHRoaXMuZW50cnkubmFtZSA9IHZhbHVlO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlQWN0aW9uIChhY3Rpb24pIHtcbiAgICBjb25zb2xlLmxvZyhhY3Rpb24sIHRoaXMuZW50cnkpO1xuXG4gICAgaWYgKCF0aGlzLmlkICYmIGFjdGlvbiA9PT0gJ3NhdmUnKSB7XG4gICAgICBzdGF0ZS5hZGRFbnRyeSh0aGlzLmVudHJ5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYWN0aW9uID09PSAnc2F2ZScpIHtcbiAgICAgIHN0YXRlLmVkaXRFbnRyeSh0aGlzLmlkLCB0aGlzLmVudHJ5KTtcbiAgICB9XG5cbiAgICBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lKCkuZGVzdHJveUFjdGl2ZUl0ZW0oKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZVR5cGUgKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgdGhpcy5lbnRyeSA9IHN0YXRlLmNyZWF0ZUdyb3VwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5lbnRyeSA9IHN0YXRlLmNyZWF0ZVByb2plY3QoKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGUodGhpcy5lbnRyeSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiAncHJvamVjdC12aWV3ZXItcGx1cy1lZGl0b3InO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VGl0bGUgKCkge1xuICAgIHJldHVybiAnUFZQIC0gRWRpdG9yJztcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChpZCkge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvcicsIGlkKTtcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5lbnRyeSA9IHN0YXRlLmdldEVudHJ5KGlkKTtcbiAgICBjb25zb2xlLmxvZygnZWRpdG9yJywgaWQsIHRoaXMuZW50cnkpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLmVudHJ5ID0gcHJvcHM7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5lbWl0dGVyLmNsZWFyKCk7XG4gICAgdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGljb24gPSB0aGlzLmVudHJ5ID8gdGhpcy5lbnRyeS5pY29uIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGJsb2NrcyA9IFtdO1xuXG4gICAgaWYgKCF0aGlzLmVudHJ5KSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvclR5cGUgb25EaWRDaGFuZ2U9e3R5cGUgPT4gdGhpcy5oYW5kbGVDaGFuZ2VUeXBlKHR5cGUpfT5cbiAgICAgICAgICA8aDI+VHlwZTwvaDI+XG4gICAgICAgIDwvRWRpdG9yVHlwZT5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JOYW1lXG4gICAgICAgICAgZW50cnk9e3RoaXMuZW50cnl9XG4gICAgICAgICAgb25EaWRDaGFuZ2U9e3ZhbHVlID0+IHRoaXMuaGFuZGxlQ2hhbmdlTmFtZSh2YWx1ZSl9XG4gICAgICAgID5cbiAgICAgICAgICA8aDI+TmFtZTwvaDI+XG4gICAgICAgIDwvRWRpdG9yTmFtZT4sXG4gICAgICAgIDxJY29ucyBzZWxlY3RlZD17aWNvbn0gb25JY29uQ2xpY2s9e3RoaXMuaGFuZGxlSWNvbkNsaWNrfT5cbiAgICAgICAgICA8aDI+SWNvbnM8L2gyPlxuICAgICAgICA8L0ljb25zPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbnRyeSAmJiB0aGlzLmVudHJ5LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JQYXRocz5cbiAgICAgICAgICA8aDI+UGF0aHM8L2gyPlxuICAgICAgICA8L0VkaXRvclBhdGhzPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlbHNlIGlmICh0aGlzLmVudHJ5ICYmIHRoaXMuZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JPcmRlcj5cbiAgICAgICAgICA8aDI+T3JkZXI8L2gyPlxuICAgICAgICA8L0VkaXRvck9yZGVyPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvciBwYW5lLWl0ZW0gbmF0aXZlLWtleS1iaW5kaW5nc1wiPlxuICAgICAgICA8RWRpdG9yT3B0aW9ucyBvbmRpZENsaWNrPXthY3Rpb24gPT4gdGhpcy5oYW5kbGVDaGFuZ2VBY3Rpb24oYWN0aW9uKX0gLz5cbiAgICAgICAge2Jsb2Nrcy5tYXAoYmxvY2sgPT4gYmxvY2spfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19