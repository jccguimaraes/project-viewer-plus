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
    console.log('created editor-options component', props);
    this.didClick = props.ondidClick;
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
      console.log('updated editor-options component', _this, props);

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
      console.log('destroyed editor-options component', _this2);
      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    console.log('rendered editor-options component', this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9vcHRpb25zLmpzIl0sIm5hbWVzIjpbIkVkaXRvck9wdGlvbnMiLCJvbkRpZENsaWNrIiwiYWN0aW9uIiwiZGlkQ2xpY2siLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY29uc29sZSIsImxvZyIsIm9uZGlkQ2xpY2siLCJhY3Rpb25zIiwiYWxsb3dlZEFjdGlvbnMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsImFsbG93RGVsZXRlIiwiaW5jbHVkZXMiLCJhbGxvd1NhdmUiLCJjbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsYUFBTixDQUFvQjtBQUNqQztBQUNBQyxFQUFBQSxVQUFVLENBQUVDLE1BQUYsRUFBVTtBQUNsQixTQUFLQyxRQUFMLENBQWNELE1BQWQ7QUFDRDtBQUVEOzs7QUFDQUUsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVM7QUFDbEJDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtDQUFaLEVBQWdERixLQUFoRDtBQUVBLFNBQUtGLFFBQUwsR0FBZ0JFLEtBQUssQ0FBQ0csVUFBdEI7QUFDQSxTQUFLQyxPQUFMLEdBQWVKLEtBQUssQ0FBQ0ssY0FBckI7O0FBQ0FDLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtNQyxFQUFBQSxNQUFOLENBQWNSLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQkMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0NBQVosRUFBZ0QsS0FBaEQsRUFBc0RGLEtBQXREOztBQUVBLFVBQUlBLEtBQUosRUFBVztBQUNULFFBQUEsS0FBSSxDQUFDSSxPQUFMLEdBQWVKLEtBQUssQ0FBQ0ssY0FBckI7QUFDQSxlQUFPQyxjQUFLRSxNQUFMLENBQVksS0FBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFSbUI7QUFTcEI7QUFFRDs7O0FBQ01DLEVBQUFBLE9BQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmVixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxvQ0FBWixFQUFrRCxNQUFsRDtBQUNBLFlBQU1JLGNBQUtLLE9BQUwsQ0FBYSxNQUFiLENBQU47QUFGZTtBQUdoQjtBQUVEOzs7QUFDQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1JYLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1DQUFaLEVBQWlELElBQWpEO0FBRUEsUUFBTVcsV0FBVyxHQUFHLEtBQUtULE9BQUwsQ0FBYVUsUUFBYixDQUFzQixRQUF0QixJQUNoQixrQ0FEZ0IsR0FFaEIsVUFGSjtBQUlBLFFBQU1DLFNBQVMsR0FBRyxLQUFLWCxPQUFMLENBQWFVLFFBQWIsQ0FBc0IsTUFBdEIsSUFDZCxvQ0FEYyxHQUVkLFVBRko7QUFJQSxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNFO0FBQ0UsTUFBQSxFQUFFLEVBQUU7QUFDRkUsUUFBQUEsS0FBSyxFQUFFLE1BQU0sS0FBS3BCLFVBQUwsQ0FBZ0IsUUFBaEI7QUFEWCxPQUROO0FBSUUsTUFBQSxTQUFTLEVBQUVpQjtBQUpiLGdCQURGLEVBU0U7QUFDRSxNQUFBLEVBQUUsRUFBRTtBQUNGRyxRQUFBQSxLQUFLLEVBQUUsTUFBTSxLQUFLcEIsVUFBTCxDQUFnQixRQUFoQjtBQURYLE9BRE47QUFJRSxNQUFBLFNBQVMsRUFBQztBQUpaLGdCQVRGLEVBaUJFO0FBQ0UsTUFBQSxFQUFFLEVBQUU7QUFDRm9CLFFBQUFBLEtBQUssRUFBRSxNQUFNLEtBQUtwQixVQUFMLENBQWdCLE1BQWhCO0FBRFgsT0FETjtBQUlFLE1BQUEsU0FBUyxFQUFFbUI7QUFKYixjQWpCRixDQURGO0FBNEJEOztBQTdFZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvck9wdGlvbnMge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBvbkRpZENsaWNrIChhY3Rpb24pIHtcbiAgICB0aGlzLmRpZENsaWNrKGFjdGlvbik7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBlZGl0b3Itb3B0aW9ucyBjb21wb25lbnQnLCBwcm9wcyk7XG5cbiAgICB0aGlzLmRpZENsaWNrID0gcHJvcHMub25kaWRDbGljaztcbiAgICB0aGlzLmFjdGlvbnMgPSBwcm9wcy5hbGxvd2VkQWN0aW9ucztcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIGVkaXRvci1vcHRpb25zIGNvbXBvbmVudCcsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5hY3Rpb25zID0gcHJvcHMuYWxsb3dlZEFjdGlvbnM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBlZGl0b3Itb3B0aW9ucyBjb21wb25lbnQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBlZGl0b3Itb3B0aW9ucyBjb21wb25lbnQnLCB0aGlzKTtcblxuICAgIGNvbnN0IGFsbG93RGVsZXRlID0gdGhpcy5hY3Rpb25zLmluY2x1ZGVzKCdkZWxldGUnKVxuICAgICAgPyAnYnRuIGJ0bi1lcnJvciBpbmxpbmUtYmxvY2stdGlnaHQnXG4gICAgICA6ICdidG4gaGlkZSc7XG5cbiAgICBjb25zdCBhbGxvd1NhdmUgPSB0aGlzLmFjdGlvbnMuaW5jbHVkZXMoJ3NhdmUnKVxuICAgICAgPyAnYnRuIGJ0bi1zdWNjZXNzIGlubGluZS1ibG9jay10aWdodCdcbiAgICAgIDogJ2J0biBoaWRlJztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lciBhcy1yb3dcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICBjbGljazogKCkgPT4gdGhpcy5vbkRpZENsaWNrKCdkZWxldGUnKVxuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPXthbGxvd0RlbGV0ZX1cbiAgICAgICAgPlxuICAgICAgICAgIERlbGV0ZVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICBjbGljazogKCkgPT4gdGhpcy5vbkRpZENsaWNrKCdjYW5jZWwnKVxuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvIGlubGluZS1ibG9jay10aWdodFwiXG4gICAgICAgID5cbiAgICAgICAgICBDYW5jZWxcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMub25EaWRDbGljaygnc2F2ZScpXG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9e2FsbG93U2F2ZX1cbiAgICAgICAgPlxuICAgICAgICAgIFNhdmVcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=