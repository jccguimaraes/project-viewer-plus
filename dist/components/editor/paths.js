"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _path = _interopRequireDefault(require("./path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable-next-line require-jsdoc */
class EditorPaths {
  /* eslint-disable-next-line require-jsdoc */
  didClick(event) {
    atom.pickFolder(paths => {
      this.onDidAddPaths(paths);
    });
  }
  /* eslint-disable-next-line require-jsdoc */


  handleRemovePath(path) {
    this.onDidRemovePath(path);
  }
  /* eslint-disable-next-line require-jsdoc */


  constructor(props, children) {
    console.log('created editor-paths component', props, children);
    this.onDidAddPaths = props.onDidAddPaths;
    this.onDidRemovePath = props.onDidRemovePath;
    this.children = children;
    this.paths = props.entry.paths || [];

    _etch.default.initialize(this);
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      console.log('updated editor-paths component', _this, props);

      if (props) {
        _this.paths = props.entry.paths;
        return _etch.default.update(_this);
      }

      return Promise.resolve();
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      console.log('destroyed editor-paths component', _this2);
      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    console.log('rendered editor-paths component', this);
    return _etch.default.dom("div", {
      className: "block-container"
    }, this.children.map(child => child), _etch.default.dom("button", {
      on: {
        click: this.didClick
      },
      className: "btn btn-primary"
    }, "Add path(s)"), _etch.default.dom("ul", {
      class: "list-group"
    }, this.paths.map(path => _etch.default.dom(_path.default, {
      path: path,
      onDidRemovePath: path => this.handleRemovePath(path)
    }))));
  }

}

