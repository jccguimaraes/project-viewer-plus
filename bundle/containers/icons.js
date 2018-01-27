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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

/**
 *
 */
let IconsContainer = class IconsContainer {
  /**
   *
   * @param {Object} props - description
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
  destroy() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _etch2.default.destroy(_this);
    })();
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  update(props) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (props) {
        _this2.props = props;
        return _etch2.default.update(_this2);
      }

      return Promise.resolve();
    })();
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
  filterIcons(filter) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      _this3.icons = [];

      _icons2.default.forEach(function (icon) {
        const finding = icon.replace('-icon', '');

        if (!filter || !filter.length || finding.includes(filter)) {
          _this3.icons.push(_etch2.default.dom(_icon2.default, { icon: icon, onIconClick: _this3.props.onIconClick }));
        }
      });

      _etch2.default.update(_this3);
    })();
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
};
exports.default = IconsContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2ljb25zLmpzIl0sIm5hbWVzIjpbIkljb25zQ29udGFpbmVyIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImZpbHRlckljb25zIiwiZGlzcG9zYWJsZXMiLCJlbWl0dGVyIiwiaW5pdGlhbGl6ZSIsImRlc3Ryb3kiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImV2ZW50cyIsInNlYXJjaCIsImtleXVwIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImZpbHRlciIsImljb25zIiwiZm9yRWFjaCIsImZpbmRpbmciLCJpY29uIiwicmVwbGFjZSIsImxlbmd0aCIsImluY2x1ZGVzIiwicHVzaCIsIm9uSWNvbkNsaWNrIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FMQTs7QUFPQTs7O0lBR01BLGMsR0FBTixNQUFNQSxjQUFOLENBQXFCO0FBQ25COzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsV0FBTDtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsK0JBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLG1CQUFmOztBQUVBLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7OztBQUdNQyxTQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixZQUFNLGVBQUtBLE9BQUwsT0FBTjtBQURlO0FBRWhCOztBQUVEOzs7OztBQUtNQyxRQUFOLENBQWNOLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxlQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxlQUFPLGVBQUtNLE1BQUwsUUFBUDtBQUNEOztBQUVELGFBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQU5tQjtBQU9wQjs7QUFFRDs7OztBQUlBLE1BQUlDLE1BQUosR0FBYztBQUNaLFdBQU87QUFDTEMsY0FBUSxNQUFNLEtBQUtULFdBQUwsRUFEVDtBQUVMVSxhQUFPQyxTQUFTLEtBQUtYLFdBQUwsQ0FBaUJXLE1BQU1DLE1BQU4sQ0FBYUMsS0FBOUI7QUFGWCxLQUFQO0FBSUQ7O0FBRUQ7Ozs7QUFJTWIsYUFBTixDQUFtQmMsTUFBbkIsRUFBMkI7QUFBQTs7QUFBQTtBQUN6QixhQUFLQyxLQUFMLEdBQWEsRUFBYjs7QUFFQSxzQkFBTUMsT0FBTixDQUFjLGdCQUFRO0FBQ3BCLGNBQU1DLFVBQVVDLEtBQUtDLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLEVBQXRCLENBQWhCOztBQUVBLFlBQUksQ0FBQ0wsTUFBRCxJQUFXLENBQUNBLE9BQU9NLE1BQW5CLElBQTZCSCxRQUFRSSxRQUFSLENBQWlCUCxNQUFqQixDQUFqQyxFQUEyRDtBQUN6RCxpQkFBS0MsS0FBTCxDQUFXTyxJQUFYLENBQ0UscUNBQU0sTUFBTUosSUFBWixFQUFrQixhQUFhLE9BQUtuQixLQUFMLENBQVd3QixXQUExQyxHQURGO0FBR0Q7QUFDRixPQVJEOztBQVVBLHFCQUFLbEIsTUFBTDtBQWJ5QjtBQWMxQjs7QUFFRDs7OztBQUlBbUIsV0FBVTtBQUNSLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxpQkFBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FERjtBQUVFO0FBQ0UsbUJBQVUsY0FEWjtBQUVFLGNBQUssUUFGUDtBQUdFLFlBQUksS0FBS2hCLE1BSFg7QUFJRSxxQkFBWTtBQUpkLFFBRkY7QUFRRTtBQUFBO0FBQUEsVUFBSSxXQUFVLHFCQUFkO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFFRTtBQUFBO0FBQUEsY0FBTSxXQUFVLFdBQWhCO0FBQTZCLGlCQUFLTyxLQUFMLENBQVdLO0FBQXhDLFdBRkY7QUFBQTtBQUFBO0FBREYsT0FSRjtBQWNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUE4QixhQUFLTDtBQUFuQztBQWRGLEtBREY7QUFrQkQ7QUF6RmtCLEM7a0JBNEZObEIsYyIsImZpbGUiOiJpY29ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IGljb25zIGZyb20gJy4vLi4vY29uc3RhbnRzL2ljb25zJztcbmltcG9ydCBJY29uIGZyb20gJy4vLi4vY29tcG9uZW50cy9pY29uJztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBJY29uc0NvbnRhaW5lciB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZmlsdGVySWNvbnMoKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBldmVudHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZWFyY2g6ICgpID0+IHRoaXMuZmlsdGVySWNvbnMoKSxcbiAgICAgIGtleXVwOiBldmVudCA9PiB0aGlzLmZpbHRlckljb25zKGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWx0ZXIgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgZmlsdGVySWNvbnMgKGZpbHRlcikge1xuICAgIHRoaXMuaWNvbnMgPSBbXTtcblxuICAgIGljb25zLmZvckVhY2goaWNvbiA9PiB7XG4gICAgICBjb25zdCBmaW5kaW5nID0gaWNvbi5yZXBsYWNlKCctaWNvbicsICcnKTtcblxuICAgICAgaWYgKCFmaWx0ZXIgfHwgIWZpbHRlci5sZW5ndGggfHwgZmluZGluZy5pbmNsdWRlcyhmaWx0ZXIpKSB7XG4gICAgICAgIHRoaXMuaWNvbnMucHVzaChcbiAgICAgICAgICA8SWNvbiBpY29uPXtpY29ufSBvbkljb25DbGljaz17dGhpcy5wcm9wcy5vbkljb25DbGlja30gLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICA8aDI+SWNvbnM8L2gyPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJpbnB1dC1zZWFyY2hcIlxuICAgICAgICAgIHR5cGU9XCJzZWFyY2hcIlxuICAgICAgICAgIG9uPXt0aGlzLmV2ZW50c31cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cInR5cGUgdG8gc2VhcmNoIGZvciBhbiBpY29uXCJcbiAgICAgICAgLz5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cImluZm8tbWVzc2FnZXMgYmxvY2tcIj5cbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICBTaG93aW5nJm5ic3A7XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWdobGlnaHRcIj57dGhpcy5pY29ucy5sZW5ndGh9PC9zcGFuPiZuYnNwO2ljb24ocykuXG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1pY29uc1wiPnt0aGlzLmljb25zfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJY29uc0NvbnRhaW5lcjtcbiJdfQ==