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
    console.log('didConfirmSelection', item);
    this.panel.hide();
  }

  /**
   *
   */
  didCancelSelection() {
    console.log('didCancelSelection');
    this.panel.hide();
  }

  /**
   *
   */
  focus() {
    console.log(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL3NlbGVjdC1saXN0LWNvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJTZWxlY3RMaXN0Q29udGFpbmVyIiwiY29uc3RydWN0b3IiLCJpbnN0YW5jZSIsInNldEl0ZW1zIiwiaW5pdGlhbGl6ZSIsInNlbGVjdFF1ZXJ5IiwiZW1wdHlNZXNzYWdlIiwiZmlsdGVyS2V5Rm9ySXRlbSIsIml0ZW0iLCJuYW1lIiwic2hvdyIsInBhbmVsIiwiYXRvbSIsIndvcmtzcGFjZSIsImFkZE1vZGFsUGFuZWwiLCJlbGVtZW50IiwidmlzaWJsZSIsImF1dG9Gb2N1cyIsImlzVmlzaWJsZSIsImhpZGUiLCJmb2N1cyIsIml0ZW1zIiwiaWRzIiwibWFwIiwiaWQiLCJjYW5kaWRhdGUiLCJ0eXBlIiwibW9kZWwiLCJmaWx0ZXIiLCJ1cGRhdGUiLCJlbGVtZW50Rm9ySXRlbSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwiZGlkQ29uZmlybVNlbGVjdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJkaWRDYW5jZWxTZWxlY3Rpb24iLCJwcm9wcyIsImRlc3Ryb3kiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7MmNBSkE7O0FBR0E7OztBQUdBOzs7SUFHTUEsbUIsR0FBTixNQUFNQSxtQkFBTixDQUEwQjs7QUFJeEI7OztBQUdBQyxnQkFBZTtBQUNiLFFBQUlELG9CQUFvQkUsUUFBeEIsRUFBa0M7QUFDaEMsYUFBT0Ysb0JBQW9CRSxRQUEzQjtBQUNEO0FBQ0RGLHdCQUFvQkUsUUFBcEIsR0FBK0IsSUFBL0I7O0FBRUEsU0FBS0MsUUFBTDtBQUNBLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxNQUFJQyxXQUFKLEdBQW1CO0FBQ2pCLFdBQU8sSUFBUDtBQUNEOztBQUVEOzs7O0FBSUEsTUFBSUMsWUFBSixHQUFvQjtBQUNsQixXQUFPLHNCQUFQO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FDLG1CQUFrQkMsSUFBbEIsRUFBd0I7QUFDdEIsV0FBT0EsS0FBS0MsSUFBWjtBQUNEOztBQUVEOzs7QUFHTUMsTUFBTixHQUFjO0FBQUE7O0FBQUE7QUFDWixVQUFJLENBQUMsTUFBS0MsS0FBVixFQUFpQjtBQUNmLGNBQUtBLEtBQUwsR0FBYSxNQUFNQyxLQUFLQyxTQUFMLENBQWVDLGFBQWYsQ0FBNkI7QUFDOUNOLGdCQUFNLE1BQUtPLE9BRG1DO0FBRTlDQyxtQkFBUyxLQUZxQztBQUc5Q0MscUJBQVc7QUFIbUMsU0FBN0IsQ0FBbkI7QUFLRDs7QUFFRCxVQUFJLE1BQUtOLEtBQUwsQ0FBV08sU0FBWCxFQUFKLEVBQTRCO0FBQzFCLGNBQUtQLEtBQUwsQ0FBV1EsSUFBWDtBQUNELE9BRkQsTUFHSztBQUNILGNBQUtSLEtBQUwsQ0FBV0QsSUFBWDtBQUNBLGNBQUtVLEtBQUw7QUFDRDtBQWZXO0FBaUJiOztBQUVEOzs7O0FBSUFqQixXQUFVa0IsS0FBVixFQUFpQjtBQUNmLFNBQUtBLEtBQUwsR0FBYSxDQUFDQSxLQUFELEdBQVMsRUFBVCxHQUFjQSxNQUFNQyxHQUFOLENBQVVDLEdBQVYsQ0FBY0MsTUFBTTtBQUM3QyxZQUFNQyxZQUFZSixNQUFNRSxHQUFOLENBQVVDLEVBQVYsQ0FBbEI7QUFDQSxVQUFJQyxVQUFVQyxJQUFWLEtBQW1CLFNBQXZCLEVBQWtDO0FBQ2hDLGVBQU9ELFVBQVVFLEtBQWpCO0FBQ0Q7QUFDRixLQUwwQixFQUt4QkMsTUFMd0IsQ0FLakJELFNBQVNBLEtBTFEsQ0FBM0I7O0FBT0EsU0FBS0UsTUFBTCxDQUFZLElBQVo7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsaUJBQWdCdEIsSUFBaEIsRUFBc0I7QUFDcEIsVUFBTU8sVUFBVWdCLFNBQVNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBaEI7QUFDQWpCLFlBQVFrQixXQUFSLEdBQXNCekIsS0FBS0MsSUFBM0I7QUFDQSxXQUFPTSxPQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQW1CLHNCQUFxQjFCLElBQXJCLEVBQTJCO0FBQ3pCMkIsWUFBUUMsR0FBUixDQUFZLHFCQUFaLEVBQW1DNUIsSUFBbkM7QUFDQSxTQUFLRyxLQUFMLENBQVdRLElBQVg7QUFDRDs7QUFFRDs7O0FBR0FrQix1QkFBc0I7QUFDcEJGLFlBQVFDLEdBQVIsQ0FBWSxvQkFBWjtBQUNBLFNBQUt6QixLQUFMLENBQVdRLElBQVg7QUFDRDs7QUFFRDs7O0FBR0FDLFVBQVM7QUFDUGUsWUFBUUMsR0FBUixDQUFZLElBQVo7QUFDQSxTQUFLckIsT0FBTCxDQUFhSyxLQUFiO0FBQ0Q7O0FBRUQ7Ozs7O0FBS01TLFFBQU4sQ0FBY1MsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLGFBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU8sZUFBS1QsTUFBTCxRQUFQO0FBRm1CO0FBR3BCOztBQUVEOzs7QUFHTVUsU0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsYUFBSzVCLEtBQUwsQ0FBVzRCLE9BQVg7QUFDQSxZQUFNLGVBQUtBLE9BQUwsUUFBTjtBQUZlO0FBR2hCOztBQUVEOzs7O0FBSUFDLFdBQVU7QUFDUixXQUNFLDZDQUFnQixJQUFoQixDQURGO0FBR0Q7QUE3SXVCLEM7a0JBZ0pYeEMsbUIiLCJmaWxlIjoic2VsZWN0LWxpc3QtY29udGFpbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG4vLyBpbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdC1saXN0LWNvbXBvbmVudCc7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICdhdG9tLXNlbGVjdC1saXN0JztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBTZWxlY3RMaXN0Q29udGFpbmVyIHtcblxuICBzdGF0aWMgaW5zdGFuY2U7XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgaWYgKFNlbGVjdExpc3RDb250YWluZXIuaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBTZWxlY3RMaXN0Q29udGFpbmVyLmluc3RhbmNlO1xuICAgIH1cbiAgICBTZWxlY3RMaXN0Q29udGFpbmVyLmluc3RhbmNlID0gdGhpcztcblxuICAgIHRoaXMuc2V0SXRlbXMoKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXQgc2VsZWN0UXVlcnkgKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXQgZW1wdHlNZXNzYWdlICgpIHtcbiAgICByZXR1cm4gJ05vIHByb2plY3RzIGZvdW5kIDooJztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBmaWx0ZXJLZXlGb3JJdGVtIChpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgc2hvdyAoKSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsKSB7XG4gICAgICB0aGlzLnBhbmVsID0gYXdhaXQgYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7XG4gICAgICAgIGl0ZW06IHRoaXMuZWxlbWVudCxcbiAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgIGF1dG9Gb2N1czogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFuZWwuaXNWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWwuc2hvdygpO1xuICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNldEl0ZW1zIChpdGVtcykge1xuICAgIHRoaXMuaXRlbXMgPSAhaXRlbXMgPyBbXSA6IGl0ZW1zLmlkcy5tYXAoaWQgPT4ge1xuICAgICAgY29uc3QgY2FuZGlkYXRlID0gaXRlbXMubWFwW2lkXTtcbiAgICAgIGlmIChjYW5kaWRhdGUudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUubW9kZWw7XG4gICAgICB9XG4gICAgfSkuZmlsdGVyKG1vZGVsID0+IG1vZGVsKTtcblxuICAgIHRoaXMudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gaXRlbSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEFuIEhUTUxFbGVtZW50XG4gICAqL1xuICBlbGVtZW50Rm9ySXRlbSAoaXRlbSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBpdGVtLm5hbWU7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHsqfSBpdGVtIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZENvbmZpcm1TZWxlY3Rpb24gKGl0ZW0pIHtcbiAgICBjb25zb2xlLmxvZygnZGlkQ29uZmlybVNlbGVjdGlvbicsIGl0ZW0pO1xuICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBkaWRDYW5jZWxTZWxlY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKCdkaWRDYW5jZWxTZWxlY3Rpb24nKTtcbiAgICB0aGlzLnBhbmVsLmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgZm9jdXMgKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgIHRoaXMuZWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5wYW5lbC5kZXN0cm95KCk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8U2VsZWN0TGlzdCB7Li4udGhpc30gLz5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdExpc3RDb250YWluZXI7XG4iXX0=