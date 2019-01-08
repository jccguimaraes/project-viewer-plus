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

/**
 *
 */
/** @jsx etch.dom */

class IconsContainer {
  /**
   *
   * @param {Object} [props] etch component properties
   */
  constructor(props) {
    this.props = props;
    this.filterIcons();
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();

    _etch2.default.initialize(this);
  }

  /**
   *
   */
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

    _etch2.default.update(this, false);
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    return _etch2.default.dom(
      'div',
      { className: 'block-container' },
      _etch2.default.dom(
        'h2',
        null,
        'Icons'
      ),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2ljb25zLmpzIl0sIm5hbWVzIjpbIkljb25zQ29udGFpbmVyIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImZpbHRlckljb25zIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJldGNoIiwiaW5pdGlhbGl6ZSIsImRlc3Ryb3kiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImV2ZW50cyIsInNlYXJjaCIsImtleXVwIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImZpbHRlciIsImljb25zIiwiZm9yRWFjaCIsImljb24iLCJmaW5kaW5nIiwicmVwbGFjZSIsImxlbmd0aCIsImluY2x1ZGVzIiwicHVzaCIsInNlbGVjdGVkIiwib25JY29uQ2xpY2siLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7OztBQVBBOztBQVVlLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbEM7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxXQUFMO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixJQUFJQyx5QkFBSixFQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxhQUFKLEVBQWY7O0FBRUFDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7OztBQUdBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNRixlQUFLRSxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjVCxLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9NLGVBQUtHLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDs7OztBQUlBLE1BQUlDLE1BQUosR0FBYztBQUNaLFdBQU87QUFDTEMsY0FBUSxNQUFNLEtBQUtaLFdBQUwsRUFEVDtBQUVMYSxhQUFPQyxTQUFTLEtBQUtkLFdBQUwsQ0FBaUJjLE1BQU1DLE1BQU4sQ0FBYUMsS0FBOUI7QUFGWCxLQUFQO0FBSUQ7O0FBRUQ7Ozs7QUFJQSxRQUFNaEIsV0FBTixDQUFtQmlCLE1BQW5CLEVBQTJCO0FBQ3pCLFNBQUtDLEtBQUwsR0FBYSxFQUFiOztBQUVBQSxvQkFBTUMsT0FBTixDQUFjQyxRQUFRO0FBQ3BCLFlBQU1DLFVBQVVELEtBQUtFLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLEVBQXRCLENBQWhCOztBQUVBLFVBQUksQ0FBQ0wsTUFBRCxJQUFXLENBQUNBLE9BQU9NLE1BQW5CLElBQTZCRixRQUFRRyxRQUFSLENBQWlCUCxNQUFqQixDQUFqQyxFQUEyRDtBQUN6RCxhQUFLQyxLQUFMLENBQVdPLElBQVgsQ0FDRSxtQkFBQyxjQUFEO0FBQ0UsZ0JBQU1MLElBRFI7QUFFRSxvQkFBVUEsU0FBUyxLQUFLckIsS0FBTCxDQUFXMkIsUUFGaEM7QUFHRSx1QkFBYSxLQUFLM0IsS0FBTCxDQUFXNEI7QUFIMUIsVUFERjtBQU9EO0FBQ0YsS0FaRDs7QUFjQXRCLG1CQUFLRyxNQUFMLENBQVksSUFBWixFQUFrQixLQUFsQjtBQUNEOztBQUVEOzs7O0FBSUFvQixXQUFVO0FBQ1IsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURGO0FBRUU7QUFDRSxtQkFBVSxjQURaO0FBRUUsY0FBSyxRQUZQO0FBR0UsWUFBSSxLQUFLakIsTUFIWDtBQUlFLHFCQUFZO0FBSmQsUUFGRjtBQVFFO0FBQUE7QUFBQSxVQUFJLFdBQVUscUJBQWQ7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUVFO0FBQUE7QUFBQSxjQUFNLFdBQVUsV0FBaEI7QUFBNkIsaUJBQUtPLEtBQUwsQ0FBV0s7QUFBeEMsV0FGRjtBQUFBO0FBQUE7QUFERixPQVJGO0FBY0U7QUFBQTtBQUFBLFVBQUssV0FBVSxhQUFmO0FBQThCLGFBQUtMO0FBQW5DO0FBZEYsS0FERjtBQWtCRDtBQTdGaUM7a0JBQWZyQixjIiwiZmlsZSI6Imljb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgRW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgaWNvbnMgZnJvbSAnLi8uLi9jb25zdGFudHMvaWNvbnMnO1xuaW1wb3J0IEljb24gZnJvbSAnLi8uLi9jb21wb25lbnRzL2ljb24nO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb25zQ29udGFpbmVyIHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB0aGlzLmZpbHRlckljb25zKCk7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBldmVudHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZWFyY2g6ICgpID0+IHRoaXMuZmlsdGVySWNvbnMoKSxcbiAgICAgIGtleXVwOiBldmVudCA9PiB0aGlzLmZpbHRlckljb25zKGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWx0ZXIgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgZmlsdGVySWNvbnMgKGZpbHRlcikge1xuICAgIHRoaXMuaWNvbnMgPSBbXTtcblxuICAgIGljb25zLmZvckVhY2goaWNvbiA9PiB7XG4gICAgICBjb25zdCBmaW5kaW5nID0gaWNvbi5yZXBsYWNlKCctaWNvbicsICcnKTtcblxuICAgICAgaWYgKCFmaWx0ZXIgfHwgIWZpbHRlci5sZW5ndGggfHwgZmluZGluZy5pbmNsdWRlcyhmaWx0ZXIpKSB7XG4gICAgICAgIHRoaXMuaWNvbnMucHVzaChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWNvbj17aWNvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXtpY29uID09PSB0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgb25JY29uQ2xpY2s9e3RoaXMucHJvcHMub25JY29uQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGV0Y2gudXBkYXRlKHRoaXMsIGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAgPGgyPkljb25zPC9oMj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXQtc2VhcmNoXCJcbiAgICAgICAgICB0eXBlPVwic2VhcmNoXCJcbiAgICAgICAgICBvbj17dGhpcy5ldmVudHN9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJ0eXBlIHRvIHNlYXJjaCBmb3IgYW4gaWNvblwiXG4gICAgICAgIC8+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmZvLW1lc3NhZ2VzIGJsb2NrXCI+XG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAgU2hvd2luZyZuYnNwO1xuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlnaGxpZ2h0XCI+e3RoaXMuaWNvbnMubGVuZ3RofTwvc3Bhbj4mbmJzcDtpY29uKHMpLlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2staWNvbnNcIj57dGhpcy5pY29uc308L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==