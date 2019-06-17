'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class EditorPaths {
  /* eslint-disable-next-line require-jsdoc */
  didClick(event) {
    atom.pickFolder(paths => {
      console.log('pickFolders', event.type, paths);
      this.onDidChange(paths);
    });
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor(props, children) {
    console.log('created editor-paths component', props);

    this.onDidChange = props.onDidChange;
    this.paths = props.paths || [];
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
      )
    );
  }
}
exports.default = EditorPaths; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9wYXRocy5qcyJdLCJuYW1lcyI6WyJFZGl0b3JQYXRocyIsImRpZENsaWNrIiwiZXZlbnQiLCJhdG9tIiwicGlja0ZvbGRlciIsInBhdGhzIiwiY29uc29sZSIsImxvZyIsInR5cGUiLCJvbkRpZENoYW5nZSIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJjaGlsZHJlbiIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwibWFwIiwiY2hpbGQiLCJjbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsV0FBTixDQUFrQjtBQUMvQjtBQUNBQyxXQUFVQyxLQUFWLEVBQWlCO0FBQ2ZDLFNBQUtDLFVBQUwsQ0FBZ0JDLFNBQVM7QUFDdkJDLGNBQVFDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCTCxNQUFNTSxJQUFqQyxFQUF1Q0gsS0FBdkM7QUFDQSxXQUFLSSxXQUFMLENBQWlCSixLQUFqQjtBQUNELEtBSEQ7QUFJRDs7QUFFRDtBQUNBSyxjQUFhQyxLQUFiLEVBQW9CQyxRQUFwQixFQUE4QjtBQUM1Qk4sWUFBUUMsR0FBUixDQUFZLGdDQUFaLEVBQThDSSxLQUE5Qzs7QUFFQSxTQUFLRixXQUFMLEdBQW1CRSxNQUFNRixXQUF6QjtBQUNBLFNBQUtKLEtBQUwsR0FBYU0sTUFBTU4sS0FBTixJQUFlLEVBQTVCO0FBQ0EsU0FBS08sUUFBTCxHQUFnQkEsUUFBaEI7O0FBRUFDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjSixLQUFkLEVBQXFCO0FBQ25CTCxZQUFRQyxHQUFSLENBQVksZ0NBQVosRUFBOEMsSUFBOUMsRUFBb0RJLEtBQXBEOztBQUVBLFFBQUlBLEtBQUosRUFBVztBQUNULGFBQU9FLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZlosWUFBUUMsR0FBUixDQUFZLGtDQUFaLEVBQWdELElBQWhEO0FBQ0EsVUFBTU0sZUFBS0ssT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEO0FBQ0FDLFdBQVU7QUFDUmIsWUFBUUMsR0FBUixDQUFZLGlDQUFaLEVBQStDLElBQS9DOztBQUVBLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxpQkFBZjtBQUNHLFdBQUtLLFFBQUwsQ0FBY1EsR0FBZCxDQUFrQkMsU0FBU0EsS0FBM0IsQ0FESDtBQUVFO0FBQUE7QUFBQTtBQUNFLGNBQUk7QUFDRkMsbUJBQU8sS0FBS3JCO0FBRFYsV0FETjtBQUlFLHFCQUFVO0FBSlo7QUFBQTtBQUFBO0FBRkYsS0FERjtBQWFEO0FBMUQ4QjtrQkFBWkQsVyxFQUxyQiIsImZpbGUiOiJwYXRocy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yUGF0aHMge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICBhdG9tLnBpY2tGb2xkZXIocGF0aHMgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3BpY2tGb2xkZXJzJywgZXZlbnQudHlwZSwgcGF0aHMpO1xuICAgICAgdGhpcy5vbkRpZENoYW5nZShwYXRocyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZWRpdG9yLXBhdGhzIGNvbXBvbmVudCcsIHByb3BzKTtcblxuICAgIHRoaXMub25EaWRDaGFuZ2UgPSBwcm9wcy5vbkRpZENoYW5nZTtcbiAgICB0aGlzLnBhdGhzID0gcHJvcHMucGF0aHMgfHwgW107XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBlZGl0b3ItcGF0aHMgY29tcG9uZW50JywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBlZGl0b3ItcGF0aHMgY29tcG9uZW50JywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgZWRpdG9yLXBhdGhzIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2tcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXG4gICAgICAgID5cbiAgICAgICAgICBBZGQgcGF0aChzKVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==