exports.default = EditorPaths;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9wYXRocy5qcyJdLCJuYW1lcyI6WyJFZGl0b3JQYXRocyIsImRpZENsaWNrIiwiZXZlbnQiLCJhdG9tIiwicGlja0ZvbGRlciIsInBhdGhzIiwib25EaWRBZGRQYXRocyIsImhhbmRsZVJlbW92ZVBhdGgiLCJwYXRoIiwib25EaWRSZW1vdmVQYXRoIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsImVudHJ5IiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJtYXAiLCJjaGlsZCIsImNsaWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBRUE7Ozs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxXQUFOLENBQWtCO0FBQy9CO0FBQ0FDLEVBQUFBLFFBQVEsQ0FBRUMsS0FBRixFQUFTO0FBQ2ZDLElBQUFBLElBQUksQ0FBQ0MsVUFBTCxDQUFnQkMsS0FBSyxJQUFJO0FBQ3ZCLFdBQUtDLGFBQUwsQ0FBbUJELEtBQW5CO0FBQ0QsS0FGRDtBQUdEO0FBRUQ7OztBQUNBRSxFQUFBQSxnQkFBZ0IsQ0FBRUMsSUFBRixFQUFRO0FBQ3RCLFNBQUtDLGVBQUwsQ0FBcUJELElBQXJCO0FBQ0Q7QUFFRDs7O0FBQ0FFLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTQyxRQUFULEVBQW1CO0FBQzVCQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4Q0gsS0FBOUMsRUFBcURDLFFBQXJEO0FBRUEsU0FBS04sYUFBTCxHQUFxQkssS0FBSyxDQUFDTCxhQUEzQjtBQUNBLFNBQUtHLGVBQUwsR0FBdUJFLEtBQUssQ0FBQ0YsZUFBN0I7QUFDQSxTQUFLRyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtQLEtBQUwsR0FBYU0sS0FBSyxDQUFDSSxLQUFOLENBQVlWLEtBQVosSUFBcUIsRUFBbEM7O0FBRUFXLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtNQyxFQUFBQSxNQUFOLENBQWNQLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQkUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0NBQVosRUFBOEMsS0FBOUMsRUFBb0RILEtBQXBEOztBQUVBLFVBQUlBLEtBQUosRUFBVztBQUNULFFBQUEsS0FBSSxDQUFDTixLQUFMLEdBQWFNLEtBQUssQ0FBQ0ksS0FBTixDQUFZVixLQUF6QjtBQUNBLGVBQU9XLGNBQUtFLE1BQUwsQ0FBWSxLQUFaLENBQVA7QUFDRDs7QUFFRCxhQUFPQyxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQVJtQjtBQVNwQjtBQUVEOzs7QUFDTUMsRUFBQUEsT0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2ZSLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtDQUFaLEVBQWdELE1BQWhEO0FBQ0EsWUFBTUUsY0FBS0ssT0FBTCxDQUFhLE1BQWIsQ0FBTjtBQUZlO0FBR2hCO0FBRUQ7OztBQUNBQyxFQUFBQSxNQUFNLEdBQUk7QUFDUlQsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUNBQVosRUFBK0MsSUFBL0M7QUFFQSxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNHLEtBQUtGLFFBQUwsQ0FBY1csR0FBZCxDQUFrQkMsS0FBSyxJQUFJQSxLQUEzQixDQURILEVBRUU7QUFDRSxNQUFBLEVBQUUsRUFBRTtBQUNGQyxRQUFBQSxLQUFLLEVBQUUsS0FBS3hCO0FBRFYsT0FETjtBQUlFLE1BQUEsU0FBUyxFQUFDO0FBSloscUJBRkYsRUFVRTtBQUFJLE1BQUEsS0FBSyxFQUFDO0FBQVYsT0FDRyxLQUFLSSxLQUFMLENBQVdrQixHQUFYLENBQWVmLElBQUksSUFDbEIsa0JBQUMsYUFBRDtBQUNFLE1BQUEsSUFBSSxFQUFFQSxJQURSO0FBRUUsTUFBQSxlQUFlLEVBQUVBLElBQUksSUFBSSxLQUFLRCxnQkFBTCxDQUFzQkMsSUFBdEI7QUFGM0IsTUFERCxDQURILENBVkYsQ0FERjtBQXFCRDs7QUF4RThCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbmltcG9ydCBFZGl0b3JQYXRoIGZyb20gJy4vcGF0aCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JQYXRocyB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIGF0b20ucGlja0ZvbGRlcihwYXRocyA9PiB7XG4gICAgICB0aGlzLm9uRGlkQWRkUGF0aHMocGF0aHMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlUmVtb3ZlUGF0aCAocGF0aCkge1xuICAgIHRoaXMub25EaWRSZW1vdmVQYXRoKHBhdGgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzLCBjaGlsZHJlbikge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvci1wYXRocyBjb21wb25lbnQnLCBwcm9wcywgY2hpbGRyZW4pO1xuXG4gICAgdGhpcy5vbkRpZEFkZFBhdGhzID0gcHJvcHMub25EaWRBZGRQYXRocztcbiAgICB0aGlzLm9uRGlkUmVtb3ZlUGF0aCA9IHByb3BzLm9uRGlkUmVtb3ZlUGF0aDtcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgdGhpcy5wYXRocyA9IHByb3BzLmVudHJ5LnBhdGhzIHx8IFtdO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBlZGl0b3ItcGF0aHMgY29tcG9uZW50JywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnBhdGhzID0gcHJvcHMuZW50cnkucGF0aHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBlZGl0b3ItcGF0aHMgY29tcG9uZW50JywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgZWRpdG9yLXBhdGhzIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2tcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXG4gICAgICAgID5cbiAgICAgICAgICBBZGQgcGF0aChzKVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiPlxuICAgICAgICAgIHt0aGlzLnBhdGhzLm1hcChwYXRoID0+IChcbiAgICAgICAgICAgIDxFZGl0b3JQYXRoXG4gICAgICAgICAgICAgIHBhdGg9e3BhdGh9XG4gICAgICAgICAgICAgIG9uRGlkUmVtb3ZlUGF0aD17cGF0aCA9PiB0aGlzLmhhbmRsZVJlbW92ZVBhdGgocGF0aCl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19