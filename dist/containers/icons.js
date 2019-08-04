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
    console.log('created icons', props);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2ljb25zLmpzIl0sIm5hbWVzIjpbIkljb25zQ29udGFpbmVyIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiaWNvbnMiLCJpY29uIiwiZW50cnkiLCJvbkRpZENoYW5nZSIsImZpbHRlckljb25zIiwiZXRjaCIsImluaXRpYWxpemUiLCJkZXN0cm95IiwidXBkYXRlIiwic2VhcmNoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJldmVudHMiLCJrZXl1cCIsImV2ZW50IiwidGFyZ2V0IiwidmFsdWUiLCJmaWx0ZXIiLCJmb3JFYWNoIiwiZmluZGluZyIsInJlcGxhY2UiLCJsZW5ndGgiLCJpbmNsdWRlcyIsInB1c2giLCJyZW5kZXIiLCJtYXAiLCJjaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsY0FBTixDQUFxQjtBQUNsQztBQUNBQyxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBU0MsUUFBVCxFQUFtQjtBQUM1QkMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWixFQUE2QkgsS0FBN0I7QUFFQSxTQUFLSSxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjtBQUVBLFNBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsU0FBS0MsSUFBTCxHQUFZVCxLQUFLLENBQUNVLEtBQU4sR0FBY1YsS0FBSyxDQUFDVSxLQUFOLENBQVlELElBQTFCLEdBQWlDLEVBQTdDO0FBQ0EsU0FBS1IsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLVSxXQUFMLEdBQW1CWCxLQUFLLENBQUNXLFdBQXpCO0FBRUEsU0FBS0MsV0FBTDs7QUFFQUMsa0JBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDtBQUVEOzs7QUFDTUMsRUFBQUEsT0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTUYsY0FBS0UsT0FBTCxDQUFhLEtBQWIsQ0FBTjtBQURlO0FBRWhCO0FBRUQ7Ozs7Ozs7QUFLTUMsRUFBQUEsTUFBTixDQUFjaEIsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUlBLEtBQUosRUFBVztBQUNULFFBQUEsTUFBSSxDQUFDUyxJQUFMLEdBQVlULEtBQUssQ0FBQ1UsS0FBTixHQUFjVixLQUFLLENBQUNVLEtBQU4sQ0FBWUQsSUFBMUIsR0FBaUMsRUFBN0M7O0FBQ0EsUUFBQSxNQUFJLENBQUNHLFdBQUwsQ0FBaUJaLEtBQUssQ0FBQ2lCLE1BQXZCOztBQUNBLGVBQU9KLGNBQUtHLE1BQUwsQ0FBWSxNQUFaLENBQVA7QUFDRDs7QUFFRCxhQUFPRSxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQVBtQjtBQVFwQjtBQUVEOzs7QUFDQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPO0FBQ0xILE1BQUFBLE1BQU0sRUFBRSxNQUFNLEtBQUtMLFdBQUwsRUFEVDtBQUVMUyxNQUFBQSxLQUFLLEVBQUVDLEtBQUssSUFBSSxLQUFLTixNQUFMLENBQVk7QUFBRUMsUUFBQUEsTUFBTSxFQUFFSyxLQUFLLENBQUNDLE1BQU4sQ0FBYUM7QUFBdkIsT0FBWjtBQUZYLEtBQVA7QUFJRDtBQUVEOzs7QUFDTVosRUFBQUEsV0FBTixDQUFtQmEsTUFBbkIsRUFBMkI7QUFBQTs7QUFBQTtBQUN6QixNQUFBLE1BQUksQ0FBQ2pCLEtBQUwsR0FBYSxFQUFiOztBQUVBQSxxQkFBTWtCLE9BQU4sQ0FBY2pCLElBQUksSUFBSTtBQUNwQixZQUFNa0IsT0FBTyxHQUFHbEIsSUFBSSxDQUFDbUIsT0FBTCxDQUFhLE9BQWIsRUFBc0IsRUFBdEIsQ0FBaEI7O0FBRUEsWUFBSSxDQUFDSCxNQUFELElBQVcsQ0FBQ0EsTUFBTSxDQUFDSSxNQUFuQixJQUE2QkYsT0FBTyxDQUFDRyxRQUFSLENBQWlCTCxNQUFqQixDQUFqQyxFQUEyRDtBQUN6RCxVQUFBLE1BQUksQ0FBQ2pCLEtBQUwsQ0FBV3VCLElBQVgsQ0FDRSxrQkFBQyxhQUFEO0FBQ0UsWUFBQSxJQUFJLEVBQUV0QixJQURSO0FBRUUsWUFBQSxRQUFRLEVBQUVBLElBQUksS0FBSyxNQUFJLENBQUNBLElBRjFCO0FBR0UsWUFBQSxVQUFVLEVBQUVBLElBQUksSUFBSSxNQUFJLENBQUNFLFdBQUwsQ0FBaUJGLElBQWpCO0FBSHRCLFlBREY7QUFPRDtBQUNGLE9BWkQ7QUFIeUI7QUFnQjFCO0FBRUQ7OztBQUNBdUIsRUFBQUEsTUFBTSxHQUFJO0FBQ1IsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRyxLQUFLL0IsUUFBTCxDQUFjZ0MsR0FBZCxDQUFrQkMsS0FBSyxJQUFJQSxLQUEzQixDQURILEVBRUU7QUFDRSxNQUFBLFNBQVMsRUFBQyxjQURaO0FBRUUsTUFBQSxJQUFJLEVBQUMsUUFGUDtBQUdFLE1BQUEsRUFBRSxFQUFFLEtBQUtkLE1BSFg7QUFJRSxNQUFBLFdBQVcsRUFBQztBQUpkLE1BRkYsRUFRRTtBQUFJLE1BQUEsU0FBUyxFQUFDO0FBQWQsT0FDRSw2Q0FFRTtBQUFNLE1BQUEsU0FBUyxFQUFDO0FBQWhCLE9BQTZCLEtBQUtaLEtBQUwsQ0FBV3FCLE1BQXhDLENBRkYsaUJBREYsQ0FSRixFQWNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUE4QixLQUFLckIsS0FBbkMsQ0FkRixDQURGO0FBa0JEOztBQXJGaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBpY29ucyBmcm9tICcuLy4uL2NvbnN0YW50cy9pY29ucyc7XG5pbXBvcnQgSWNvbiBmcm9tICcuLy4uL2NvbXBvbmVudHMvaWNvbic7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJY29uc0NvbnRhaW5lciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcywgY2hpbGRyZW4pIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBpY29ucycsIHByb3BzKTtcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICB0aGlzLmljb25zID0gW107XG4gICAgdGhpcy5pY29uID0gcHJvcHMuZW50cnkgPyBwcm9wcy5lbnRyeS5pY29uIDogJyc7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIHRoaXMub25EaWRDaGFuZ2UgPSBwcm9wcy5vbkRpZENoYW5nZTtcblxuICAgIHRoaXMuZmlsdGVySWNvbnMoKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLmljb24gPSBwcm9wcy5lbnRyeSA/IHByb3BzLmVudHJ5Lmljb24gOiAnJztcbiAgICAgIHRoaXMuZmlsdGVySWNvbnMocHJvcHMuc2VhcmNoKTtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXQgZXZlbnRzICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VhcmNoOiAoKSA9PiB0aGlzLmZpbHRlckljb25zKCksXG4gICAgICBrZXl1cDogZXZlbnQgPT4gdGhpcy51cGRhdGUoeyBzZWFyY2g6IGV2ZW50LnRhcmdldC52YWx1ZSB9KVxuICAgIH07XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBmaWx0ZXJJY29ucyAoZmlsdGVyKSB7XG4gICAgdGhpcy5pY29ucyA9IFtdO1xuXG4gICAgaWNvbnMuZm9yRWFjaChpY29uID0+IHtcbiAgICAgIGNvbnN0IGZpbmRpbmcgPSBpY29uLnJlcGxhY2UoJy1pY29uJywgJycpO1xuXG4gICAgICBpZiAoIWZpbHRlciB8fCAhZmlsdGVyLmxlbmd0aCB8fCBmaW5kaW5nLmluY2x1ZGVzKGZpbHRlcikpIHtcbiAgICAgICAgdGhpcy5pY29ucy5wdXNoKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpY29uPXtpY29ufVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e2ljb24gPT09IHRoaXMuaWNvbn1cbiAgICAgICAgICAgIG9uRGlkQ2xpY2s9e2ljb24gPT4gdGhpcy5vbkRpZENoYW5nZShpY29uKX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAge3RoaXMuY2hpbGRyZW4ubWFwKGNoaWxkID0+IGNoaWxkKX1cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXQtc2VhcmNoXCJcbiAgICAgICAgICB0eXBlPVwic2VhcmNoXCJcbiAgICAgICAgICBvbj17dGhpcy5ldmVudHN9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJ0eXBlIHRvIHNlYXJjaCBmb3IgYW4gaWNvblwiXG4gICAgICAgIC8+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmZvLW1lc3NhZ2VzIGJsb2NrXCI+XG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAgU2hvd2luZyZuYnNwO1xuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlnaGxpZ2h0XCI+e3RoaXMuaWNvbnMubGVuZ3RofTwvc3Bhbj4mbmJzcDtpY29uKHMpLlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2staWNvbnNcIj57dGhpcy5pY29uc308L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==