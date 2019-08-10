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
      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9wYXRocy5qcyJdLCJuYW1lcyI6WyJFZGl0b3JQYXRocyIsImRpZENsaWNrIiwiZXZlbnQiLCJhdG9tIiwicGlja0ZvbGRlciIsInBhdGhzIiwib25EaWRBZGRQYXRocyIsImhhbmRsZVJlbW92ZVBhdGgiLCJwYXRoIiwib25EaWRSZW1vdmVQYXRoIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiZW50cnkiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsIm1hcCIsImNoaWxkIiwiY2xpY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7QUFFQTtBQUNlLE1BQU1BLFdBQU4sQ0FBa0I7QUFDL0I7QUFDQUMsRUFBQUEsUUFBUSxDQUFFQyxLQUFGLEVBQVM7QUFDZkMsSUFBQUEsSUFBSSxDQUFDQyxVQUFMLENBQWdCQyxLQUFLLElBQUk7QUFDdkIsV0FBS0MsYUFBTCxDQUFtQkQsS0FBbkI7QUFDRCxLQUZEO0FBR0Q7QUFFRDs7O0FBQ0FFLEVBQUFBLGdCQUFnQixDQUFFQyxJQUFGLEVBQVE7QUFDdEIsU0FBS0MsZUFBTCxDQUFxQkQsSUFBckI7QUFDRDtBQUVEOzs7QUFDQUUsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVNDLFFBQVQsRUFBbUI7QUFDNUIsU0FBS04sYUFBTCxHQUFxQkssS0FBSyxDQUFDTCxhQUEzQjtBQUNBLFNBQUtHLGVBQUwsR0FBdUJFLEtBQUssQ0FBQ0YsZUFBN0I7QUFDQSxTQUFLRyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtQLEtBQUwsR0FBYU0sS0FBSyxDQUFDRSxLQUFOLENBQVlSLEtBQVosSUFBcUIsRUFBbEM7O0FBRUFTLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtNQyxFQUFBQSxNQUFOLENBQWNMLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxRQUFBLEtBQUksQ0FBQ04sS0FBTCxHQUFhTSxLQUFLLENBQUNFLEtBQU4sQ0FBWVIsS0FBekI7QUFDQSxlQUFPUyxjQUFLRSxNQUFMLENBQVksS0FBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFObUI7QUFPcEI7QUFFRDs7O0FBQ01DLEVBQUFBLE9BQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmLFlBQU1MLGNBQUtLLE9BQUwsQ0FBYSxNQUFiLENBQU47QUFEZTtBQUVoQjtBQUVEOzs7QUFDQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1IsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRyxLQUFLUixRQUFMLENBQWNTLEdBQWQsQ0FBa0JDLEtBQUssSUFBSUEsS0FBM0IsQ0FESCxFQUVFO0FBQ0UsTUFBQSxFQUFFLEVBQUU7QUFDRkMsUUFBQUEsS0FBSyxFQUFFLEtBQUt0QjtBQURWLE9BRE47QUFJRSxNQUFBLFNBQVMsRUFBQztBQUpaLHFCQUZGLEVBVUU7QUFBSSxNQUFBLEtBQUssRUFBQztBQUFWLE9BQ0csS0FBS0ksS0FBTCxDQUFXZ0IsR0FBWCxDQUFlYixJQUFJLElBQ2xCLGtCQUFDLGFBQUQ7QUFDRSxNQUFBLElBQUksRUFBRUEsSUFEUjtBQUVFLE1BQUEsZUFBZSxFQUFFQSxJQUFJLElBQUksS0FBS0QsZ0JBQUwsQ0FBc0JDLElBQXRCO0FBRjNCLE1BREQsQ0FESCxDQVZGLENBREY7QUFxQkQ7O0FBakU4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG5pbXBvcnQgRWRpdG9yUGF0aCBmcm9tICcuL3BhdGgnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yUGF0aHMge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICBhdG9tLnBpY2tGb2xkZXIocGF0aHMgPT4ge1xuICAgICAgdGhpcy5vbkRpZEFkZFBhdGhzKHBhdGhzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZVJlbW92ZVBhdGggKHBhdGgpIHtcbiAgICB0aGlzLm9uRGlkUmVtb3ZlUGF0aChwYXRoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB0aGlzLm9uRGlkQWRkUGF0aHMgPSBwcm9wcy5vbkRpZEFkZFBhdGhzO1xuICAgIHRoaXMub25EaWRSZW1vdmVQYXRoID0gcHJvcHMub25EaWRSZW1vdmVQYXRoO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB0aGlzLnBhdGhzID0gcHJvcHMuZW50cnkucGF0aHMgfHwgW107XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wYXRocyA9IHByb3BzLmVudHJ5LnBhdGhzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2tcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXG4gICAgICAgID5cbiAgICAgICAgICBBZGQgcGF0aChzKVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiPlxuICAgICAgICAgIHt0aGlzLnBhdGhzLm1hcChwYXRoID0+IChcbiAgICAgICAgICAgIDxFZGl0b3JQYXRoXG4gICAgICAgICAgICAgIHBhdGg9e3BhdGh9XG4gICAgICAgICAgICAgIG9uRGlkUmVtb3ZlUGF0aD17cGF0aCA9PiB0aGlzLmhhbmRsZVJlbW92ZVBhdGgocGF0aCl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19