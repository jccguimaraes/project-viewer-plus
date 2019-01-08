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
    if (props) {
      this.props = props;
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    this.emitter.clear();
    this.emitter.dispose();
    this.disposables.dispose();
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleIconClick(icon) {
    console.log(icon);
  }

  /* eslint-disable-next-line require-jsdoc */
  didClickDelete() {
    console.log(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  didClickUpdate() {
    console.log(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log(this.entry);
    const icon = this.entry ? this.entry.icon : undefined;
    const name = this.entry ? this.entry.name : '';

    return _etch2.default.dom(
      'div',
      { className: 'project-viewer-plus-editor pane-item native-key-bindings' },
      _etch2.default.dom(
        'div',
        { className: 'block-container' },
        _etch2.default.dom(_editor.EditorOptions, { pristine: !this.entry })
      ),
      _etch2.default.dom(
        'div',
        { className: 'block-container' },
        _etch2.default.dom(
          'h2',
          null,
          'Type'
        ),
        _etch2.default.dom(_editor.EditorType, null)
      ),
      _etch2.default.dom(
        'div',
        { className: 'block-container' },
        _etch2.default.dom(
          'h2',
          null,
          'Order'
        ),
        _etch2.default.dom(_editor.EditorOrder, null)
      ),
      _etch2.default.dom(
        'div',
        { className: 'block-container' },
        _etch2.default.dom(
          'h2',
          null,
          'Name'
        ),
        _etch2.default.dom(_editor.EditorName, { name: name })
      ),
      _etch2.default.dom(
        'div',
        { className: 'block-container' },
        _etch2.default.dom(
          'h2',
          null,
          'Icons'
        ),
        _etch2.default.dom(_icons2.default, { selected: icon, onIconClick: this.handleIconClick })
      ),
      _etch2.default.dom(
        'div',
        { className: 'block-container' },
        _etch2.default.dom(
          'h2',
          null,
          'Paths'
        ),
        _etch2.default.dom(_editor.EditorPaths, null)
      )
    );
  }
}
exports.default = EditorContainer; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJnZXRVUkkiLCJnZXRUaXRsZSIsImNvbnN0cnVjdG9yIiwiaWQiLCJjb25zb2xlIiwibG9nIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJlbnRyeSIsInN0YXRlIiwiZ2V0RW50cnkiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsInByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwiY2xlYXIiLCJkaXNwb3NlIiwiaGFuZGxlSWNvbkNsaWNrIiwiaWNvbiIsImRpZENsaWNrRGVsZXRlIiwiZGlkQ2xpY2tVcGRhdGUiLCJyZW5kZXIiLCJ1bmRlZmluZWQiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBT0E7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsZUFBTixDQUFzQjtBQUNuQztBQUNBQyxXQUFVO0FBQ1IsV0FBTyw0QkFBUDtBQUNEOztBQUVEO0FBQ0FDLGFBQVk7QUFDVixXQUFPLGNBQVA7QUFDRDs7QUFFRDtBQUNBQyxjQUFhQyxFQUFiLEVBQWlCO0FBQ2ZDLFlBQVFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QkYsRUFBOUI7O0FBRUEsU0FBS0csV0FBTCxHQUFtQixJQUFJQyx5QkFBSixFQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxhQUFKLEVBQWY7O0FBRUEsU0FBS0MsS0FBTCxHQUFhQyxnQkFBTUMsUUFBTixDQUFlVCxFQUFmLENBQWI7QUFDQUMsWUFBUUMsR0FBUixDQUFZLFFBQVosRUFBc0JGLEVBQXRCLEVBQTBCLEtBQUtPLEtBQS9COztBQUVBRyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY0MsS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFPSCxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0UsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2YsU0FBS1gsT0FBTCxDQUFhWSxLQUFiO0FBQ0EsU0FBS1osT0FBTCxDQUFhYSxPQUFiO0FBQ0EsU0FBS2YsV0FBTCxDQUFpQmUsT0FBakI7QUFDQSxVQUFNUixlQUFLTSxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUcsa0JBQWlCQyxJQUFqQixFQUF1QjtBQUNyQm5CLFlBQVFDLEdBQVIsQ0FBWWtCLElBQVo7QUFDRDs7QUFFRDtBQUNBQyxtQkFBa0I7QUFDaEJwQixZQUFRQyxHQUFSLENBQVksSUFBWjtBQUNEOztBQUVEO0FBQ0FvQixtQkFBa0I7QUFDaEJyQixZQUFRQyxHQUFSLENBQVksSUFBWjtBQUNEOztBQUVEO0FBQ0FxQixXQUFVO0FBQ1J0QixZQUFRQyxHQUFSLENBQVksS0FBS0ssS0FBakI7QUFDQSxVQUFNYSxPQUFPLEtBQUtiLEtBQUwsR0FBYSxLQUFLQSxLQUFMLENBQVdhLElBQXhCLEdBQStCSSxTQUE1QztBQUNBLFVBQU1DLE9BQU8sS0FBS2xCLEtBQUwsR0FBYSxLQUFLQSxLQUFMLENBQVdrQixJQUF4QixHQUErQixFQUE1Qzs7QUFFQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsMERBQWY7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0UsMkJBQUMscUJBQUQsSUFBZSxVQUFVLENBQUMsS0FBS2xCLEtBQS9CO0FBREYsT0FERjtBQUtFO0FBQUE7QUFBQSxVQUFLLFdBQVUsaUJBQWY7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREY7QUFFRSwyQkFBQyxrQkFBRDtBQUZGLE9BTEY7QUFVRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUUsMkJBQUMsbUJBQUQ7QUFGRixPQVZGO0FBZUU7QUFBQTtBQUFBLFVBQUssV0FBVSxpQkFBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFLDJCQUFDLGtCQUFELElBQVksTUFBTWtCLElBQWxCO0FBRkYsT0FmRjtBQW9CRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUUsMkJBQUMsZUFBRCxJQUFPLFVBQVVMLElBQWpCLEVBQXVCLGFBQWEsS0FBS0QsZUFBekM7QUFGRixPQXBCRjtBQXlCRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUUsMkJBQUMsbUJBQUQ7QUFGRjtBQXpCRixLQURGO0FBZ0NEO0FBbkdrQztrQkFBaEJ2QixlLEVBaEJyQiIsImZpbGUiOiJlZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuaW1wb3J0IEljb25zIGZyb20gJy4vaWNvbnMnO1xuaW1wb3J0IHtcbiAgRWRpdG9yVHlwZSxcbiAgRWRpdG9yT3JkZXIsXG4gIEVkaXRvck9wdGlvbnMsXG4gIEVkaXRvck5hbWUsXG4gIEVkaXRvclBhdGhzXG59IGZyb20gJy4uL2NvbXBvbmVudHMvZWRpdG9yJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JDb250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiAncHJvamVjdC12aWV3ZXItcGx1cy1lZGl0b3InO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VGl0bGUgKCkge1xuICAgIHJldHVybiAnUFZQIC0gRWRpdG9yJztcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChpZCkge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvcicsIGlkKTtcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICB0aGlzLmVudHJ5ID0gc3RhdGUuZ2V0RW50cnkoaWQpO1xuICAgIGNvbnNvbGUubG9nKCdlZGl0b3InLCBpZCwgdGhpcy5lbnRyeSk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuZW1pdHRlci5jbGVhcigpO1xuICAgIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlSWNvbkNsaWNrIChpY29uKSB7XG4gICAgY29uc29sZS5sb2coaWNvbik7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGlja0RlbGV0ZSAoKSB7XG4gICAgY29uc29sZS5sb2codGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGlja1VwZGF0ZSAoKSB7XG4gICAgY29uc29sZS5sb2codGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZW50cnkpO1xuICAgIGNvbnN0IGljb24gPSB0aGlzLmVudHJ5ID8gdGhpcy5lbnRyeS5pY29uIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmVudHJ5ID8gdGhpcy5lbnRyeS5uYW1lIDogJyc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvciBwYW5lLWl0ZW0gbmF0aXZlLWtleS1iaW5kaW5nc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxFZGl0b3JPcHRpb25zIHByaXN0aW5lPXshdGhpcy5lbnRyeX0gLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAgICA8aDI+VHlwZTwvaDI+XG4gICAgICAgICAgPEVkaXRvclR5cGUgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAgICA8aDI+T3JkZXI8L2gyPlxuICAgICAgICAgIDxFZGl0b3JPcmRlciAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMj5OYW1lPC9oMj5cbiAgICAgICAgICA8RWRpdG9yTmFtZSBuYW1lPXtuYW1lfSAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMj5JY29uczwvaDI+XG4gICAgICAgICAgPEljb25zIHNlbGVjdGVkPXtpY29ufSBvbkljb25DbGljaz17dGhpcy5oYW5kbGVJY29uQ2xpY2t9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgyPlBhdGhzPC9oMj5cbiAgICAgICAgICA8RWRpdG9yUGF0aHMgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=