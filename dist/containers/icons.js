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
  /**
   *
   * @param {Object} [props] etch component properties
   */
  constructor(props) {
    console.log('created icons', props);

    this.props = props;
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

    _etch2.default.update(this, false);
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    return _etch2.default.dom(
      'div',
      null,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2ljb25zLmpzIl0sIm5hbWVzIjpbIkljb25zQ29udGFpbmVyIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJmaWx0ZXJJY29ucyIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZXRjaCIsImluaXRpYWxpemUiLCJkZXN0cm95IiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJldmVudHMiLCJzZWFyY2giLCJrZXl1cCIsImV2ZW50IiwidGFyZ2V0IiwidmFsdWUiLCJmaWx0ZXIiLCJpY29ucyIsImZvckVhY2giLCJpY29uIiwiZmluZGluZyIsInJlcGxhY2UiLCJsZW5ndGgiLCJpbmNsdWRlcyIsInB1c2giLCJzZWxlY3RlZCIsIm9uSWNvbkNsaWNrIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBO0FBUEE7O0FBUWUsTUFBTUEsY0FBTixDQUFxQjtBQUNsQzs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCQyxZQUFRQyxHQUFSLENBQVksZUFBWixFQUE2QkYsS0FBN0I7O0FBRUEsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0csV0FBTDtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMseUJBQUosRUFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSUMsYUFBSixFQUFmOztBQUVBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1GLGVBQUtFLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNYLEtBQWQsRUFBcUI7QUFDbkIsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBT1EsZUFBS0csTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEOzs7O0FBSUEsTUFBSUMsTUFBSixHQUFjO0FBQ1osV0FBTztBQUNMQyxjQUFRLE1BQU0sS0FBS1osV0FBTCxFQURUO0FBRUxhLGFBQU9DLFNBQVMsS0FBS2QsV0FBTCxDQUFpQmMsTUFBTUMsTUFBTixDQUFhQyxLQUE5QjtBQUZYLEtBQVA7QUFJRDs7QUFFRDs7OztBQUlBLFFBQU1oQixXQUFOLENBQW1CaUIsTUFBbkIsRUFBMkI7QUFDekIsU0FBS0MsS0FBTCxHQUFhLEVBQWI7O0FBRUFBLG9CQUFNQyxPQUFOLENBQWNDLFFBQVE7QUFDcEIsWUFBTUMsVUFBVUQsS0FBS0UsT0FBTCxDQUFhLE9BQWIsRUFBc0IsRUFBdEIsQ0FBaEI7O0FBRUEsVUFBSSxDQUFDTCxNQUFELElBQVcsQ0FBQ0EsT0FBT00sTUFBbkIsSUFBNkJGLFFBQVFHLFFBQVIsQ0FBaUJQLE1BQWpCLENBQWpDLEVBQTJEO0FBQ3pELGFBQUtDLEtBQUwsQ0FBV08sSUFBWCxDQUNFLG1CQUFDLGNBQUQ7QUFDRSxnQkFBTUwsSUFEUjtBQUVFLG9CQUFVQSxTQUFTLEtBQUt2QixLQUFMLENBQVc2QixRQUZoQztBQUdFLHVCQUFhLEtBQUs3QixLQUFMLENBQVc4QjtBQUgxQixVQURGO0FBT0Q7QUFDRixLQVpEOztBQWNBdEIsbUJBQUtHLE1BQUwsQ0FBWSxJQUFaLEVBQWtCLEtBQWxCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQW9CLFdBQVU7QUFDUixXQUNFO0FBQUE7QUFBQTtBQUNFO0FBQ0UsbUJBQVUsY0FEWjtBQUVFLGNBQUssUUFGUDtBQUdFLFlBQUksS0FBS2pCLE1BSFg7QUFJRSxxQkFBWTtBQUpkLFFBREY7QUFPRTtBQUFBO0FBQUEsVUFBSSxXQUFVLHFCQUFkO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFFRTtBQUFBO0FBQUEsY0FBTSxXQUFVLFdBQWhCO0FBQTZCLGlCQUFLTyxLQUFMLENBQVdLO0FBQXhDLFdBRkY7QUFBQTtBQUFBO0FBREYsT0FQRjtBQWFFO0FBQUE7QUFBQSxVQUFLLFdBQVUsYUFBZjtBQUE4QixhQUFLTDtBQUFuQztBQWJGLEtBREY7QUFpQkQ7QUE1RmlDO2tCQUFmdkIsYyIsImZpbGUiOiJpY29ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IGljb25zIGZyb20gJy4vLi4vY29uc3RhbnRzL2ljb25zJztcbmltcG9ydCBJY29uIGZyb20gJy4vLi4vY29tcG9uZW50cy9pY29uJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb25zQ29udGFpbmVyIHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGljb25zJywgcHJvcHMpO1xuXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZmlsdGVySWNvbnMoKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBldmVudHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZWFyY2g6ICgpID0+IHRoaXMuZmlsdGVySWNvbnMoKSxcbiAgICAgIGtleXVwOiBldmVudCA9PiB0aGlzLmZpbHRlckljb25zKGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWx0ZXIgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgZmlsdGVySWNvbnMgKGZpbHRlcikge1xuICAgIHRoaXMuaWNvbnMgPSBbXTtcblxuICAgIGljb25zLmZvckVhY2goaWNvbiA9PiB7XG4gICAgICBjb25zdCBmaW5kaW5nID0gaWNvbi5yZXBsYWNlKCctaWNvbicsICcnKTtcblxuICAgICAgaWYgKCFmaWx0ZXIgfHwgIWZpbHRlci5sZW5ndGggfHwgZmluZGluZy5pbmNsdWRlcyhmaWx0ZXIpKSB7XG4gICAgICAgIHRoaXMuaWNvbnMucHVzaChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWNvbj17aWNvbn1cbiAgICAgICAgICAgIHNlbGVjdGVkPXtpY29uID09PSB0aGlzLnByb3BzLnNlbGVjdGVkfVxuICAgICAgICAgICAgb25JY29uQ2xpY2s9e3RoaXMucHJvcHMub25JY29uQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGV0Y2gudXBkYXRlKHRoaXMsIGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXQtc2VhcmNoXCJcbiAgICAgICAgICB0eXBlPVwic2VhcmNoXCJcbiAgICAgICAgICBvbj17dGhpcy5ldmVudHN9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJ0eXBlIHRvIHNlYXJjaCBmb3IgYW4gaWNvblwiXG4gICAgICAgIC8+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJpbmZvLW1lc3NhZ2VzIGJsb2NrXCI+XG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAgU2hvd2luZyZuYnNwO1xuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlnaGxpZ2h0XCI+e3RoaXMuaWNvbnMubGVuZ3RofTwvc3Bhbj4mbmJzcDtpY29uKHMpLlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2staWNvbnNcIj57dGhpcy5pY29uc308L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==