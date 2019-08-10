"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _atom = require("atom");

var _etch = _interopRequireDefault(require("etch"));

var _icons = _interopRequireDefault(require("./../constants/icons"));

var _icon = _interopRequireDefault(require("./../components/icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable-next-line require-jsdoc */
class IconsContainer {
  /* eslint-disable-next-line require-jsdoc */
  constructor(props, children) {
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();
    this.icons = [];
    this.icon = props.entry ? props.entry.icon : '';
    this.children = children;
    this.onDidChange = props.onDidChange;
    this.filterIcons();

    _etch.default.initialize(this);
  }
  /* eslint-disable-next-line require-jsdoc */


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
        _this2.icon = props.entry ? props.entry.icon : '';

        _this2.filterIcons(props.search);

        return _etch.default.update(_this2);
      }

      return Promise.resolve();
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  get events() {
    return {
      search: () => this.filterIcons(),
      keyup: event => this.update({
        search: event.target.value
      })
    };
  }
  /* eslint-disable-next-line require-jsdoc */


  filterIcons(filter) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      _this3.icons = [];

      _icons.default.forEach(icon => {
        var finding = icon.replace('-icon', '');

        if (!filter || !filter.length || finding.includes(filter)) {
          _this3.icons.push(_etch.default.dom(_icon.default, {
            icon: icon,
            selected: icon === _this3.icon,
            onDidClick: icon => _this3.onDidChange(icon)
          }));
        }
      });
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    return _etch.default.dom("div", {
      className: "block-container"
    }, this.children.map(child => child), _etch.default.dom("input", {
      className: "input-search",
      type: "search",
      on: this.events,
      placeholder: "type to search for an icon"
    }), _etch.default.dom("ul", {
      className: "info-messages block"
    }, _etch.default.dom("li", null, "Showing\xA0", _etch.default.dom("span", {
      className: "highlight"
    }, this.icons.length), "\xA0icon(s).")), _etch.default.dom("div", {
      className: "block-icons"
    }, this.icons));
  }

}

