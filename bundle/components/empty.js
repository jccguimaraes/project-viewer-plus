'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _database = require('./../services/database');

var _database2 = _interopRequireDefault(_database);

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
    this.database = new _database2.default();

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
   */
  onCreate() {
    this.database.createDatabase();
  }

  /**
   *
   */
  onFile() {}

  /**
   *
   */
  onImport() {
    this.database.importContent();
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    return _etch2.default.dom(
      'div',
      { className: 'empty-options' },
      _etch2.default.dom(
        'button',
        { className: 'btn btn-info btn-xs', on: { click: this.onCreate } },
        'Create'
      ),
      _etch2.default.dom(
        'button',
        { className: 'btn btn-info btn-xs', on: { click: this.onFile } },
        'Import from file...'
      ),
      _etch2.default.dom(
        'button',
        { className: 'btn btn-info btn-xs', on: { click: this.onImport } },
        'Import legacy'
      )
    );
  }
};
exports.default = EmptyComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2VtcHR5LmpzIl0sIm5hbWVzIjpbIkVtcHR5Q29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImRhdGFiYXNlIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsIm9uQ3JlYXRlIiwiY3JlYXRlRGF0YWJhc2UiLCJvbkZpbGUiLCJvbkltcG9ydCIsImltcG9ydENvbnRlbnQiLCJyZW5kZXIiLCJjbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7Ozs7OzJjQUhBOztBQUtBOzs7SUFHTUEsYyxHQUFOLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbkI7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLHdCQUFoQjs7QUFFQSxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtNQyxRQUFOLENBQWNILEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxjQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxlQUFPLGVBQUtHLE1BQUwsT0FBUDtBQUNEOztBQUVELGFBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQU5tQjtBQU9wQjs7QUFFRDs7O0FBR01DLFNBQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmLFlBQU0sZUFBS0EsT0FBTCxRQUFOO0FBRGU7QUFFaEI7O0FBRUQ7OztBQUdBQyxhQUFZO0FBQ1YsU0FBS04sUUFBTCxDQUFjTyxjQUFkO0FBQ0Q7O0FBRUQ7OztBQUdBQyxXQUFVLENBQUU7O0FBRVo7OztBQUdBQyxhQUFZO0FBQ1YsU0FBS1QsUUFBTCxDQUFjVSxhQUFkO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsV0FBVTtBQUNSLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxlQUFmO0FBQ0U7QUFBQTtBQUFBLFVBQVEsV0FBVSxxQkFBbEIsRUFBd0MsSUFBSSxFQUFFQyxPQUFPLEtBQUtOLFFBQWQsRUFBNUM7QUFBQTtBQUFBLE9BREY7QUFJRTtBQUFBO0FBQUEsVUFBUSxXQUFVLHFCQUFsQixFQUF3QyxJQUFJLEVBQUVNLE9BQU8sS0FBS0osTUFBZCxFQUE1QztBQUFBO0FBQUEsT0FKRjtBQU9FO0FBQUE7QUFBQSxVQUFRLFdBQVUscUJBQWxCLEVBQXdDLElBQUksRUFBRUksT0FBTyxLQUFLSCxRQUFkLEVBQTVDO0FBQUE7QUFBQTtBQVBGLEtBREY7QUFhRDtBQXRFa0IsQztrQkF5RU5aLGMiLCJmaWxlIjoiZW1wdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuLy4uL3NlcnZpY2VzL2RhdGFiYXNlJztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBFbXB0eUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2UoKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBvbkNyZWF0ZSAoKSB7XG4gICAgdGhpcy5kYXRhYmFzZS5jcmVhdGVEYXRhYmFzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBvbkZpbGUgKCkge31cblxuICAvKipcbiAgICpcbiAgICovXG4gIG9uSW1wb3J0ICgpIHtcbiAgICB0aGlzLmRhdGFiYXNlLmltcG9ydENvbnRlbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbXB0eS1vcHRpb25zXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvIGJ0bi14c1wiIG9uPXt7IGNsaWNrOiB0aGlzLm9uQ3JlYXRlIH19PlxuICAgICAgICAgIENyZWF0ZVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWluZm8gYnRuLXhzXCIgb249e3sgY2xpY2s6IHRoaXMub25GaWxlIH19PlxuICAgICAgICAgIEltcG9ydCBmcm9tIGZpbGUuLi5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvIGJ0bi14c1wiIG9uPXt7IGNsaWNrOiB0aGlzLm9uSW1wb3J0IH19PlxuICAgICAgICAgIEltcG9ydCBsZWdhY3lcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVtcHR5Q29tcG9uZW50O1xuIl19