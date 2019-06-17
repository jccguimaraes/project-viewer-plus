'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
/** @jsx etch.dom */

class EditorPaths {
  /* eslint-disable-next-line require-jsdoc */
  didClick(event) {
    atom.pickFolder(paths => {
      this.onDidAddPaths(paths);
    });
  }

  /* eslint-disable-next-line require-jsdoc */
  didRemovePath(evt) {
    const path = evt.target.className.substr(12);
    this.onDidRemovePath(path);
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor(props, children) {
    console.log('created editor-paths component', props, children);

    this.onDidAddPaths = props.onDidAddPaths;
    this.onDidRemovePath = props.onDidRemovePath;
    this.paths = props.entry.paths || [];
    this.children = children;

    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    console.log('updated editor-paths component', this, props);

    if (props) {
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed editor-paths component', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered editor-paths component', this);

    return _etch2.default.dom(
      'div',
      { className: 'block-container' },
      this.children.map(child => child),
      _etch2.default.dom(
        'button',
        {
          on: {
            click: this.didClick
          },
          className: 'btn btn-primary'
        },
        'Add path(s)'
      ),
      _etch2.default.dom(
        'ul',
        { 'class': 'list-group' },
        this.paths.map(path => _etch2.default.dom(
          'li',
          { 'class': 'list-item' },
          _etch2.default.dom('span', {
            'class': 'icon icon-x ' + path,
            on: { click: this.didRemovePath }
          }),
          _etch2.default.dom(
            'span',
            null,
            path
          )
        ))
      )
    );
  }
}
exports.default = EditorPaths;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9wYXRocy5qcyJdLCJuYW1lcyI6WyJFZGl0b3JQYXRocyIsImRpZENsaWNrIiwiZXZlbnQiLCJhdG9tIiwicGlja0ZvbGRlciIsInBhdGhzIiwib25EaWRBZGRQYXRocyIsImRpZFJlbW92ZVBhdGgiLCJldnQiLCJwYXRoIiwidGFyZ2V0IiwiY2xhc3NOYW1lIiwic3Vic3RyIiwib25EaWRSZW1vdmVQYXRoIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsImVudHJ5IiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJtYXAiLCJjaGlsZCIsImNsaWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7QUFFQTtBQU5BOztBQU9lLE1BQU1BLFdBQU4sQ0FBa0I7QUFDL0I7QUFDQUMsV0FBVUMsS0FBVixFQUFpQjtBQUNmQyxTQUFLQyxVQUFMLENBQWdCQyxTQUFTO0FBQ3ZCLFdBQUtDLGFBQUwsQ0FBbUJELEtBQW5CO0FBQ0QsS0FGRDtBQUdEOztBQUVEO0FBQ0FFLGdCQUFlQyxHQUFmLEVBQW9CO0FBQ2xCLFVBQU1DLE9BQU9ELElBQUlFLE1BQUosQ0FBV0MsU0FBWCxDQUFxQkMsTUFBckIsQ0FBNEIsRUFBNUIsQ0FBYjtBQUNBLFNBQUtDLGVBQUwsQ0FBcUJKLElBQXJCO0FBQ0Q7O0FBRUQ7QUFDQUssY0FBYUMsS0FBYixFQUFvQkMsUUFBcEIsRUFBOEI7QUFDNUJDLFlBQVFDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4Q0gsS0FBOUMsRUFBcURDLFFBQXJEOztBQUVBLFNBQUtWLGFBQUwsR0FBcUJTLE1BQU1ULGFBQTNCO0FBQ0EsU0FBS08sZUFBTCxHQUF1QkUsTUFBTUYsZUFBN0I7QUFDQSxTQUFLUixLQUFMLEdBQWFVLE1BQU1JLEtBQU4sQ0FBWWQsS0FBWixJQUFxQixFQUFsQztBQUNBLFNBQUtXLFFBQUwsR0FBZ0JBLFFBQWhCOztBQUVBSSxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY1AsS0FBZCxFQUFxQjtBQUNuQkUsWUFBUUMsR0FBUixDQUFZLGdDQUFaLEVBQThDLElBQTlDLEVBQW9ESCxLQUFwRDs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxhQUFPSyxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2ZSLFlBQVFDLEdBQVIsQ0FBWSxrQ0FBWixFQUFnRCxJQUFoRDtBQUNBLFVBQU1FLGVBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBQyxXQUFVO0FBQ1JULFlBQVFDLEdBQVIsQ0FBWSxpQ0FBWixFQUErQyxJQUEvQzs7QUFFQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsaUJBQWY7QUFDRyxXQUFLRixRQUFMLENBQWNXLEdBQWQsQ0FBa0JDLFNBQVNBLEtBQTNCLENBREg7QUFFRTtBQUFBO0FBQUE7QUFDRSxjQUFJO0FBQ0ZDLG1CQUFPLEtBQUs1QjtBQURWLFdBRE47QUFJRSxxQkFBVTtBQUpaO0FBQUE7QUFBQSxPQUZGO0FBVUU7QUFBQTtBQUFBLFVBQUksU0FBTSxZQUFWO0FBQ0csYUFBS0ksS0FBTCxDQUFXc0IsR0FBWCxDQUFlbEIsUUFDZDtBQUFBO0FBQUEsWUFBSSxTQUFNLFdBQVY7QUFDRTtBQUNFLHFCQUFPLGlCQUFpQkEsSUFEMUI7QUFFRSxnQkFBSSxFQUFFb0IsT0FBTyxLQUFLdEIsYUFBZDtBQUZOLFlBREY7QUFLRTtBQUFBO0FBQUE7QUFBT0U7QUFBUDtBQUxGLFNBREQ7QUFESDtBQVZGLEtBREY7QUF3QkQ7QUEzRThCO2tCQUFaVCxXIiwiZmlsZSI6InBhdGhzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbmltcG9ydCBFZGl0b3JQYXRoIGZyb20gJy4vcGF0aCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JQYXRocyB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIGF0b20ucGlja0ZvbGRlcihwYXRocyA9PiB7XG4gICAgICB0aGlzLm9uRGlkQWRkUGF0aHMocGF0aHMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkUmVtb3ZlUGF0aCAoZXZ0KSB7XG4gICAgY29uc3QgcGF0aCA9IGV2dC50YXJnZXQuY2xhc3NOYW1lLnN1YnN0cigxMik7XG4gICAgdGhpcy5vbkRpZFJlbW92ZVBhdGgocGF0aCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZWRpdG9yLXBhdGhzIGNvbXBvbmVudCcsIHByb3BzLCBjaGlsZHJlbik7XG5cbiAgICB0aGlzLm9uRGlkQWRkUGF0aHMgPSBwcm9wcy5vbkRpZEFkZFBhdGhzO1xuICAgIHRoaXMub25EaWRSZW1vdmVQYXRoID0gcHJvcHMub25EaWRSZW1vdmVQYXRoO1xuICAgIHRoaXMucGF0aHMgPSBwcm9wcy5lbnRyeS5wYXRocyB8fCBbXTtcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIGVkaXRvci1wYXRocyBjb21wb25lbnQnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGVkaXRvci1wYXRocyBjb21wb25lbnQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBlZGl0b3ItcGF0aHMgY29tcG9uZW50JywgdGhpcyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAge3RoaXMuY2hpbGRyZW4ubWFwKGNoaWxkID0+IGNoaWxkKX1cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICBjbGljazogdGhpcy5kaWRDbGlja1xuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcbiAgICAgICAgPlxuICAgICAgICAgIEFkZCBwYXRoKHMpXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8dWwgY2xhc3M9XCJsaXN0LWdyb3VwXCI+XG4gICAgICAgICAge3RoaXMucGF0aHMubWFwKHBhdGggPT4gKFxuICAgICAgICAgICAgPGxpIGNsYXNzPVwibGlzdC1pdGVtXCI+XG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgY2xhc3M9eydpY29uIGljb24teCAnICsgcGF0aH1cbiAgICAgICAgICAgICAgICBvbj17eyBjbGljazogdGhpcy5kaWRSZW1vdmVQYXRoIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxzcGFuPntwYXRofTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=