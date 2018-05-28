'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @todo
 */
class EmptyComponent {
  /**
   * @todo
   * @param {Object} props - description
   */
  constructor(props) {
    this.props = props;
    _etch2.default.initialize(this);
  }

  /**
   * @todo
   * @param {Object} props - description
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
   * @todo
   */
  async destroy() {
    await _etch2.default.destroy(this);
  }

  /**
   * @todo
   */
  handleCreate() {
    this.onCreate();
  }

  /**
   *
   */
  handleImport() {}

  /**
   * @todo
   * @returns {Object} description
   */
  render() {
    const loader = _etch2.default.dom(
      'div',
      { className: 'empty-options' },
      _etch2.default.dom('span', { className: 'loading loading-spinner-small inline-block' })
    );

    const buttons = _etch2.default.dom(
      'div',
      { className: 'empty-options' },
      _etch2.default.dom(
        'button',
        { className: 'btn btn-info btn-xs', on: { click: this.handleCreate } },
        'Create'
      ),
      _etch2.default.dom(
        'button',
        { className: 'btn btn-info btn-xs', on: { click: this.handleImport } },
        'Import legacy'
      )
    );

    return this.props.loading ? loader : buttons;
  }
}
exports.default = EmptyComponent; /** @jsx etch.dom */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2VtcHR5LmpzIl0sIm5hbWVzIjpbIkVtcHR5Q29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwiaGFuZGxlQ3JlYXRlIiwib25DcmVhdGUiLCJoYW5kbGVJbXBvcnQiLCJyZW5kZXIiLCJsb2FkZXIiLCJidXR0b25zIiwiY2xpY2siLCJsb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbEM7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNILEtBQWQsRUFBcUI7QUFDbkIsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBT0MsZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEOzs7QUFHQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2YsVUFBTUwsZUFBS0ssT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEOzs7QUFHQUMsaUJBQWdCO0FBQ2QsU0FBS0MsUUFBTDtBQUNEOztBQUVEOzs7QUFHQUMsaUJBQWdCLENBQUU7O0FBRWxCOzs7O0FBSUFDLFdBQVU7QUFDUixVQUFNQyxTQUFTO0FBQUE7QUFBQSxRQUFLLFdBQVUsZUFBZjtBQUNiLG1DQUFNLFdBQVUsNENBQWhCO0FBRGEsS0FBZjs7QUFJQSxVQUFNQyxVQUFVO0FBQUE7QUFBQSxRQUFLLFdBQVUsZUFBZjtBQUNkO0FBQUE7QUFBQSxVQUFRLFdBQVUscUJBQWxCLEVBQXdDLElBQUksRUFBRUMsT0FBTyxLQUFLTixZQUFkLEVBQTVDO0FBQUE7QUFBQSxPQURjO0FBSWQ7QUFBQTtBQUFBLFVBQVEsV0FBVSxxQkFBbEIsRUFBd0MsSUFBSSxFQUFFTSxPQUFPLEtBQUtKLFlBQWQsRUFBNUM7QUFBQTtBQUFBO0FBSmMsS0FBaEI7O0FBU0EsV0FBTyxLQUFLVCxLQUFMLENBQVdjLE9BQVgsR0FBcUJILE1BQXJCLEdBQThCQyxPQUFyQztBQUNEO0FBOURpQztrQkFBZmQsYyxFQVByQiIsImZpbGUiOiJlbXB0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKipcbiAqIEB0b2RvXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtcHR5Q29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEB0b2RvXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQHRvZG9cbiAgICovXG4gIGhhbmRsZUNyZWF0ZSAoKSB7XG4gICAgdGhpcy5vbkNyZWF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBoYW5kbGVJbXBvcnQgKCkge31cblxuICAvKipcbiAgICogQHRvZG9cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgbG9hZGVyID0gPGRpdiBjbGFzc05hbWU9XCJlbXB0eS1vcHRpb25zXCI+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9J2xvYWRpbmcgbG9hZGluZy1zcGlubmVyLXNtYWxsIGlubGluZS1ibG9jayc+PC9zcGFuPlxuICAgIDwvZGl2PjtcblxuICAgIGNvbnN0IGJ1dHRvbnMgPSA8ZGl2IGNsYXNzTmFtZT1cImVtcHR5LW9wdGlvbnNcIj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvIGJ0bi14c1wiIG9uPXt7IGNsaWNrOiB0aGlzLmhhbmRsZUNyZWF0ZSB9fT5cbiAgICAgICAgQ3JlYXRlXG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvIGJ0bi14c1wiIG9uPXt7IGNsaWNrOiB0aGlzLmhhbmRsZUltcG9ydCB9fT5cbiAgICAgICAgSW1wb3J0IGxlZ2FjeVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+O1xuXG4gICAgcmV0dXJuIHRoaXMucHJvcHMubG9hZGluZyA/IGxvYWRlciA6IGJ1dHRvbnM7XG4gIH1cbn1cbiJdfQ==