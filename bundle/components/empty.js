'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

/**
 *
 */
let EmptyComponent = class EmptyComponent {

  /**
   *
   * @param {Object} props - description
   */
  constructor(props) {
    this.props = props;

    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (props) {
        _this.props = props;
        return _etch2.default.update(_this);
      }

      return Promise.resolve();
    })();
  }

  /**
   *
   */
  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _etch2.default.destroy(_this2);
    })();
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    return _etch2.default.dom(
      'ul',
      { className: 'background-message centered' },
      _etch2.default.dom(
        'li',
        null,
        _etch2.default.dom('span', { className: 'icon icon-tasklist' })
      )
    );
  }
};
exports.default = EmptyComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2VtcHR5LmpzIl0sIm5hbWVzIjpbIkVtcHR5Q29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7Ozs7MmNBRkE7O0FBSUE7OztJQUdNQSxjLEdBQU4sTUFBTUEsY0FBTixDQUFxQjs7QUFFbkI7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7O0FBRUEsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLTUMsUUFBTixDQUFjRixLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsVUFBSUEsS0FBSixFQUFXO0FBQ1QsY0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsZUFBTyxlQUFLRSxNQUFMLE9BQVA7QUFDRDs7QUFFRCxhQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFObUI7QUFPcEI7O0FBRUQ7OztBQUdNQyxTQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixZQUFNLGVBQUtBLE9BQUwsUUFBTjtBQURlO0FBRWhCOztBQUVEOzs7O0FBSUFDLFdBQVU7QUFDUixXQUNFO0FBQUE7QUFBQSxRQUFJLFdBQVUsNkJBQWQ7QUFDRTtBQUFBO0FBQUE7QUFDRSxxQ0FBTSxXQUFVLG9CQUFoQjtBQURGO0FBREYsS0FERjtBQU9EO0FBN0NrQixDO2tCQWdETlIsYyIsImZpbGUiOiJlbXB0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIEVtcHR5Q29tcG9uZW50IHtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPSdiYWNrZ3JvdW5kLW1lc3NhZ2UgY2VudGVyZWQnPlxuICAgICAgICA8bGk+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpY29uIGljb24tdGFza2xpc3QnPjwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbXB0eUNvbXBvbmVudDtcbiJdfQ==