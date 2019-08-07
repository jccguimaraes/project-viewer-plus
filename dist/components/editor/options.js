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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9vcHRpb25zLmpzIl0sIm5hbWVzIjpbIkVkaXRvck9wdGlvbnMiLCJvbkRpZENsaWNrIiwiYWN0aW9uIiwiZGlkQ2xpY2siLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY29uc29sZSIsImxvZyIsImFjdGlvbnMiLCJhbGxvd2VkQWN0aW9ucyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiYWxsb3dEZWxldGUiLCJpbmNsdWRlcyIsImFsbG93U2F2ZSIsImNsaWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxhQUFOLENBQW9CO0FBQ2pDO0FBQ0FDLEVBQUFBLFVBQVUsQ0FBRUMsTUFBRixFQUFVO0FBQ2xCLFNBQUtDLFFBQUwsQ0FBY0QsTUFBZDtBQUNEO0FBRUQ7OztBQUNBRSxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBUztBQUNsQkMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0NBQVosRUFBZ0RGLEtBQWhEO0FBRUEsU0FBS0YsUUFBTCxHQUFnQkUsS0FBSyxDQUFDSixVQUF0QjtBQUNBLFNBQUtPLE9BQUwsR0FBZUgsS0FBSyxDQUFDSSxjQUFyQjs7QUFDQUMsa0JBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDtBQUVEOzs7Ozs7O0FBS01DLEVBQUFBLE1BQU4sQ0FBY1AsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQ0FBWixFQUFnRCxLQUFoRCxFQUFzREYsS0FBdEQ7O0FBRUEsVUFBSUEsS0FBSixFQUFXO0FBQ1QsUUFBQSxLQUFJLENBQUNHLE9BQUwsR0FBZUgsS0FBSyxDQUFDSSxjQUFyQjtBQUNBLGVBQU9DLGNBQUtFLE1BQUwsQ0FBWSxLQUFaLENBQVA7QUFDRDs7QUFFRCxhQUFPQyxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQVJtQjtBQVNwQjtBQUVEOzs7QUFDTUMsRUFBQUEsT0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2ZULE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9DQUFaLEVBQWtELE1BQWxEO0FBQ0EsWUFBTUcsY0FBS0ssT0FBTCxDQUFhLE1BQWIsQ0FBTjtBQUZlO0FBR2hCO0FBRUQ7OztBQUNBQyxFQUFBQSxNQUFNLEdBQUk7QUFDUlYsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksbUNBQVosRUFBaUQsSUFBakQ7QUFFQSxRQUFNVSxXQUFXLEdBQUcsS0FBS1QsT0FBTCxDQUFhVSxRQUFiLENBQXNCLFFBQXRCLElBQ2hCLGtDQURnQixHQUVoQixVQUZKO0FBSUEsUUFBTUMsU0FBUyxHQUFHLEtBQUtYLE9BQUwsQ0FBYVUsUUFBYixDQUFzQixNQUF0QixJQUNkLG9DQURjLEdBRWQsVUFGSjtBQUlBLFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0U7QUFDRSxNQUFBLEVBQUUsRUFBRTtBQUNGRSxRQUFBQSxLQUFLLEVBQUUsTUFBTSxLQUFLbkIsVUFBTCxDQUFnQixRQUFoQjtBQURYLE9BRE47QUFJRSxNQUFBLFNBQVMsRUFBRWdCO0FBSmIsZ0JBREYsRUFTRTtBQUNFLE1BQUEsRUFBRSxFQUFFO0FBQ0ZHLFFBQUFBLEtBQUssRUFBRSxNQUFNLEtBQUtuQixVQUFMLENBQWdCLFFBQWhCO0FBRFgsT0FETjtBQUlFLE1BQUEsU0FBUyxFQUFDO0FBSlosZ0JBVEYsRUFpQkU7QUFDRSxNQUFBLEVBQUUsRUFBRTtBQUNGbUIsUUFBQUEsS0FBSyxFQUFFLE1BQU0sS0FBS25CLFVBQUwsQ0FBZ0IsTUFBaEI7QUFEWCxPQUROO0FBSUUsTUFBQSxTQUFTLEVBQUVrQjtBQUpiLGNBakJGLENBREY7QUE0QkQ7O0FBN0VnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yT3B0aW9ucyB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIG9uRGlkQ2xpY2sgKGFjdGlvbikge1xuICAgIHRoaXMuZGlkQ2xpY2soYWN0aW9uKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvci1vcHRpb25zIGNvbXBvbmVudCcsIHByb3BzKTtcblxuICAgIHRoaXMuZGlkQ2xpY2sgPSBwcm9wcy5vbkRpZENsaWNrO1xuICAgIHRoaXMuYWN0aW9ucyA9IHByb3BzLmFsbG93ZWRBY3Rpb25zO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZWRpdG9yLW9wdGlvbnMgY29tcG9uZW50JywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLmFjdGlvbnMgPSBwcm9wcy5hbGxvd2VkQWN0aW9ucztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGVkaXRvci1vcHRpb25zIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGVkaXRvci1vcHRpb25zIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgY29uc3QgYWxsb3dEZWxldGUgPSB0aGlzLmFjdGlvbnMuaW5jbHVkZXMoJ2RlbGV0ZScpXG4gICAgICA/ICdidG4gYnRuLWVycm9yIGlubGluZS1ibG9jay10aWdodCdcbiAgICAgIDogJ2J0biBoaWRlJztcblxuICAgIGNvbnN0IGFsbG93U2F2ZSA9IHRoaXMuYWN0aW9ucy5pbmNsdWRlcygnc2F2ZScpXG4gICAgICA/ICdidG4gYnRuLXN1Y2Nlc3MgaW5saW5lLWJsb2NrLXRpZ2h0J1xuICAgICAgOiAnYnRuIGhpZGUnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyIGFzLXJvd1wiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLm9uRGlkQ2xpY2soJ2RlbGV0ZScpXG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9e2FsbG93RGVsZXRlfVxuICAgICAgICA+XG4gICAgICAgICAgRGVsZXRlXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLm9uRGlkQ2xpY2soJ2NhbmNlbCcpXG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWluZm8gaW5saW5lLWJsb2NrLXRpZ2h0XCJcbiAgICAgICAgPlxuICAgICAgICAgIENhbmNlbFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICBjbGljazogKCkgPT4gdGhpcy5vbkRpZENsaWNrKCdzYXZlJylcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17YWxsb3dTYXZlfVxuICAgICAgICA+XG4gICAgICAgICAgU2F2ZVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==