"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _atom = require("atom");

var _etch = _interopRequireDefault(require("etch"));

var _atomSelectList = _interopRequireDefault(require("atom-select-list"));

var _base = require("./../constants/base");

var _state = _interopRequireDefault(require("./../services/state"));

var _selectListItem = _interopRequireDefault(require("./../components/select-list-item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 *
 */
class SelectListContainer {
  /**
   *
   */
  constructor() {
    this.emitter = new _atom.Emitter();

    _state.default.onDidChangeState(() => {
      this.setItems(_state.default.getProjectsInGroup());
    });

    this.setItems();

    _etch.default.initialize(this);
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
    return _base.MESSAGES.CONTEXT.NO_MATCHING_PROJECTS;
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
          visible: false
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
   * @param {MapIterator} content - description
   */


  setItems(content) {
    this.items = [];

    if (!Array.isArray(content)) {
      return;
    }

    content.forEach(value => {
      if (!value.hasOwnProperty('paths')) {
        return;
      }

      this.items.push(value);
    });
    this.update(this);
  }
  /**
   *
   * @param {*} item - description
   * @returns {Object} An HTMLElement
   */


  elementForItem(item) {
    var Item = new _selectListItem.default({
      item
    });
    return Item.element;
  }
  /**
   *
   * @param {*} item - description
   */


  didConfirmSelection(item) {
    this.emitter.emit('select-list-select-item', item);
    this.panel.hide();
  }
  /**
   *
   */


  didCancelSelection() {
    this.panel.hide();
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  update(props) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.props = props;
      return _etch.default.update(_this2);
    })();
  }
  /**
   * @public
   */


  destroy() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (_this3.panel) {
        _this3.panel.destroy();
      }

      _this3.emitter.clear();

      _this3.emitter.dispose();

      yield _etch.default.destroy(_this3);
    })();
  }
  /**
   *
   */


  focus() {
    // TODO find out why this.focus doesn't exist if we don't overide it
    this.element.firstChild.focus();
  }
  /**
   *
   * @returns {Object} description
   */


  render() {
    return _etch.default.dom(_atomSelectList.default, this);
  }
  /**
   * @todo improve JSDoc
   * @param {Function} callback - description
   */


  onDidSelectItem(callback) {
    this.emitter.on('select-list-select-item', callback);
  }

}

