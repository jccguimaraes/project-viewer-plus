'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class EditorOptions {
  /* eslint-disable-next-line require-jsdoc */
  onDidClick(action) {
    this.didClick(action);
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor(props) {
    console.log('created editor-options component', props);

    this.didClick = props.ondidClick;
    this.pristine = props.pristine;
    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    console.log('updated editor-options component', this, props);

    if (props) {
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed editor-options component', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered editor-options component', this);

    return _etch2.default.dom(
      'div',
      { className: 'block-container as-row' },
      _etch2.default.dom(
        'button',
        {
          on: {
            click: () => this.onDidClick('delete')
          },
          className: 'btn btn-error inline-block-tight'
        },
        'Delete'
      ),
      _etch2.default.dom(
        'button',
        {
          on: {
            click: () => this.onDidClick('cancel')
          },
          className: 'btn btn-info inline-block-tight'
        },
        'Cancel'
      ),
      _etch2.default.dom(
        'button',
        {
          on: {
            click: () => this.onDidClick(this.pristine ? 'create' : 'edit')
          },
          className: 'btn btn-success inline-block-tight'
        },
        this.pristine ? 'Create' : 'Edit'
      )
    );
  }
}
exports.default = EditorOptions; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9vcHRpb25zLmpzIl0sIm5hbWVzIjpbIkVkaXRvck9wdGlvbnMiLCJvbkRpZENsaWNrIiwiYWN0aW9uIiwiZGlkQ2xpY2siLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY29uc29sZSIsImxvZyIsIm9uZGlkQ2xpY2siLCJwcmlzdGluZSIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7Ozs7QUFFQTtBQUNlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7QUFDQUMsYUFBWUMsTUFBWixFQUFvQjtBQUNsQixTQUFLQyxRQUFMLENBQWNELE1BQWQ7QUFDRDs7QUFFRDtBQUNBRSxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCQyxZQUFRQyxHQUFSLENBQVksa0NBQVosRUFBZ0RGLEtBQWhEOztBQUVBLFNBQUtGLFFBQUwsR0FBZ0JFLE1BQU1HLFVBQXRCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkosTUFBTUksUUFBdEI7QUFDQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNQLEtBQWQsRUFBcUI7QUFDbkJDLFlBQVFDLEdBQVIsQ0FBWSxrQ0FBWixFQUFnRCxJQUFoRCxFQUFzREYsS0FBdEQ7O0FBRUEsUUFBSUEsS0FBSixFQUFXO0FBQ1QsYUFBT0ssZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmVCxZQUFRQyxHQUFSLENBQVksb0NBQVosRUFBa0QsSUFBbEQ7QUFDQSxVQUFNRyxlQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSVixZQUFRQyxHQUFSLENBQVksbUNBQVosRUFBaUQsSUFBakQ7O0FBRUEsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLHdCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsY0FBSTtBQUNGVSxtQkFBTyxNQUFNLEtBQUtoQixVQUFMLENBQWdCLFFBQWhCO0FBRFgsV0FETjtBQUlFLHFCQUFVO0FBSlo7QUFBQTtBQUFBLE9BREY7QUFTRTtBQUFBO0FBQUE7QUFDRSxjQUFJO0FBQ0ZnQixtQkFBTyxNQUFNLEtBQUtoQixVQUFMLENBQWdCLFFBQWhCO0FBRFgsV0FETjtBQUlFLHFCQUFVO0FBSlo7QUFBQTtBQUFBLE9BVEY7QUFpQkU7QUFBQTtBQUFBO0FBQ0UsY0FBSTtBQUNGZ0IsbUJBQU8sTUFBTSxLQUFLaEIsVUFBTCxDQUFnQixLQUFLUSxRQUFMLEdBQWdCLFFBQWhCLEdBQTJCLE1BQTNDO0FBRFgsV0FETjtBQUlFLHFCQUFVO0FBSlo7QUFNRyxhQUFLQSxRQUFMLEdBQWdCLFFBQWhCLEdBQTJCO0FBTjlCO0FBakJGLEtBREY7QUE0QkQ7QUFwRWdDO2tCQUFkVCxhLEVBTHJCIiwiZmlsZSI6Im9wdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvck9wdGlvbnMge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBvbkRpZENsaWNrIChhY3Rpb24pIHtcbiAgICB0aGlzLmRpZENsaWNrKGFjdGlvbik7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBlZGl0b3Itb3B0aW9ucyBjb21wb25lbnQnLCBwcm9wcyk7XG5cbiAgICB0aGlzLmRpZENsaWNrID0gcHJvcHMub25kaWRDbGljaztcbiAgICB0aGlzLnByaXN0aW5lID0gcHJvcHMucHJpc3RpbmU7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBlZGl0b3Itb3B0aW9ucyBjb21wb25lbnQnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGVkaXRvci1vcHRpb25zIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGVkaXRvci1vcHRpb25zIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyIGFzLXJvd1wiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLm9uRGlkQ2xpY2soJ2RlbGV0ZScpXG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWVycm9yIGlubGluZS1ibG9jay10aWdodFwiXG4gICAgICAgID5cbiAgICAgICAgICBEZWxldGVcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMub25EaWRDbGljaygnY2FuY2VsJylcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4taW5mbyBpbmxpbmUtYmxvY2stdGlnaHRcIlxuICAgICAgICA+XG4gICAgICAgICAgQ2FuY2VsXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLm9uRGlkQ2xpY2sodGhpcy5wcmlzdGluZSA/ICdjcmVhdGUnIDogJ2VkaXQnKVxuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGlubGluZS1ibG9jay10aWdodFwiXG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5wcmlzdGluZSA/ICdDcmVhdGUnIDogJ0VkaXQnfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==