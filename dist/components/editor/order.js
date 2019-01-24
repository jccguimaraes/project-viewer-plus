'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class EditorOrder {
  /* eslint-disable-next-line require-jsdoc */
  constructor(props, children) {
    console.log('created editor-order component');

    this.children = children;
    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    console.log('updated editor-order component', this, props);

    if (props) {
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed editor-order component', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered editor-order component', this);

    return _etch2.default.dom(
      'div',
      { className: 'block-container' },
      this.children.map(child => child),
      _etch2.default.dom(
        'label',
        null,
        'Sort By\xA0',
        _etch2.default.dom(
          'select',
          { 'class': 'input-select' },
          _etch2.default.dom(
            'option',
            null,
            'Alphabetically'
          ),
          _etch2.default.dom(
            'option',
            null,
            'Position'
          )
        )
      )
    );
  }
}
exports.default = EditorOrder; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9vcmRlci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JPcmRlciIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJjaGlsZHJlbiIsImNvbnNvbGUiLCJsb2ciLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsIm1hcCIsImNoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxXQUFOLENBQWtCO0FBQy9CO0FBQ0FDLGNBQWFDLEtBQWIsRUFBb0JDLFFBQXBCLEVBQThCO0FBQzVCQyxZQUFRQyxHQUFSLENBQVksZ0NBQVo7O0FBRUEsU0FBS0YsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQUcsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNOLEtBQWQsRUFBcUI7QUFDbkJFLFlBQVFDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4QyxJQUE5QyxFQUFvREgsS0FBcEQ7O0FBRUEsUUFBSUEsS0FBSixFQUFXO0FBQ1QsYUFBT0ksZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmUCxZQUFRQyxHQUFSLENBQVksa0NBQVosRUFBZ0QsSUFBaEQ7QUFDQSxVQUFNQyxlQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSUixZQUFRQyxHQUFSLENBQVksaUNBQVosRUFBK0MsSUFBL0M7O0FBRUEsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLGlCQUFmO0FBQ0csV0FBS0YsUUFBTCxDQUFjVSxHQUFkLENBQWtCQyxTQUFTQSxLQUEzQixDQURIO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFFRTtBQUFBO0FBQUEsWUFBUSxTQUFNLGNBQWQ7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkY7QUFGRjtBQUZGLEtBREY7QUFZRDtBQTlDOEI7a0JBQVpkLFcsRUFMckIiLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvck9yZGVyIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzLCBjaGlsZHJlbikge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvci1vcmRlciBjb21wb25lbnQnKTtcblxuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIGVkaXRvci1vcmRlciBjb21wb25lbnQnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGVkaXRvci1vcmRlciBjb21wb25lbnQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBlZGl0b3Itb3JkZXIgY29tcG9uZW50JywgdGhpcyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAge3RoaXMuY2hpbGRyZW4ubWFwKGNoaWxkID0+IGNoaWxkKX1cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgIFNvcnQgQnkmbmJzcDtcbiAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiaW5wdXQtc2VsZWN0XCI+XG4gICAgICAgICAgICA8b3B0aW9uPkFscGhhYmV0aWNhbGx5PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uPlBvc2l0aW9uPC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=