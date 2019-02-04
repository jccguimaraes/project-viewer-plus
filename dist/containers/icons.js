'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _icons = require('./../constants/icons');

var _icons2 = _interopRequireDefault(_icons);

var _icon = require('./../components/icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
/** @jsx etch.dom */

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

    _etch2.default.initialize(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    await _etch2.default.destroy(this);
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
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  get events() {
    return {
      search: () => this.filterIcons(),
      keyup: event => this.update({ search: event.target.value })
    };
  }

  /* eslint-disable-next-line require-jsdoc */
  async filterIcons(filter) {
    this.icons = [];

    _icons2.default.forEach(icon => {
      const finding = icon.replace('-icon', '');

      if (!filter || !filter.length || finding.includes(filter)) {
        this.icons.push(_etch2.default.dom(_icon2.default, {
          icon: icon,
          selected: icon === this.icon,
          onDidClick: icon => this.onDidChange(icon)
        }));
      }
    });
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    return _etch2.default.dom(
      'div',
      { className: 'block-container' },
      this.children.map(child => child),
      _etch2.default.dom('input', {
        className: 'input-search',
        type: 'search',
        on: this.events,
        placeholder: 'type to search for an icon'
      }),
      _etch2.default.dom(
        'ul',
        { className: 'info-messages block' },
        _etch2.default.dom(
          'li',
          null,
          'Showing\xA0',
          _etch2.default.dom(
            'span',
            { className: 'highlight' },
            this.icons.length
          ),
          '\xA0icon(s).'
        )
      ),
      _etch2.default.dom(
        'div',
        { className: 'block-icons' },
        this.icons
      )
    );
  }
}
exports.default = IconsContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2ljb25zLmpzIl0sIm5hbWVzIjpbIkljb25zQ29udGFpbmVyIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiaWNvbnMiLCJpY29uIiwiZW50cnkiLCJvbkRpZENoYW5nZSIsImZpbHRlckljb25zIiwiZXRjaCIsImluaXRpYWxpemUiLCJkZXN0cm95IiwidXBkYXRlIiwic2VhcmNoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJldmVudHMiLCJrZXl1cCIsImV2ZW50IiwidGFyZ2V0IiwidmFsdWUiLCJmaWx0ZXIiLCJmb3JFYWNoIiwiZmluZGluZyIsInJlcGxhY2UiLCJsZW5ndGgiLCJpbmNsdWRlcyIsInB1c2giLCJyZW5kZXIiLCJtYXAiLCJjaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQVBBOztBQVFlLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbEM7QUFDQUMsY0FBYUMsS0FBYixFQUFvQkMsUUFBcEIsRUFBOEI7QUFDNUJDLFlBQVFDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCSCxLQUE3Qjs7QUFFQSxTQUFLSSxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjs7QUFFQSxTQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLFNBQUtDLElBQUwsR0FBWVQsTUFBTVUsS0FBTixHQUFjVixNQUFNVSxLQUFOLENBQVlELElBQTFCLEdBQWlDLEVBQTdDO0FBQ0EsU0FBS1IsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLVSxXQUFMLEdBQW1CWCxNQUFNVyxXQUF6Qjs7QUFFQSxTQUFLQyxXQUFMOztBQUVBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1GLGVBQUtFLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNoQixLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtTLElBQUwsR0FBWVQsTUFBTVUsS0FBTixHQUFjVixNQUFNVSxLQUFOLENBQVlELElBQTFCLEdBQWlDLEVBQTdDO0FBQ0EsV0FBS0csV0FBTCxDQUFpQlosTUFBTWlCLE1BQXZCO0FBQ0EsYUFBT0osZUFBS0csTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9FLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0EsTUFBSUMsTUFBSixHQUFjO0FBQ1osV0FBTztBQUNMSCxjQUFRLE1BQU0sS0FBS0wsV0FBTCxFQURUO0FBRUxTLGFBQU9DLFNBQVMsS0FBS04sTUFBTCxDQUFZLEVBQUVDLFFBQVFLLE1BQU1DLE1BQU4sQ0FBYUMsS0FBdkIsRUFBWjtBQUZYLEtBQVA7QUFJRDs7QUFFRDtBQUNBLFFBQU1aLFdBQU4sQ0FBbUJhLE1BQW5CLEVBQTJCO0FBQ3pCLFNBQUtqQixLQUFMLEdBQWEsRUFBYjs7QUFFQUEsb0JBQU1rQixPQUFOLENBQWNqQixRQUFRO0FBQ3BCLFlBQU1rQixVQUFVbEIsS0FBS21CLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLEVBQXRCLENBQWhCOztBQUVBLFVBQUksQ0FBQ0gsTUFBRCxJQUFXLENBQUNBLE9BQU9JLE1BQW5CLElBQTZCRixRQUFRRyxRQUFSLENBQWlCTCxNQUFqQixDQUFqQyxFQUEyRDtBQUN6RCxhQUFLakIsS0FBTCxDQUFXdUIsSUFBWCxDQUNFLG1CQUFDLGNBQUQ7QUFDRSxnQkFBTXRCLElBRFI7QUFFRSxvQkFBVUEsU0FBUyxLQUFLQSxJQUYxQjtBQUdFLHNCQUFZQSxRQUFRLEtBQUtFLFdBQUwsQ0FBaUJGLElBQWpCO0FBSHRCLFVBREY7QUFPRDtBQUNGLEtBWkQ7QUFhRDs7QUFFRDtBQUNBdUIsV0FBVTtBQUNSLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxpQkFBZjtBQUNHLFdBQUsvQixRQUFMLENBQWNnQyxHQUFkLENBQWtCQyxTQUFTQSxLQUEzQixDQURIO0FBRUU7QUFDRSxtQkFBVSxjQURaO0FBRUUsY0FBSyxRQUZQO0FBR0UsWUFBSSxLQUFLZCxNQUhYO0FBSUUscUJBQVk7QUFKZCxRQUZGO0FBUUU7QUFBQTtBQUFBLFVBQUksV0FBVSxxQkFBZDtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBRUU7QUFBQTtBQUFBLGNBQU0sV0FBVSxXQUFoQjtBQUE2QixpQkFBS1osS0FBTCxDQUFXcUI7QUFBeEMsV0FGRjtBQUFBO0FBQUE7QUFERixPQVJGO0FBY0U7QUFBQTtBQUFBLFVBQUssV0FBVSxhQUFmO0FBQThCLGFBQUtyQjtBQUFuQztBQWRGLEtBREY7QUFrQkQ7QUFyRmlDO2tCQUFmVixjIiwiZmlsZSI6Imljb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgRW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgaWNvbnMgZnJvbSAnLi8uLi9jb25zdGFudHMvaWNvbnMnO1xuaW1wb3J0IEljb24gZnJvbSAnLi8uLi9jb21wb25lbnRzL2ljb24nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWNvbnNDb250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgaWNvbnMnLCBwcm9wcyk7XG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgdGhpcy5pY29ucyA9IFtdO1xuICAgIHRoaXMuaWNvbiA9IHByb3BzLmVudHJ5ID8gcHJvcHMuZW50cnkuaWNvbiA6ICcnO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB0aGlzLm9uRGlkQ2hhbmdlID0gcHJvcHMub25EaWRDaGFuZ2U7XG5cbiAgICB0aGlzLmZpbHRlckljb25zKCk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5pY29uID0gcHJvcHMuZW50cnkgPyBwcm9wcy5lbnRyeS5pY29uIDogJyc7XG4gICAgICB0aGlzLmZpbHRlckljb25zKHByb3BzLnNlYXJjaCk7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0IGV2ZW50cyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlYXJjaDogKCkgPT4gdGhpcy5maWx0ZXJJY29ucygpLFxuICAgICAga2V5dXA6IGV2ZW50ID0+IHRoaXMudXBkYXRlKHsgc2VhcmNoOiBldmVudC50YXJnZXQudmFsdWUgfSlcbiAgICB9O1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZmlsdGVySWNvbnMgKGZpbHRlcikge1xuICAgIHRoaXMuaWNvbnMgPSBbXTtcblxuICAgIGljb25zLmZvckVhY2goaWNvbiA9PiB7XG4gICAgICBjb25zdCBmaW5kaW5nID0gaWNvbi5yZXBsYWNlKCctaWNvbicsICcnKTtcblxuICAgICAgaWYgKCFmaWx0ZXIgfHwgIWZpbHRlci5sZW5ndGggfHwgZmluZGluZy5pbmNsdWRlcyhmaWx0ZXIpKSB7XG4gICAgICAgIHRoaXMuaWNvbnMucHVzaChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWNvbj17aWNvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXtpY29uID09PSB0aGlzLmljb259XG4gICAgICAgICAgICBvbkRpZENsaWNrPXtpY29uID0+IHRoaXMub25EaWRDaGFuZ2UoaWNvbil9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImlucHV0LXNlYXJjaFwiXG4gICAgICAgICAgdHlwZT1cInNlYXJjaFwiXG4gICAgICAgICAgb249e3RoaXMuZXZlbnRzfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwidHlwZSB0byBzZWFyY2ggZm9yIGFuIGljb25cIlxuICAgICAgICAvPlxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5mby1tZXNzYWdlcyBibG9ja1wiPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIFNob3dpbmcmbmJzcDtcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZ2hsaWdodFwiPnt0aGlzLmljb25zLmxlbmd0aH08L3NwYW4+Jm5ic3A7aWNvbihzKS5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWljb25zXCI+e3RoaXMuaWNvbnN9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=