exports.default = SelectListContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL3NlbGVjdC1saXN0LmpzIl0sIm5hbWVzIjpbIlNlbGVjdExpc3RDb250YWluZXIiLCJjb25zdHJ1Y3RvciIsImVtaXR0ZXIiLCJFbWl0dGVyIiwic3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwic2V0SXRlbXMiLCJnZXRQcm9qZWN0c0luR3JvdXAiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInNlbGVjdFF1ZXJ5IiwiZW1wdHlNZXNzYWdlIiwiTUVTU0FHRVMiLCJDT05URVhUIiwiTk9fTUFUQ0hJTkdfUFJPSkVDVFMiLCJmaWx0ZXJLZXlGb3JJdGVtIiwiaXRlbSIsIm5hbWUiLCJzaG93IiwicGFuZWwiLCJhdG9tIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsImVsZW1lbnQiLCJ2aXNpYmxlIiwiaXNWaXNpYmxlIiwiaGlkZSIsImZvY3VzIiwiY29udGVudCIsIml0ZW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsInZhbHVlIiwiaGFzT3duUHJvcGVydHkiLCJwdXNoIiwidXBkYXRlIiwiZWxlbWVudEZvckl0ZW0iLCJJdGVtIiwiU2VsZWN0TGlzdEl0ZW0iLCJkaWRDb25maXJtU2VsZWN0aW9uIiwiZW1pdCIsImRpZENhbmNlbFNlbGVjdGlvbiIsInByb3BzIiwiZGVzdHJveSIsImNsZWFyIiwiZGlzcG9zZSIsImZpcnN0Q2hpbGQiLCJyZW5kZXIiLCJvbkRpZFNlbGVjdEl0ZW0iLCJjYWxsYmFjayIsIm9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLG1CQUFOLENBQTBCO0FBQ3ZDOzs7QUFHQUMsRUFBQUEsV0FBVyxHQUFJO0FBQ2IsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjs7QUFDQUMsbUJBQU1DLGdCQUFOLENBQXVCLE1BQU07QUFDM0IsV0FBS0MsUUFBTCxDQUFjRixlQUFNRyxr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STtBQUNQO0FBQ0EsU0FBS0osT0FBTCxDQUFhd0IsVUFBYixDQUF3QnBCLEtBQXhCO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFxQixFQUFBQSxNQUFNLEdBQUk7QUFDUixXQUFPLGtCQUFDLHVCQUFELEVBQWdCLElBQWhCLENBQVA7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsZUFBZSxDQUFFQyxRQUFGLEVBQVk7QUFDekIsU0FBS2hELE9BQUwsQ0FBYWlELEVBQWIsQ0FBZ0IseUJBQWhCLEVBQTJDRCxRQUEzQztBQUNEOztBQXRKc0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJ2F0b20tc2VsZWN0LWxpc3QnO1xuXG5pbXBvcnQgeyBNRVNTQUdFUyB9IGZyb20gJy4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4vLi4vc2VydmljZXMvc3RhdGUnO1xuaW1wb3J0IFNlbGVjdExpc3RJdGVtIGZyb20gJy4vLi4vY29tcG9uZW50cy9zZWxlY3QtbGlzdC1pdGVtJztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RMaXN0Q29udGFpbmVyIHtcbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICBzdGF0ZS5vbkRpZENoYW5nZVN0YXRlKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0SXRlbXMoc3RhdGUuZ2V0UHJvamVjdHNJbkdyb3VwKCkpO1xuICAgIH0pO1xuICAgIHRoaXMuc2V0SXRlbXMoKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBzZWxlY3RRdWVyeSAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBlbXB0eU1lc3NhZ2UgKCkge1xuICAgIHJldHVybiBNRVNTQUdFUy5DT05URVhULk5PX01BVENISU5HX1BST0pFQ1RTO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGZpbHRlcktleUZvckl0ZW0gKGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbS5uYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBzaG93ICgpIHtcbiAgICBpZiAoIXRoaXMucGFuZWwpIHtcbiAgICAgIHRoaXMucGFuZWwgPSBhd2FpdCBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHtcbiAgICAgICAgaXRlbTogdGhpcy5lbGVtZW50LFxuICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFuZWwuaXNWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWwuc2hvdygpO1xuICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge01hcEl0ZXJhdG9yfSBjb250ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNldEl0ZW1zIChjb250ZW50KSB7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbnRlbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29udGVudC5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIGlmICghdmFsdWUuaGFzT3duUHJvcGVydHkoJ3BhdGhzJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5pdGVtcy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gaXRlbSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEFuIEhUTUxFbGVtZW50XG4gICAqL1xuICBlbGVtZW50Rm9ySXRlbSAoaXRlbSkge1xuICAgIGNvbnN0IEl0ZW0gPSBuZXcgU2VsZWN0TGlzdEl0ZW0oeyBpdGVtIH0pO1xuICAgIHJldHVybiBJdGVtLmVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHsqfSBpdGVtIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZENvbmZpcm1TZWxlY3Rpb24gKGl0ZW0pIHtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnc2VsZWN0LWxpc3Qtc2VsZWN0LWl0ZW0nLCBpdGVtKTtcbiAgICB0aGlzLnBhbmVsLmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgZGlkQ2FuY2VsU2VsZWN0aW9uICgpIHtcbiAgICB0aGlzLnBhbmVsLmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHVibGljXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBpZiAodGhpcy5wYW5lbCkge1xuICAgICAgdGhpcy5wYW5lbC5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuZW1pdHRlci5jbGVhcigpO1xuICAgIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBmb2N1cyAoKSB7XG4gICAgLy8gVE9ETyBmaW5kIG91dCB3aHkgdGhpcy5mb2N1cyBkb2Vzbid0IGV4aXN0IGlmIHdlIGRvbid0IG92ZXJpZGUgaXRcbiAgICB0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZC5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiA8U2VsZWN0TGlzdCB7Li4udGhpc30gLz47XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBvbkRpZFNlbGVjdEl0ZW0gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5lbWl0dGVyLm9uKCdzZWxlY3QtbGlzdC1zZWxlY3QtaXRlbScsIGNhbGxiYWNrKTtcbiAgfVxufVxuIl19