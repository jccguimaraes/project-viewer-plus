"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _atom = require("atom");

var _etch = _interopRequireDefault(require("etch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable-next-line require-jsdoc */
class IconComponent {
  /* eslint-disable-next-line require-jsdoc */
  handleClick() {
    this.element.classList.toggle('selected');
    this.selected = this.element.classList.contains('selected');
    this.onDidClick(this.selected ? this.icon : '');
  }
  /* eslint-disable-next-line require-jsdoc */


  handleMouseOver() {
    this.disposables.add(atom.tooltips.add(this.element, {
      title: this.icon,
      delay: {
        show: 500
      },
      class: 'pvp-tooltip'
    }));
  }
  /* eslint-disable-next-line require-jsdoc */


  handleMouseLeave() {
    this.disposables.dispose();
  }
  /* eslint-disable-next-line require-jsdoc */


  get events() {
    return {
      click: this.handleClick,
      mouseover: this.handleMouseOver,
      mouseleave: this.handleMouseLeave
    };
  }
  /* eslint-disable-next-line require-jsdoc */


  constructor(props) {
    this.icon = props.icon;
    this.selected = props.selected;
    this.onDidClick = props.onDidClick;
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();

    _etch.default.initialize(this);
  }
  /**
   *
   */


  destroy() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _etch.default.destroy(_this);
    })();
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  update(props) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (props) {
        _this2.icon = props.icon;
        _this2.selected = props.selected || false;
        return _etch.default.update(_this2);
      }

      return Promise.resolve();
    })();
  }
  /**
   *
   * @returns {Object} description
   */


  render() {
    var iconClass = this.icon ? "icon ".concat(this.icon, "-icon ").concat(this.selected ? 'selected' : '') : 'icon default-icon';
    return _etch.default.dom("span", {
      on: this.events,
      className: iconClass
    });
  }

}

