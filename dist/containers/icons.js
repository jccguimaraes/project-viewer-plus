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
      this.filterIcons();
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  get events() {
    return {
      search: () => this.filterIcons(),
      keyup: event => this.filterIcons(event.target.value)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2ljb25zLmpzIl0sIm5hbWVzIjpbIkljb25zQ29udGFpbmVyIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiaWNvbnMiLCJpY29uIiwiZW50cnkiLCJvbkRpZENoYW5nZSIsImZpbHRlckljb25zIiwiZXRjaCIsImluaXRpYWxpemUiLCJkZXN0cm95IiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJldmVudHMiLCJzZWFyY2giLCJrZXl1cCIsImV2ZW50IiwidGFyZ2V0IiwidmFsdWUiLCJmaWx0ZXIiLCJmb3JFYWNoIiwiZmluZGluZyIsInJlcGxhY2UiLCJsZW5ndGgiLCJpbmNsdWRlcyIsInB1c2giLCJyZW5kZXIiLCJtYXAiLCJjaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQVBBOztBQVFlLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbEM7QUFDQUMsY0FBYUMsS0FBYixFQUFvQkMsUUFBcEIsRUFBOEI7QUFDNUJDLFlBQVFDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCSCxLQUE3Qjs7QUFFQSxTQUFLSSxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjs7QUFFQSxTQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLFNBQUtDLElBQUwsR0FBWVQsTUFBTVUsS0FBTixHQUFjVixNQUFNVSxLQUFOLENBQVlELElBQTFCLEdBQWlDLEVBQTdDO0FBQ0EsU0FBS1IsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLVSxXQUFMLEdBQW1CWCxNQUFNVyxXQUF6Qjs7QUFFQSxTQUFLQyxXQUFMOztBQUVBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1GLGVBQUtFLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNoQixLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtTLElBQUwsR0FBWVQsTUFBTVUsS0FBTixHQUFjVixNQUFNVSxLQUFOLENBQVlELElBQTFCLEdBQWlDLEVBQTdDO0FBQ0EsV0FBS0csV0FBTDtBQUNBLGFBQU9DLGVBQUtHLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLE1BQUlDLE1BQUosR0FBYztBQUNaLFdBQU87QUFDTEMsY0FBUSxNQUFNLEtBQUtSLFdBQUwsRUFEVDtBQUVMUyxhQUFPQyxTQUFTLEtBQUtWLFdBQUwsQ0FBaUJVLE1BQU1DLE1BQU4sQ0FBYUMsS0FBOUI7QUFGWCxLQUFQO0FBSUQ7O0FBRUQ7QUFDQSxRQUFNWixXQUFOLENBQW1CYSxNQUFuQixFQUEyQjtBQUN6QixTQUFLakIsS0FBTCxHQUFhLEVBQWI7O0FBRUFBLG9CQUFNa0IsT0FBTixDQUFjakIsUUFBUTtBQUNwQixZQUFNa0IsVUFBVWxCLEtBQUttQixPQUFMLENBQWEsT0FBYixFQUFzQixFQUF0QixDQUFoQjs7QUFFQSxVQUFJLENBQUNILE1BQUQsSUFBVyxDQUFDQSxPQUFPSSxNQUFuQixJQUE2QkYsUUFBUUcsUUFBUixDQUFpQkwsTUFBakIsQ0FBakMsRUFBMkQ7QUFDekQsYUFBS2pCLEtBQUwsQ0FBV3VCLElBQVgsQ0FDRSxtQkFBQyxjQUFEO0FBQ0UsZ0JBQU10QixJQURSO0FBRUUsb0JBQVVBLFNBQVMsS0FBS0EsSUFGMUI7QUFHRSxzQkFBWUEsUUFBUSxLQUFLRSxXQUFMLENBQWlCRixJQUFqQjtBQUh0QixVQURGO0FBT0Q7QUFDRixLQVpEO0FBYUQ7O0FBRUQ7QUFDQXVCLFdBQVU7QUFDUixXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsaUJBQWY7QUFDRyxXQUFLL0IsUUFBTCxDQUFjZ0MsR0FBZCxDQUFrQkMsU0FBU0EsS0FBM0IsQ0FESDtBQUVFO0FBQ0UsbUJBQVUsY0FEWjtBQUVFLGNBQUssUUFGUDtBQUdFLFlBQUksS0FBS2YsTUFIWDtBQUlFLHFCQUFZO0FBSmQsUUFGRjtBQVFFO0FBQUE7QUFBQSxVQUFJLFdBQVUscUJBQWQ7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUVFO0FBQUE7QUFBQSxjQUFNLFdBQVUsV0FBaEI7QUFBNkIsaUJBQUtYLEtBQUwsQ0FBV3FCO0FBQXhDLFdBRkY7QUFBQTtBQUFBO0FBREYsT0FSRjtBQWNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUE4QixhQUFLckI7QUFBbkM7QUFkRixLQURGO0FBa0JEO0FBckZpQztrQkFBZlYsYyIsImZpbGUiOiJpY29ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IGljb25zIGZyb20gJy4vLi4vY29uc3RhbnRzL2ljb25zJztcbmltcG9ydCBJY29uIGZyb20gJy4vLi4vY29tcG9uZW50cy9pY29uJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb25zQ29udGFpbmVyIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzLCBjaGlsZHJlbikge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGljb25zJywgcHJvcHMpO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIHRoaXMuaWNvbnMgPSBbXTtcbiAgICB0aGlzLmljb24gPSBwcm9wcy5lbnRyeSA/IHByb3BzLmVudHJ5Lmljb24gOiAnJztcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgdGhpcy5vbkRpZENoYW5nZSA9IHByb3BzLm9uRGlkQ2hhbmdlO1xuXG4gICAgdGhpcy5maWx0ZXJJY29ucygpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMuaWNvbiA9IHByb3BzLmVudHJ5ID8gcHJvcHMuZW50cnkuaWNvbiA6ICcnO1xuICAgICAgdGhpcy5maWx0ZXJJY29ucygpO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldCBldmVudHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZWFyY2g6ICgpID0+IHRoaXMuZmlsdGVySWNvbnMoKSxcbiAgICAgIGtleXVwOiBldmVudCA9PiB0aGlzLmZpbHRlckljb25zKGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICB9O1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZmlsdGVySWNvbnMgKGZpbHRlcikge1xuICAgIHRoaXMuaWNvbnMgPSBbXTtcblxuICAgIGljb25zLmZvckVhY2goaWNvbiA9PiB7XG4gICAgICBjb25zdCBmaW5kaW5nID0gaWNvbi5yZXBsYWNlKCctaWNvbicsICcnKTtcblxuICAgICAgaWYgKCFmaWx0ZXIgfHwgIWZpbHRlci5sZW5ndGggfHwgZmluZGluZy5pbmNsdWRlcyhmaWx0ZXIpKSB7XG4gICAgICAgIHRoaXMuaWNvbnMucHVzaChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWNvbj17aWNvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXtpY29uID09PSB0aGlzLmljb259XG4gICAgICAgICAgICBvbkRpZENsaWNrPXtpY29uID0+IHRoaXMub25EaWRDaGFuZ2UoaWNvbil9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImlucHV0LXNlYXJjaFwiXG4gICAgICAgICAgdHlwZT1cInNlYXJjaFwiXG4gICAgICAgICAgb249e3RoaXMuZXZlbnRzfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwidHlwZSB0byBzZWFyY2ggZm9yIGFuIGljb25cIlxuICAgICAgICAvPlxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5mby1tZXNzYWdlcyBibG9ja1wiPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIFNob3dpbmcmbmJzcDtcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZ2hsaWdodFwiPnt0aGlzLmljb25zLmxlbmd0aH08L3NwYW4+Jm5ic3A7aWNvbihzKS5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWljb25zXCI+e3RoaXMuaWNvbnN9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=