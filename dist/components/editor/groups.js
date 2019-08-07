"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _listSelector = _interopRequireDefault(require("../list-selector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable-next-line require-jsdoc */
class EditorGroups {
  /* eslint-disable-next-line require-jsdoc */
  updateEntry(props) {
    this.groups = props.groups;
    this.selectedId = props.selectedId;
    this.didClick = props.onDidClick;
  }
  /* eslint-disable-next-line require-jsdoc */


  constructor(props, children) {
    console.log('created editor-groups component', props, children);
    this.children = children;
    this.updateEntry(props);

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
      console.log('updated editor-groups component', _this, props);

      if (props) {
        _this.updateEntry(props);

        return _etch.default.update(_this);
      }

      return Promise.resolve();
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      console.log('destroyed editor-groups component', _this2);
      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    console.log('rendered editor-groups component', this);
    return _etch.default.dom("div", {
      className: "block-container"
    }, this.children.map(child => child), _etch.default.dom(_listSelector.default, {
      groups: this.groups,
      selectedId: this.selectedId,
      onDidClick: this.didClick
    }));
  }

}

exports.default = EditorGroups;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9ncm91cHMuanMiXSwibmFtZXMiOlsiRWRpdG9yR3JvdXBzIiwidXBkYXRlRW50cnkiLCJwcm9wcyIsImdyb3VwcyIsInNlbGVjdGVkSWQiLCJkaWRDbGljayIsIm9uRGlkQ2xpY2siLCJjb25zdHJ1Y3RvciIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwibWFwIiwiY2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7QUFFQTtBQUNlLE1BQU1BLFlBQU4sQ0FBbUI7QUFDaEM7QUFDQUMsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVM7QUFDbEIsU0FBS0MsTUFBTCxHQUFjRCxLQUFLLENBQUNDLE1BQXBCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkYsS0FBSyxDQUFDRSxVQUF4QjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JILEtBQUssQ0FBQ0ksVUFBdEI7QUFDRDtBQUVEOzs7QUFDQUMsRUFBQUEsV0FBVyxDQUFFTCxLQUFGLEVBQVNNLFFBQVQsRUFBbUI7QUFDNUJDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlDQUFaLEVBQStDUixLQUEvQyxFQUFzRE0sUUFBdEQ7QUFFQSxTQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtQLFdBQUwsQ0FBaUJDLEtBQWpCOztBQUVBUyxrQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEO0FBRUQ7Ozs7Ozs7QUFLTUMsRUFBQUEsTUFBTixDQUFjWCxLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkJPLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlDQUFaLEVBQStDLEtBQS9DLEVBQXFEUixLQUFyRDs7QUFFQSxVQUFJQSxLQUFKLEVBQVc7QUFDVCxRQUFBLEtBQUksQ0FBQ0QsV0FBTCxDQUFpQkMsS0FBakI7O0FBQ0EsZUFBT1MsY0FBS0UsTUFBTCxDQUFZLEtBQVosQ0FBUDtBQUNEOztBQUVELGFBQU9DLE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBUm1CO0FBU3BCO0FBRUQ7OztBQUNNQyxFQUFBQSxPQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZlAsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksbUNBQVosRUFBaUQsTUFBakQ7QUFDQSxZQUFNQyxjQUFLSyxPQUFMLENBQWEsTUFBYixDQUFOO0FBRmU7QUFHaEI7QUFFRDs7O0FBQ0FDLEVBQUFBLE1BQU0sR0FBSTtBQUNSUixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQ0FBWixFQUFnRCxJQUFoRDtBQUVBLFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0csS0FBS0YsUUFBTCxDQUFjVSxHQUFkLENBQWtCQyxLQUFLLElBQUlBLEtBQTNCLENBREgsRUFHRSxrQkFBQyxxQkFBRDtBQUNFLE1BQUEsTUFBTSxFQUFFLEtBQUtoQixNQURmO0FBRUUsTUFBQSxVQUFVLEVBQUUsS0FBS0MsVUFGbkI7QUFHRSxNQUFBLFVBQVUsRUFBRSxLQUFLQztBQUhuQixNQUhGLENBREY7QUFXRDs7QUF2RCtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbmltcG9ydCBMaXN0U2VsZWN0b3IgZnJvbSAnLi4vbGlzdC1zZWxlY3Rvcic7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JHcm91cHMge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB1cGRhdGVFbnRyeSAocHJvcHMpIHtcbiAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICB0aGlzLnNlbGVjdGVkSWQgPSBwcm9wcy5zZWxlY3RlZElkO1xuICAgIHRoaXMuZGlkQ2xpY2sgPSBwcm9wcy5vbkRpZENsaWNrO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzLCBjaGlsZHJlbikge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvci1ncm91cHMgY29tcG9uZW50JywgcHJvcHMsIGNoaWxkcmVuKTtcblxuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZWRpdG9yLWdyb3VwcyBjb21wb25lbnQnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgZWRpdG9yLWdyb3VwcyBjb21wb25lbnQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBlZGl0b3ItZ3JvdXBzIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG5cbiAgICAgICAgPExpc3RTZWxlY3RvclxuICAgICAgICAgIGdyb3Vwcz17dGhpcy5ncm91cHN9XG4gICAgICAgICAgc2VsZWN0ZWRJZD17dGhpcy5zZWxlY3RlZElkfVxuICAgICAgICAgIG9uRGlkQ2xpY2s9e3RoaXMuZGlkQ2xpY2t9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=