exports.default = IconComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2ljb24uanMiXSwibmFtZXMiOlsiSWNvbkNvbXBvbmVudCIsImhhbmRsZUNsaWNrIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInNlbGVjdGVkIiwiY29udGFpbnMiLCJvbkRpZENsaWNrIiwiaWNvbiIsImhhbmRsZU1vdXNlT3ZlciIsImRpc3Bvc2FibGVzIiwiYWRkIiwiYXRvbSIsInRvb2x0aXBzIiwidGl0bGUiLCJkZWxheSIsInNob3ciLCJjbGFzcyIsImhhbmRsZU1vdXNlTGVhdmUiLCJkaXNwb3NlIiwiZXZlbnRzIiwiY2xpY2siLCJtb3VzZW92ZXIiLCJtb3VzZWxlYXZlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJlbWl0dGVyIiwiRW1pdHRlciIsImV0Y2giLCJpbml0aWFsaXplIiwiZGVzdHJveSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVuZGVyIiwiaWNvbkNsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxhQUFOLENBQW9CO0FBQ2pDO0FBQ0FDLEVBQUFBLFdBQVcsR0FBSTtBQUNiLFNBQUtDLE9BQUwsQ0FBYUMsU0FBYixDQUF1QkMsTUFBdkIsQ0FBOEIsVUFBOUI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQUtILE9BQUwsQ0FBYUMsU0FBYixDQUF1QkcsUUFBdkIsQ0FBZ0MsVUFBaEMsQ0FBaEI7QUFDQSxTQUFLQyxVQUFMLENBQWdCLEtBQUtGLFFBQUwsR0FBZ0IsS0FBS0csSUFBckIsR0FBMkIsRUFBM0M7QUFDRDtBQUVEOzs7QUFDQUMsRUFBQUEsZUFBZSxHQUFJO0FBQ2pCLFNBQUtDLFdBQUwsQ0FBaUJDLEdBQWpCLENBQ0VDLElBQUksQ0FBQ0MsUUFBTCxDQUFjRixHQUFkLENBQWtCLEtBQUtULE9BQXZCLEVBQWdDO0FBQzlCWSxNQUFBQSxLQUFLLEVBQUUsS0FBS04sSUFEa0I7QUFFOUJPLE1BQUFBLEtBQUssRUFBRTtBQUNMQyxRQUFBQSxJQUFJLEVBQUU7QUFERCxPQUZ1QjtBQUs5QkMsTUFBQUEsS0FBSyxFQUFFO0FBTHVCLEtBQWhDLENBREY7QUFTRDtBQUVEOzs7QUFDQUMsRUFBQUEsZ0JBQWdCLEdBQUk7QUFDbEIsU0FBS1IsV0FBTCxDQUFpQlMsT0FBakI7QUFDRDtBQUVEOzs7QUFDQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPO0FBQ0xDLE1BQUFBLEtBQUssRUFBRSxLQUFLcEIsV0FEUDtBQUVMcUIsTUFBQUEsU0FBUyxFQUFFLEtBQUtiLGVBRlg7QUFHTGMsTUFBQUEsVUFBVSxFQUFFLEtBQUtMO0FBSFosS0FBUDtBQUtEO0FBRUQ7OztBQUNBTSxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBUztBQUNsQixTQUFLakIsSUFBTCxHQUFZaUIsS0FBSyxDQUFDakIsSUFBbEI7QUFDQSxTQUFLSCxRQUFMLEdBQWdCb0IsS0FBSyxDQUFDcEIsUUFBdEI7QUFDQSxTQUFLRSxVQUFMLEdBQWtCa0IsS0FBSyxDQUFDbEIsVUFBeEI7QUFDQSxTQUFLRyxXQUFMLEdBQW1CLElBQUlnQix5QkFBSixFQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxhQUFKLEVBQWY7O0FBRUFDLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7QUFHTUMsRUFBQUEsT0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTUYsY0FBS0UsT0FBTCxDQUFhLEtBQWIsQ0FBTjtBQURlO0FBRWhCO0FBRUQ7Ozs7Ozs7QUFLTUMsRUFBQUEsTUFBTixDQUFjUCxLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsVUFBSUEsS0FBSixFQUFXO0FBQ1QsUUFBQSxNQUFJLENBQUNqQixJQUFMLEdBQVlpQixLQUFLLENBQUNqQixJQUFsQjtBQUNBLFFBQUEsTUFBSSxDQUFDSCxRQUFMLEdBQWdCb0IsS0FBSyxDQUFDcEIsUUFBTixJQUFrQixLQUFsQztBQUNBLGVBQU93QixjQUFLRyxNQUFMLENBQVksTUFBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFQbUI7QUFRcEI7QUFFRDs7Ozs7O0FBSUFDLEVBQUFBLE1BQU0sR0FBSTtBQUNSLFFBQU1DLFNBQVMsR0FBRyxLQUFLNUIsSUFBTCxrQkFDTixLQUFLQSxJQURDLG1CQUNZLEtBQUtILFFBQUwsR0FBZ0IsVUFBaEIsR0FBNkIsRUFEekMsSUFFZCxtQkFGSjtBQUlBLFdBQU87QUFBTSxNQUFBLEVBQUUsRUFBRSxLQUFLZSxNQUFmO0FBQXVCLE1BQUEsU0FBUyxFQUFFZ0I7QUFBbEMsTUFBUDtBQUNEOztBQTlFZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb25Db21wb25lbnQge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDbGljayAoKSB7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJyk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJyk7XG4gICAgdGhpcy5vbkRpZENsaWNrKHRoaXMuc2VsZWN0ZWQgPyB0aGlzLmljb246ICcnKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZU1vdXNlT3ZlciAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLmVsZW1lbnQsIHtcbiAgICAgICAgdGl0bGU6IHRoaXMuaWNvbixcbiAgICAgICAgZGVsYXk6IHtcbiAgICAgICAgICBzaG93OiA1MDBcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3M6ICdwdnAtdG9vbHRpcCdcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZU1vdXNlTGVhdmUgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0IGV2ZW50cyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLFxuICAgICAgbW91c2VvdmVyOiB0aGlzLmhhbmRsZU1vdXNlT3ZlcixcbiAgICAgIG1vdXNlbGVhdmU6IHRoaXMuaGFuZGxlTW91c2VMZWF2ZVxuICAgIH07XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLmljb24gPSBwcm9wcy5pY29uO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBwcm9wcy5zZWxlY3RlZDtcbiAgICB0aGlzLm9uRGlkQ2xpY2sgPSBwcm9wcy5vbkRpZENsaWNrO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLmljb24gPSBwcm9wcy5pY29uO1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IHByb3BzLnNlbGVjdGVkIHx8IGZhbHNlO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBpY29uQ2xhc3MgPSB0aGlzLmljb25cbiAgICAgID8gYGljb24gJHt0aGlzLmljb259LWljb24gJHt0aGlzLnNlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnfWBcbiAgICAgIDogJ2ljb24gZGVmYXVsdC1pY29uJztcblxuICAgIHJldHVybiA8c3BhbiBvbj17dGhpcy5ldmVudHN9IGNsYXNzTmFtZT17aWNvbkNsYXNzfSAvPjtcbiAgfVxufVxuIl19