exports.default = IconsContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2ljb25zLmpzIl0sIm5hbWVzIjpbIkljb25zQ29udGFpbmVyIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJpY29ucyIsImljb24iLCJlbnRyeSIsIm9uRGlkQ2hhbmdlIiwiZmlsdGVySWNvbnMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsImRlc3Ryb3kiLCJ1cGRhdGUiLCJzZWFyY2giLCJQcm9taXNlIiwicmVzb2x2ZSIsImV2ZW50cyIsImtleXVwIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImZpbHRlciIsImZvckVhY2giLCJmaW5kaW5nIiwicmVwbGFjZSIsImxlbmd0aCIsImluY2x1ZGVzIiwicHVzaCIsInJlbmRlciIsIm1hcCIsImNoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxjQUFOLENBQXFCO0FBQ2xDO0FBQ0FDLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTQyxRQUFULEVBQW1CO0FBQzVCLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMseUJBQUosRUFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSUMsYUFBSixFQUFmO0FBRUEsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLQyxJQUFMLEdBQVlQLEtBQUssQ0FBQ1EsS0FBTixHQUFjUixLQUFLLENBQUNRLEtBQU4sQ0FBWUQsSUFBMUIsR0FBaUMsRUFBN0M7QUFDQSxTQUFLTixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtRLFdBQUwsR0FBbUJULEtBQUssQ0FBQ1MsV0FBekI7QUFFQSxTQUFLQyxXQUFMOztBQUVBQyxrQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEO0FBRUQ7OztBQUNNQyxFQUFBQSxPQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixZQUFNRixjQUFLRSxPQUFMLENBQWEsS0FBYixDQUFOO0FBRGU7QUFFaEI7QUFFRDs7Ozs7OztBQUtNQyxFQUFBQSxNQUFOLENBQWNkLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxRQUFBLE1BQUksQ0FBQ08sSUFBTCxHQUFZUCxLQUFLLENBQUNRLEtBQU4sR0FBY1IsS0FBSyxDQUFDUSxLQUFOLENBQVlELElBQTFCLEdBQWlDLEVBQTdDOztBQUNBLFFBQUEsTUFBSSxDQUFDRyxXQUFMLENBQWlCVixLQUFLLENBQUNlLE1BQXZCOztBQUNBLGVBQU9KLGNBQUtHLE1BQUwsQ0FBWSxNQUFaLENBQVA7QUFDRDs7QUFFRCxhQUFPRSxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQVBtQjtBQVFwQjtBQUVEOzs7QUFDQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPO0FBQ0xILE1BQUFBLE1BQU0sRUFBRSxNQUFNLEtBQUtMLFdBQUwsRUFEVDtBQUVMUyxNQUFBQSxLQUFLLEVBQUVDLEtBQUssSUFBSSxLQUFLTixNQUFMLENBQVk7QUFBRUMsUUFBQUEsTUFBTSxFQUFFSyxLQUFLLENBQUNDLE1BQU4sQ0FBYUM7QUFBdkIsT0FBWjtBQUZYLEtBQVA7QUFJRDtBQUVEOzs7QUFDTVosRUFBQUEsV0FBTixDQUFtQmEsTUFBbkIsRUFBMkI7QUFBQTs7QUFBQTtBQUN6QixNQUFBLE1BQUksQ0FBQ2pCLEtBQUwsR0FBYSxFQUFiOztBQUVBQSxxQkFBTWtCLE9BQU4sQ0FBY2pCLElBQUksSUFBSTtBQUNwQixZQUFNa0IsT0FBTyxHQUFHbEIsSUFBSSxDQUFDbUIsT0FBTCxDQUFhLE9BQWIsRUFBc0IsRUFBdEIsQ0FBaEI7O0FBRUEsWUFBSSxDQUFDSCxNQUFELElBQVcsQ0FBQ0EsTUFBTSxDQUFDSSxNQUFuQixJQUE2QkYsT0FBTyxDQUFDRyxRQUFSLENBQWlCTCxNQUFqQixDQUFqQyxFQUEyRDtBQUN6RCxVQUFBLE1BQUksQ0FBQ2pCLEtBQUwsQ0FBV3VCLElBQVgsQ0FDRSxrQkFBQyxhQUFEO0FBQ0UsWUFBQSxJQUFJLEVBQUV0QixJQURSO0FBRUUsWUFBQSxRQUFRLEVBQUVBLElBQUksS0FBSyxNQUFJLENBQUNBLElBRjFCO0FBR0UsWUFBQSxVQUFVLEVBQUVBLElBQUksSUFBSSxNQUFJLENBQUNFLFdBQUwsQ0FBaUJGLElBQWpCO0FBSHRCLFlBREY7QUFPRDtBQUNGLE9BWkQ7QUFIeUI7QUFnQjFCO0FBRUQ7OztBQUNBdUIsRUFBQUEsTUFBTSxHQUFJO0FBQ1IsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRyxLQUFLN0IsUUFBTCxDQUFjOEIsR0FBZCxDQUFrQkMsS0FBSyxJQUFJQSxLQUEzQixDQURILEVBRUU7QUFDRSxNQUFBLFNBQVMsRUFBQyxjQURaO0FBRUUsTUFBQSxJQUFJLEVBQUMsUUFGUDtBQUdFLE1BQUEsRUFBRSxFQUFFLEtBQUtkLE1BSFg7QUFJRSxNQUFBLFdBQVcsRUFBQztBQUpkLE1BRkYsRUFRRTtBQUFJLE1BQUEsU0FBUyxFQUFDO0FBQWQsT0FDRSw2Q0FFRTtBQUFNLE1BQUEsU0FBUyxFQUFDO0FBQWhCLE9BQTZCLEtBQUtaLEtBQUwsQ0FBV3FCLE1BQXhDLENBRkYsaUJBREYsQ0FSRixFQWNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUE4QixLQUFLckIsS0FBbkMsQ0FkRixDQURGO0FBa0JEOztBQW5GaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBpY29ucyBmcm9tICcuLy4uL2NvbnN0YW50cy9pY29ucyc7XG5pbXBvcnQgSWNvbiBmcm9tICcuLy4uL2NvbXBvbmVudHMvaWNvbic7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJY29uc0NvbnRhaW5lciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgdGhpcy5pY29ucyA9IFtdO1xuICAgIHRoaXMuaWNvbiA9IHByb3BzLmVudHJ5ID8gcHJvcHMuZW50cnkuaWNvbiA6ICcnO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB0aGlzLm9uRGlkQ2hhbmdlID0gcHJvcHMub25EaWRDaGFuZ2U7XG5cbiAgICB0aGlzLmZpbHRlckljb25zKCk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5pY29uID0gcHJvcHMuZW50cnkgPyBwcm9wcy5lbnRyeS5pY29uIDogJyc7XG4gICAgICB0aGlzLmZpbHRlckljb25zKHByb3BzLnNlYXJjaCk7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0IGV2ZW50cyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlYXJjaDogKCkgPT4gdGhpcy5maWx0ZXJJY29ucygpLFxuICAgICAga2V5dXA6IGV2ZW50ID0+IHRoaXMudXBkYXRlKHsgc2VhcmNoOiBldmVudC50YXJnZXQudmFsdWUgfSlcbiAgICB9O1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZmlsdGVySWNvbnMgKGZpbHRlcikge1xuICAgIHRoaXMuaWNvbnMgPSBbXTtcblxuICAgIGljb25zLmZvckVhY2goaWNvbiA9PiB7XG4gICAgICBjb25zdCBmaW5kaW5nID0gaWNvbi5yZXBsYWNlKCctaWNvbicsICcnKTtcblxuICAgICAgaWYgKCFmaWx0ZXIgfHwgIWZpbHRlci5sZW5ndGggfHwgZmluZGluZy5pbmNsdWRlcyhmaWx0ZXIpKSB7XG4gICAgICAgIHRoaXMuaWNvbnMucHVzaChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWNvbj17aWNvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXtpY29uID09PSB0aGlzLmljb259XG4gICAgICAgICAgICBvbkRpZENsaWNrPXtpY29uID0+IHRoaXMub25EaWRDaGFuZ2UoaWNvbil9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImlucHV0LXNlYXJjaFwiXG4gICAgICAgICAgdHlwZT1cInNlYXJjaFwiXG4gICAgICAgICAgb249e3RoaXMuZXZlbnRzfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwidHlwZSB0byBzZWFyY2ggZm9yIGFuIGljb25cIlxuICAgICAgICAvPlxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5mby1tZXNzYWdlcyBibG9ja1wiPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIFNob3dpbmcmbmJzcDtcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZ2hsaWdodFwiPnt0aGlzLmljb25zLmxlbmd0aH08L3NwYW4+Jm5ic3A7aWNvbihzKS5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWljb25zXCI+e3RoaXMuaWNvbnN9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=