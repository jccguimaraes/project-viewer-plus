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

/** @jsx etch.dom */

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


  async destroy() {
    await _etch.default.destroy(this);
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  async update(props) {
    if (props) {
      this.icon = props.entry ? props.entry.icon : '';
      this.filterIcons(props.search);
      return _etch.default.update(this);
    }

    return Promise.resolve();
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


  async filterIcons(filter) {
    this.icons = [];

    _icons.default.forEach(icon => {
      const finding = icon.replace('-icon', '');

      if (!filter || !filter.length || finding.includes(filter)) {
        this.icons.push(_etch.default.dom(_icon.default, {
          icon: icon,
          selected: icon === this.icon,
          onDidClick: icon => this.onDidChange(icon)
        }));
      }
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2ljb25zLmpzIl0sIm5hbWVzIjpbIkljb25zQ29udGFpbmVyIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJpY29ucyIsImljb24iLCJlbnRyeSIsIm9uRGlkQ2hhbmdlIiwiZmlsdGVySWNvbnMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsImRlc3Ryb3kiLCJ1cGRhdGUiLCJzZWFyY2giLCJQcm9taXNlIiwicmVzb2x2ZSIsImV2ZW50cyIsImtleXVwIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImZpbHRlciIsImZvckVhY2giLCJmaW5kaW5nIiwicmVwbGFjZSIsImxlbmd0aCIsImluY2x1ZGVzIiwicHVzaCIsInJlbmRlciIsIm1hcCIsImNoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFMQTs7QUFPQTtBQUNlLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbEM7QUFDQUMsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVNDLFFBQVQsRUFBbUI7QUFDNUIsU0FBS0MsV0FBTCxHQUFtQixJQUFJQyx5QkFBSixFQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxhQUFKLEVBQWY7QUFFQSxTQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLFNBQUtDLElBQUwsR0FBWVAsS0FBSyxDQUFDUSxLQUFOLEdBQWNSLEtBQUssQ0FBQ1EsS0FBTixDQUFZRCxJQUExQixHQUFpQyxFQUE3QztBQUNBLFNBQUtOLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS1EsV0FBTCxHQUFtQlQsS0FBSyxDQUFDUyxXQUF6QjtBQUVBLFNBQUtDLFdBQUw7O0FBRUFDLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7O0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1GLGNBQUtFLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDtBQUVEOzs7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjZCxLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtPLElBQUwsR0FBWVAsS0FBSyxDQUFDUSxLQUFOLEdBQWNSLEtBQUssQ0FBQ1EsS0FBTixDQUFZRCxJQUExQixHQUFpQyxFQUE3QztBQUNBLFdBQUtHLFdBQUwsQ0FBaUJWLEtBQUssQ0FBQ2UsTUFBdkI7QUFDQSxhQUFPSixjQUFLRyxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0UsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFDRDtBQUVEOzs7QUFDQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPO0FBQ0xILE1BQUFBLE1BQU0sRUFBRSxNQUFNLEtBQUtMLFdBQUwsRUFEVDtBQUVMUyxNQUFBQSxLQUFLLEVBQUVDLEtBQUssSUFBSSxLQUFLTixNQUFMLENBQVk7QUFBRUMsUUFBQUEsTUFBTSxFQUFFSyxLQUFLLENBQUNDLE1BQU4sQ0FBYUM7QUFBdkIsT0FBWjtBQUZYLEtBQVA7QUFJRDtBQUVEOzs7QUFDQSxRQUFNWixXQUFOLENBQW1CYSxNQUFuQixFQUEyQjtBQUN6QixTQUFLakIsS0FBTCxHQUFhLEVBQWI7O0FBRUFBLG1CQUFNa0IsT0FBTixDQUFjakIsSUFBSSxJQUFJO0FBQ3BCLFlBQU1rQixPQUFPLEdBQUdsQixJQUFJLENBQUNtQixPQUFMLENBQWEsT0FBYixFQUFzQixFQUF0QixDQUFoQjs7QUFFQSxVQUFJLENBQUNILE1BQUQsSUFBVyxDQUFDQSxNQUFNLENBQUNJLE1BQW5CLElBQTZCRixPQUFPLENBQUNHLFFBQVIsQ0FBaUJMLE1BQWpCLENBQWpDLEVBQTJEO0FBQ3pELGFBQUtqQixLQUFMLENBQVd1QixJQUFYLENBQ0Usa0JBQUMsYUFBRDtBQUNFLFVBQUEsSUFBSSxFQUFFdEIsSUFEUjtBQUVFLFVBQUEsUUFBUSxFQUFFQSxJQUFJLEtBQUssS0FBS0EsSUFGMUI7QUFHRSxVQUFBLFVBQVUsRUFBRUEsSUFBSSxJQUFJLEtBQUtFLFdBQUwsQ0FBaUJGLElBQWpCO0FBSHRCLFVBREY7QUFPRDtBQUNGLEtBWkQ7QUFhRDtBQUVEOzs7QUFDQXVCLEVBQUFBLE1BQU0sR0FBSTtBQUNSLFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0csS0FBSzdCLFFBQUwsQ0FBYzhCLEdBQWQsQ0FBa0JDLEtBQUssSUFBSUEsS0FBM0IsQ0FESCxFQUVFO0FBQ0UsTUFBQSxTQUFTLEVBQUMsY0FEWjtBQUVFLE1BQUEsSUFBSSxFQUFDLFFBRlA7QUFHRSxNQUFBLEVBQUUsRUFBRSxLQUFLZCxNQUhYO0FBSUUsTUFBQSxXQUFXLEVBQUM7QUFKZCxNQUZGLEVBUUU7QUFBSSxNQUFBLFNBQVMsRUFBQztBQUFkLE9BQ0UsNkNBRUU7QUFBTSxNQUFBLFNBQVMsRUFBQztBQUFoQixPQUE2QixLQUFLWixLQUFMLENBQVdxQixNQUF4QyxDQUZGLGlCQURGLENBUkYsRUFjRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FBOEIsS0FBS3JCLEtBQW5DLENBZEYsQ0FERjtBQWtCRDs7QUFuRmlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgRW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgaWNvbnMgZnJvbSAnLi8uLi9jb25zdGFudHMvaWNvbnMnO1xuaW1wb3J0IEljb24gZnJvbSAnLi8uLi9jb21wb25lbnRzL2ljb24nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWNvbnNDb250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIHRoaXMuaWNvbnMgPSBbXTtcbiAgICB0aGlzLmljb24gPSBwcm9wcy5lbnRyeSA/IHByb3BzLmVudHJ5Lmljb24gOiAnJztcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgdGhpcy5vbkRpZENoYW5nZSA9IHByb3BzLm9uRGlkQ2hhbmdlO1xuXG4gICAgdGhpcy5maWx0ZXJJY29ucygpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMuaWNvbiA9IHByb3BzLmVudHJ5ID8gcHJvcHMuZW50cnkuaWNvbiA6ICcnO1xuICAgICAgdGhpcy5maWx0ZXJJY29ucyhwcm9wcy5zZWFyY2gpO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldCBldmVudHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZWFyY2g6ICgpID0+IHRoaXMuZmlsdGVySWNvbnMoKSxcbiAgICAgIGtleXVwOiBldmVudCA9PiB0aGlzLnVwZGF0ZSh7IHNlYXJjaDogZXZlbnQudGFyZ2V0LnZhbHVlIH0pXG4gICAgfTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGZpbHRlckljb25zIChmaWx0ZXIpIHtcbiAgICB0aGlzLmljb25zID0gW107XG5cbiAgICBpY29ucy5mb3JFYWNoKGljb24gPT4ge1xuICAgICAgY29uc3QgZmluZGluZyA9IGljb24ucmVwbGFjZSgnLWljb24nLCAnJyk7XG5cbiAgICAgIGlmICghZmlsdGVyIHx8ICFmaWx0ZXIubGVuZ3RoIHx8IGZpbmRpbmcuaW5jbHVkZXMoZmlsdGVyKSkge1xuICAgICAgICB0aGlzLmljb25zLnB1c2goXG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIGljb249e2ljb259XG4gICAgICAgICAgICBzZWxlY3RlZD17aWNvbiA9PT0gdGhpcy5pY29ufVxuICAgICAgICAgICAgb25EaWRDbGljaz17aWNvbiA9PiB0aGlzLm9uRGlkQ2hhbmdlKGljb24pfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICB7dGhpcy5jaGlsZHJlbi5tYXAoY2hpbGQgPT4gY2hpbGQpfVxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJpbnB1dC1zZWFyY2hcIlxuICAgICAgICAgIHR5cGU9XCJzZWFyY2hcIlxuICAgICAgICAgIG9uPXt0aGlzLmV2ZW50c31cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cInR5cGUgdG8gc2VhcmNoIGZvciBhbiBpY29uXCJcbiAgICAgICAgLz5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cImluZm8tbWVzc2FnZXMgYmxvY2tcIj5cbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICBTaG93aW5nJm5ic3A7XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWdobGlnaHRcIj57dGhpcy5pY29ucy5sZW5ndGh9PC9zcGFuPiZuYnNwO2ljb24ocykuXG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1pY29uc1wiPnt0aGlzLmljb25zfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19