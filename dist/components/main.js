'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _list = require('./../containers/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
/** @jsx etch.dom */

class MainComponent {
  /**
   * @param {Object} props etch component properties
   */
  constructor(props) {
    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  update(props) {
    console.log('update', props);
    if (props) {
      this.props = props;
      return _etch2.default.update(this, false);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    const { projects = [], groups = [] } = this.props || {};

    return _etch2.default.dom(_list2.default, { groups: groups, projects: projects, isRoot: true });
  }
}
exports.default = MainComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJwcm9qZWN0cyIsImdyb3VwcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFMQTs7QUFNZSxNQUFNQSxhQUFOLENBQW9CO0FBQ2pDOzs7QUFHQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQkMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsU0FBUUgsS0FBUixFQUFlO0FBQ2JJLFlBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCTCxLQUF0QjtBQUNBLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9DLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLEVBQWtCLEtBQWxCLENBQVA7QUFDRDs7QUFFRCxXQUFPRyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNUCxlQUFLTyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSLFVBQU0sRUFBRUMsV0FBVyxFQUFiLEVBQWlCQyxTQUFTLEVBQTFCLEtBQWlDLEtBQUtYLEtBQUwsSUFBYyxFQUFyRDs7QUFFQSxXQUFPLG1CQUFDLGNBQUQsSUFBZSxRQUFRVyxNQUF2QixFQUErQixVQUFVRCxRQUF6QyxFQUFtRCxZQUFuRCxHQUFQO0FBQ0Q7QUFqQ2dDO2tCQUFkWixhIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBMaXN0Q29udGFpbmVyIGZyb20gJy4vLi4vY29udGFpbmVycy9saXN0JztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5Db21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZScsIHByb3BzKTtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHByb2plY3RzID0gW10sIGdyb3VwcyA9IFtdIH0gPSB0aGlzLnByb3BzIHx8IHt9O1xuXG4gICAgcmV0dXJuIDxMaXN0Q29udGFpbmVyIGdyb3Vwcz17Z3JvdXBzfSBwcm9qZWN0cz17cHJvamVjdHN9IGlzUm9vdCAvPjtcbiAgfVxufVxuIl19