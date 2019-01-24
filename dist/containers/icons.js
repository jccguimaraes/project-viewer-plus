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

    this.props = props;
    this.children = children;
    this.filterIcons();
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();

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
      this.props = props;
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /**
   *
   * @returns {Object} description
   */
  get events() {
    return {
      search: () => this.filterIcons(),
      keyup: event => this.filterIcons(event.target.value)
    };
  }

  /**
   *
   * @param {string} filter - description
   */
  async filterIcons(filter) {
    this.icons = [];

    _icons2.default.forEach(icon => {
      const finding = icon.replace('-icon', '');

      if (!filter || !filter.length || finding.includes(filter)) {
        this.icons.push(_etch2.default.dom(_icon2.default, {
          icon: icon,
          selected: icon === this.props.selected,
          onIconClick: this.props.onIconClick
        }));
      }
    });

    _etch2.default.update(this);
  }

  /**
   *
   * @returns {Object} description
   */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2ljb25zLmpzIl0sIm5hbWVzIjpbIkljb25zQ29udGFpbmVyIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsImZpbHRlckljb25zIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJldGNoIiwiaW5pdGlhbGl6ZSIsImRlc3Ryb3kiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImV2ZW50cyIsInNlYXJjaCIsImtleXVwIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImZpbHRlciIsImljb25zIiwiZm9yRWFjaCIsImljb24iLCJmaW5kaW5nIiwicmVwbGFjZSIsImxlbmd0aCIsImluY2x1ZGVzIiwicHVzaCIsInNlbGVjdGVkIiwib25JY29uQ2xpY2siLCJyZW5kZXIiLCJtYXAiLCJjaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQVBBOztBQVFlLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbEM7QUFDQUMsY0FBYUMsS0FBYixFQUFvQkMsUUFBcEIsRUFBOEI7QUFDNUJDLFlBQVFDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCSCxLQUE3Qjs7QUFFQSxTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtHLFdBQUw7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjs7QUFFQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNRixlQUFLRSxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjWixLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9TLGVBQUtHLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDs7OztBQUlBLE1BQUlDLE1BQUosR0FBYztBQUNaLFdBQU87QUFDTEMsY0FBUSxNQUFNLEtBQUtaLFdBQUwsRUFEVDtBQUVMYSxhQUFPQyxTQUFTLEtBQUtkLFdBQUwsQ0FBaUJjLE1BQU1DLE1BQU4sQ0FBYUMsS0FBOUI7QUFGWCxLQUFQO0FBSUQ7O0FBRUQ7Ozs7QUFJQSxRQUFNaEIsV0FBTixDQUFtQmlCLE1BQW5CLEVBQTJCO0FBQ3pCLFNBQUtDLEtBQUwsR0FBYSxFQUFiOztBQUVBQSxvQkFBTUMsT0FBTixDQUFjQyxRQUFRO0FBQ3BCLFlBQU1DLFVBQVVELEtBQUtFLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLEVBQXRCLENBQWhCOztBQUVBLFVBQUksQ0FBQ0wsTUFBRCxJQUFXLENBQUNBLE9BQU9NLE1BQW5CLElBQTZCRixRQUFRRyxRQUFSLENBQWlCUCxNQUFqQixDQUFqQyxFQUEyRDtBQUN6RCxhQUFLQyxLQUFMLENBQVdPLElBQVgsQ0FDRSxtQkFBQyxjQUFEO0FBQ0UsZ0JBQU1MLElBRFI7QUFFRSxvQkFBVUEsU0FBUyxLQUFLeEIsS0FBTCxDQUFXOEIsUUFGaEM7QUFHRSx1QkFBYSxLQUFLOUIsS0FBTCxDQUFXK0I7QUFIMUIsVUFERjtBQU9EO0FBQ0YsS0FaRDs7QUFjQXRCLG1CQUFLRyxNQUFMLENBQVksSUFBWjtBQUNEOztBQUVEOzs7O0FBSUFvQixXQUFVO0FBQ1IsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLGlCQUFmO0FBQ0csV0FBSy9CLFFBQUwsQ0FBY2dDLEdBQWQsQ0FBa0JDLFNBQVNBLEtBQTNCLENBREg7QUFFRTtBQUNFLG1CQUFVLGNBRFo7QUFFRSxjQUFLLFFBRlA7QUFHRSxZQUFJLEtBQUtuQixNQUhYO0FBSUUscUJBQVk7QUFKZCxRQUZGO0FBUUU7QUFBQTtBQUFBLFVBQUksV0FBVSxxQkFBZDtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBRUU7QUFBQTtBQUFBLGNBQU0sV0FBVSxXQUFoQjtBQUE2QixpQkFBS08sS0FBTCxDQUFXSztBQUF4QyxXQUZGO0FBQUE7QUFBQTtBQURGLE9BUkY7QUFjRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGFBQWY7QUFBOEIsYUFBS0w7QUFBbkM7QUFkRixLQURGO0FBa0JEO0FBM0ZpQztrQkFBZnhCLGMiLCJmaWxlIjoiaWNvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBpY29ucyBmcm9tICcuLy4uL2NvbnN0YW50cy9pY29ucyc7XG5pbXBvcnQgSWNvbiBmcm9tICcuLy4uL2NvbXBvbmVudHMvaWNvbic7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJY29uc0NvbnRhaW5lciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcywgY2hpbGRyZW4pIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBpY29ucycsIHByb3BzKTtcblxuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgdGhpcy5maWx0ZXJJY29ucygpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0IGV2ZW50cyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlYXJjaDogKCkgPT4gdGhpcy5maWx0ZXJJY29ucygpLFxuICAgICAga2V5dXA6IGV2ZW50ID0+IHRoaXMuZmlsdGVySWNvbnMoZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbHRlciAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyBmaWx0ZXJJY29ucyAoZmlsdGVyKSB7XG4gICAgdGhpcy5pY29ucyA9IFtdO1xuXG4gICAgaWNvbnMuZm9yRWFjaChpY29uID0+IHtcbiAgICAgIGNvbnN0IGZpbmRpbmcgPSBpY29uLnJlcGxhY2UoJy1pY29uJywgJycpO1xuXG4gICAgICBpZiAoIWZpbHRlciB8fCAhZmlsdGVyLmxlbmd0aCB8fCBmaW5kaW5nLmluY2x1ZGVzKGZpbHRlcikpIHtcbiAgICAgICAgdGhpcy5pY29ucy5wdXNoKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpY29uPXtpY29ufVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e2ljb24gPT09IHRoaXMucHJvcHMuc2VsZWN0ZWR9XG4gICAgICAgICAgICBvbkljb25DbGljaz17dGhpcy5wcm9wcy5vbkljb25DbGlja31cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXRjaC51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImlucHV0LXNlYXJjaFwiXG4gICAgICAgICAgdHlwZT1cInNlYXJjaFwiXG4gICAgICAgICAgb249e3RoaXMuZXZlbnRzfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwidHlwZSB0byBzZWFyY2ggZm9yIGFuIGljb25cIlxuICAgICAgICAvPlxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaW5mby1tZXNzYWdlcyBibG9ja1wiPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIFNob3dpbmcmbmJzcDtcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZ2hsaWdodFwiPnt0aGlzLmljb25zLmxlbmd0aH08L3NwYW4+Jm5ic3A7aWNvbihzKS5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWljb25zXCI+e3RoaXMuaWNvbnN9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=