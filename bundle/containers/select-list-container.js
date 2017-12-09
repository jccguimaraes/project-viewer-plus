Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _atomSelectList = require('atom-select-list');

var _atomSelectList2 = _interopRequireDefault(_atomSelectList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

// import SelectList from '../components/select-list-component';


/**
 *
 */
let SelectListContainer = class SelectListContainer {

  /**
   *
   */
  constructor() {
    if (SelectListContainer.instance) {
      return SelectListContainer.instance;
    }
    SelectListContainer.instance = this;

    this.setItems();
    _etch2.default.initialize(this);
  }

  /**
   *
   * @returns {boolean} description
   */
  get selectQuery() {
    return true;
  }

  /**
   *
   * @returns {string} description
   */
  get emptyMessage() {
    return 'No projects found :(';
  }

  /**
   *
   * @param {string} item - description
   * @returns {string} description
   */
  filterKeyForItem(item) {
    return item.name;
  }

  /**
   *
   */
  show() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!_this.panel) {
        _this.panel = yield atom.workspace.addModalPanel({
          item: _this.element,
          visible: false,
          autoFocus: true
        });
      }

      if (_this.panel.isVisible()) {
        _this.panel.hide();
      } else {
        _this.panel.show();
        _this.focus();
      }
    })();
  }

  /**
   *
   * @param {Array} items - description
   */
  setItems(items) {
    this.items = !items ? [] : items.ids.map(id => {
      const candidate = items.map[id];
      if (candidate.type === 'project') {
        return candidate.model;
      }
    }).filter(model => model);

    this.update(this);
  }

  /**
   *
   * @param {*} item - description
   * @returns {Object} An HTMLElement
   */
  elementForItem(item) {
    const element = document.createElement('li');
    element.textContent = item.name;
    return element;
  }

  /**
   *
   * @param {*} item - description
   */
  didConfirmSelection(item) {
    devlog('didConfirmSelection', item);
    this.panel.hide();
  }

  /**
   *
   */
  didCancelSelection() {
    devlog('didCancelSelection');
    this.panel.hide();
  }

  /**
   *
   */
  focus() {
    devlog(this);
    this.element.focus();
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  update(props) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.props = props;
      return _etch2.default.update(_this2);
    })();
  }

  /**
   *
   */
  destroy() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      _this3.panel.destroy();
      yield _etch2.default.destroy(_this3);
    })();
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    return _etch2.default.dom(_atomSelectList2.default, this);
  }
};
exports.default = SelectListContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL3NlbGVjdC1saXN0LWNvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJTZWxlY3RMaXN0Q29udGFpbmVyIiwiY29uc3RydWN0b3IiLCJpbnN0YW5jZSIsInNldEl0ZW1zIiwiaW5pdGlhbGl6ZSIsInNlbGVjdFF1ZXJ5IiwiZW1wdHlNZXNzYWdlIiwiZmlsdGVyS2V5Rm9ySXRlbSIsIml0ZW0iLCJuYW1lIiwic2hvdyIsInBhbmVsIiwiYXRvbSIsIndvcmtzcGFjZSIsImFkZE1vZGFsUGFuZWwiLCJlbGVtZW50IiwidmlzaWJsZSIsImF1dG9Gb2N1cyIsImlzVmlzaWJsZSIsImhpZGUiLCJmb2N1cyIsIml0ZW1zIiwiaWRzIiwibWFwIiwiaWQiLCJjYW5kaWRhdGUiLCJ0eXBlIiwibW9kZWwiLCJmaWx0ZXIiLCJ1cGRhdGUiLCJlbGVtZW50Rm9ySXRlbSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwiZGlkQ29uZmlybVNlbGVjdGlvbiIsImRldmxvZyIsImRpZENhbmNlbFNlbGVjdGlvbiIsInByb3BzIiwiZGVzdHJveSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7OztBQUVBOzs7O0FBRUE7Ozs7OzsyY0FKQTs7QUFHQTs7O0FBR0E7OztJQUdNQSxtQixHQUFOLE1BQU1BLG1CQUFOLENBQTBCOztBQUl4Qjs7O0FBR0FDLGdCQUFlO0FBQ2IsUUFBSUQsb0JBQW9CRSxRQUF4QixFQUFrQztBQUNoQyxhQUFPRixvQkFBb0JFLFFBQTNCO0FBQ0Q7QUFDREYsd0JBQW9CRSxRQUFwQixHQUErQixJQUEvQjs7QUFFQSxTQUFLQyxRQUFMO0FBQ0EsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7OztBQUlBLE1BQUlDLFdBQUosR0FBbUI7QUFDakIsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxNQUFJQyxZQUFKLEdBQW9CO0FBQ2xCLFdBQU8sc0JBQVA7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsbUJBQWtCQyxJQUFsQixFQUF3QjtBQUN0QixXQUFPQSxLQUFLQyxJQUFaO0FBQ0Q7O0FBRUQ7OztBQUdNQyxNQUFOLEdBQWM7QUFBQTs7QUFBQTtBQUNaLFVBQUksQ0FBQyxNQUFLQyxLQUFWLEVBQWlCO0FBQ2YsY0FBS0EsS0FBTCxHQUFhLE1BQU1DLEtBQUtDLFNBQUwsQ0FBZUMsYUFBZixDQUE2QjtBQUM5Q04sZ0JBQU0sTUFBS08sT0FEbUM7QUFFOUNDLG1CQUFTLEtBRnFDO0FBRzlDQyxxQkFBVztBQUhtQyxTQUE3QixDQUFuQjtBQUtEOztBQUVELFVBQUksTUFBS04sS0FBTCxDQUFXTyxTQUFYLEVBQUosRUFBNEI7QUFDMUIsY0FBS1AsS0FBTCxDQUFXUSxJQUFYO0FBQ0QsT0FGRCxNQUdLO0FBQ0gsY0FBS1IsS0FBTCxDQUFXRCxJQUFYO0FBQ0EsY0FBS1UsS0FBTDtBQUNEO0FBZlc7QUFpQmI7O0FBRUQ7Ozs7QUFJQWpCLFdBQVVrQixLQUFWLEVBQWlCO0FBQ2YsU0FBS0EsS0FBTCxHQUFhLENBQUNBLEtBQUQsR0FBUyxFQUFULEdBQWNBLE1BQU1DLEdBQU4sQ0FBVUMsR0FBVixDQUFjQyxNQUFNO0FBQzdDLFlBQU1DLFlBQVlKLE1BQU1FLEdBQU4sQ0FBVUMsRUFBVixDQUFsQjtBQUNBLFVBQUlDLFVBQVVDLElBQVYsS0FBbUIsU0FBdkIsRUFBa0M7QUFDaEMsZUFBT0QsVUFBVUUsS0FBakI7QUFDRDtBQUNGLEtBTDBCLEVBS3hCQyxNQUx3QixDQUtqQkQsU0FBU0EsS0FMUSxDQUEzQjs7QUFPQSxTQUFLRSxNQUFMLENBQVksSUFBWjtBQUNEOztBQUVEOzs7OztBQUtBQyxpQkFBZ0J0QixJQUFoQixFQUFzQjtBQUNwQixVQUFNTyxVQUFVZ0IsU0FBU0MsYUFBVCxDQUF1QixJQUF2QixDQUFoQjtBQUNBakIsWUFBUWtCLFdBQVIsR0FBc0J6QixLQUFLQyxJQUEzQjtBQUNBLFdBQU9NLE9BQVA7QUFDRDs7QUFFRDs7OztBQUlBbUIsc0JBQXFCMUIsSUFBckIsRUFBMkI7QUFDekIyQixXQUFPLHFCQUFQLEVBQThCM0IsSUFBOUI7QUFDQSxTQUFLRyxLQUFMLENBQVdRLElBQVg7QUFDRDs7QUFFRDs7O0FBR0FpQix1QkFBc0I7QUFDcEJELFdBQU8sb0JBQVA7QUFDQSxTQUFLeEIsS0FBTCxDQUFXUSxJQUFYO0FBQ0Q7O0FBRUQ7OztBQUdBQyxVQUFTO0FBQ1BlLFdBQU8sSUFBUDtBQUNBLFNBQUtwQixPQUFMLENBQWFLLEtBQWI7QUFDRDs7QUFFRDs7Ozs7QUFLTVMsUUFBTixDQUFjUSxLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsYUFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBTyxlQUFLUixNQUFMLFFBQVA7QUFGbUI7QUFHcEI7O0FBRUQ7OztBQUdNUyxTQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixhQUFLM0IsS0FBTCxDQUFXMkIsT0FBWDtBQUNBLFlBQU0sZUFBS0EsT0FBTCxRQUFOO0FBRmU7QUFHaEI7O0FBRUQ7Ozs7QUFJQUMsV0FBVTtBQUNSLFdBQ0UsNkNBQWdCLElBQWhCLENBREY7QUFHRDtBQTdJdUIsQztrQkFnSlh2QyxtQiIsImZpbGUiOiJzZWxlY3QtbGlzdC1jb250YWluZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbi8vIGltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0LWxpc3QtY29tcG9uZW50JztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJ2F0b20tc2VsZWN0LWxpc3QnO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIFNlbGVjdExpc3RDb250YWluZXIge1xuXG4gIHN0YXRpYyBpbnN0YW5jZTtcblxuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBpZiAoU2VsZWN0TGlzdENvbnRhaW5lci5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIFNlbGVjdExpc3RDb250YWluZXIuaW5zdGFuY2U7XG4gICAgfVxuICAgIFNlbGVjdExpc3RDb250YWluZXIuaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgdGhpcy5zZXRJdGVtcygpO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBzZWxlY3RRdWVyeSAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBlbXB0eU1lc3NhZ2UgKCkge1xuICAgIHJldHVybiAnTm8gcHJvamVjdHMgZm91bmQgOignO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGZpbHRlcktleUZvckl0ZW0gKGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbS5uYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBzaG93ICgpIHtcbiAgICBpZiAoIXRoaXMucGFuZWwpIHtcbiAgICAgIHRoaXMucGFuZWwgPSBhd2FpdCBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHtcbiAgICAgICAgaXRlbTogdGhpcy5lbGVtZW50LFxuICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgYXV0b0ZvY3VzOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYW5lbC5pc1Zpc2libGUoKSkge1xuICAgICAgdGhpcy5wYW5lbC5oaWRlKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5wYW5lbC5zaG93KCk7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gaXRlbXMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2V0SXRlbXMgKGl0ZW1zKSB7XG4gICAgdGhpcy5pdGVtcyA9ICFpdGVtcyA/IFtdIDogaXRlbXMuaWRzLm1hcChpZCA9PiB7XG4gICAgICBjb25zdCBjYW5kaWRhdGUgPSBpdGVtcy5tYXBbaWRdO1xuICAgICAgaWYgKGNhbmRpZGF0ZS50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZS5tb2RlbDtcbiAgICAgIH1cbiAgICB9KS5maWx0ZXIobW9kZWwgPT4gbW9kZWwpO1xuXG4gICAgdGhpcy51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHsqfSBpdGVtIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gQW4gSFRNTEVsZW1lbnRcbiAgICovXG4gIGVsZW1lbnRGb3JJdGVtIChpdGVtKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGl0ZW0ubmFtZTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGl0ZW0gLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkQ29uZmlybVNlbGVjdGlvbiAoaXRlbSkge1xuICAgIGRldmxvZygnZGlkQ29uZmlybVNlbGVjdGlvbicsIGl0ZW0pO1xuICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBkaWRDYW5jZWxTZWxlY3Rpb24gKCkge1xuICAgIGRldmxvZygnZGlkQ2FuY2VsU2VsZWN0aW9uJyk7XG4gICAgdGhpcy5wYW5lbC5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGZvY3VzICgpIHtcbiAgICBkZXZsb2codGhpcyk7XG4gICAgdGhpcy5lbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnBhbmVsLmRlc3Ryb3koKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTZWxlY3RMaXN0IHsuLi50aGlzfSAvPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0TGlzdENvbnRhaW5lcjtcbiJdfQ==