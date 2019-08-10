"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable-next-line require-jsdoc */
class EditorOptions {
  /* eslint-disable-next-line require-jsdoc */
  onDidClick(action) {
    this.didClick(action);
  }
  /* eslint-disable-next-line require-jsdoc */


  constructor(props) {
    this.didClick = props.onDidClick;
    this.actions = props.allowedActions;

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
        _this.actions = props.allowedActions;
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
    var allowDelete = this.actions.includes('delete') ? 'btn btn-error inline-block-tight' : 'btn hide';
    var allowSave = this.actions.includes('save') ? 'btn btn-success inline-block-tight' : 'btn hide';
    return _etch.default.dom("div", {
      className: "block-container as-row"
    }, _etch.default.dom("button", {
      on: {
        click: () => this.onDidClick('delete')
      },
      className: allowDelete
    }, "Delete"), _etch.default.dom("button", {
      on: {
        click: () => this.onDidClick('cancel')
      },
      className: "btn btn-info inline-block-tight"
    }, "Cancel"), _etch.default.dom("button", {
      on: {
        click: () => this.onDidClick('save')
      },
      className: allowSave
    }, "Save"));
  }

}

exports.default = EditorOptions;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9vcHRpb25zLmpzIl0sIm5hbWVzIjpbIkVkaXRvck9wdGlvbnMiLCJvbkRpZENsaWNrIiwiYWN0aW9uIiwiZGlkQ2xpY2siLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiYWN0aW9ucyIsImFsbG93ZWRBY3Rpb25zIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJhbGxvd0RlbGV0ZSIsImluY2x1ZGVzIiwiYWxsb3dTYXZlIiwiY2xpY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7Ozs7Ozs7QUFFQTtBQUNlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7QUFDQUMsRUFBQUEsVUFBVSxDQUFFQyxNQUFGLEVBQVU7QUFDbEIsU0FBS0MsUUFBTCxDQUFjRCxNQUFkO0FBQ0Q7QUFFRDs7O0FBQ0FFLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTO0FBQ2xCLFNBQUtGLFFBQUwsR0FBZ0JFLEtBQUssQ0FBQ0osVUFBdEI7QUFDQSxTQUFLSyxPQUFMLEdBQWVELEtBQUssQ0FBQ0UsY0FBckI7O0FBQ0FDLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtNQyxFQUFBQSxNQUFOLENBQWNMLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxRQUFBLEtBQUksQ0FBQ0MsT0FBTCxHQUFlRCxLQUFLLENBQUNFLGNBQXJCO0FBQ0EsZUFBT0MsY0FBS0UsTUFBTCxDQUFZLEtBQVosQ0FBUDtBQUNEOztBQUVELGFBQU9DLE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBTm1CO0FBT3BCO0FBRUQ7OztBQUNNQyxFQUFBQSxPQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixZQUFNTCxjQUFLSyxPQUFMLENBQWEsTUFBYixDQUFOO0FBRGU7QUFFaEI7QUFFRDs7O0FBQ0FDLEVBQUFBLE1BQU0sR0FBSTtBQUNSLFFBQU1DLFdBQVcsR0FBRyxLQUFLVCxPQUFMLENBQWFVLFFBQWIsQ0FBc0IsUUFBdEIsSUFDaEIsa0NBRGdCLEdBRWhCLFVBRko7QUFJQSxRQUFNQyxTQUFTLEdBQUcsS0FBS1gsT0FBTCxDQUFhVSxRQUFiLENBQXNCLE1BQXRCLElBQ2Qsb0NBRGMsR0FFZCxVQUZKO0FBSUEsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRTtBQUNFLE1BQUEsRUFBRSxFQUFFO0FBQ0ZFLFFBQUFBLEtBQUssRUFBRSxNQUFNLEtBQUtqQixVQUFMLENBQWdCLFFBQWhCO0FBRFgsT0FETjtBQUlFLE1BQUEsU0FBUyxFQUFFYztBQUpiLGdCQURGLEVBU0U7QUFDRSxNQUFBLEVBQUUsRUFBRTtBQUNGRyxRQUFBQSxLQUFLLEVBQUUsTUFBTSxLQUFLakIsVUFBTCxDQUFnQixRQUFoQjtBQURYLE9BRE47QUFJRSxNQUFBLFNBQVMsRUFBQztBQUpaLGdCQVRGLEVBaUJFO0FBQ0UsTUFBQSxFQUFFLEVBQUU7QUFDRmlCLFFBQUFBLEtBQUssRUFBRSxNQUFNLEtBQUtqQixVQUFMLENBQWdCLE1BQWhCO0FBRFgsT0FETjtBQUlFLE1BQUEsU0FBUyxFQUFFZ0I7QUFKYixjQWpCRixDQURGO0FBNEJEOztBQXRFZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvck9wdGlvbnMge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBvbkRpZENsaWNrIChhY3Rpb24pIHtcbiAgICB0aGlzLmRpZENsaWNrKGFjdGlvbik7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLmRpZENsaWNrID0gcHJvcHMub25EaWRDbGljaztcbiAgICB0aGlzLmFjdGlvbnMgPSBwcm9wcy5hbGxvd2VkQWN0aW9ucztcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5hY3Rpb25zID0gcHJvcHMuYWxsb3dlZEFjdGlvbnM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBhbGxvd0RlbGV0ZSA9IHRoaXMuYWN0aW9ucy5pbmNsdWRlcygnZGVsZXRlJylcbiAgICAgID8gJ2J0biBidG4tZXJyb3IgaW5saW5lLWJsb2NrLXRpZ2h0J1xuICAgICAgOiAnYnRuIGhpZGUnO1xuXG4gICAgY29uc3QgYWxsb3dTYXZlID0gdGhpcy5hY3Rpb25zLmluY2x1ZGVzKCdzYXZlJylcbiAgICAgID8gJ2J0biBidG4tc3VjY2VzcyBpbmxpbmUtYmxvY2stdGlnaHQnXG4gICAgICA6ICdidG4gaGlkZSc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXIgYXMtcm93XCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMub25EaWRDbGljaygnZGVsZXRlJylcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17YWxsb3dEZWxldGV9XG4gICAgICAgID5cbiAgICAgICAgICBEZWxldGVcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMub25EaWRDbGljaygnY2FuY2VsJylcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4taW5mbyBpbmxpbmUtYmxvY2stdGlnaHRcIlxuICAgICAgICA+XG4gICAgICAgICAgQ2FuY2VsXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLm9uRGlkQ2xpY2soJ3NhdmUnKVxuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPXthbGxvd1NhdmV9XG4gICAgICAgID5cbiAgICAgICAgICBTYXZlXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19