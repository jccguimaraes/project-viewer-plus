'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _atomSelectList = require('atom-select-list');

var _atomSelectList2 = _interopRequireDefault(_atomSelectList);

var _devlog = require('./../services/devlog');

var _devlog2 = _interopRequireDefault(_devlog);

var _base = require('./../constants/base');

var _contextSwitcher = require('./../services/context-switcher');

var _contextSwitcher2 = _interopRequireDefault(_contextSwitcher);

var _selectListItem = require('./../components/select-list-item');

var _selectListItem2 = _interopRequireDefault(_selectListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

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

    this.contextSwitcher = new _contextSwitcher2.default();
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
    return _base.MESSAGES.CONTEXT.NO_MATCHING_PROJECTS;
  }

  /**
   *
   * @param {string} item - description
   * @returns {string} description
   */
  filterKeyForItem(item) {
    return item.model.name;
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
   * @param {Array} items - description
   */
  setItems(items) {
    this.items = !items ? [] : items.ids.map(id => {
      const candidate = items.map[id];
      if (candidate.type === 'project' && candidate.model.paths.length) {
        return candidate;
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
    const Item = new _selectListItem2.default({ item });
    return Item.element;
  }

  /**
   *
   * @param {*} item - description
   */
  didConfirmSelection(item) {
    (0, _devlog2.default)('didConfirmSelection', item);
    this.contextSwitcher.switchContext(item);
    this.panel.hide();
  }

  /**
   *
   */
  didCancelSelection() {
    (0, _devlog2.default)('didCancelSelection');
    this.panel.hide();
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
   * @public
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
    return _etch2.default.dom(_atomSelectList2.default, this);
  }
};
exports.default = SelectListContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL3NlbGVjdC1saXN0LmpzIl0sIm5hbWVzIjpbIlNlbGVjdExpc3RDb250YWluZXIiLCJjb25zdHJ1Y3RvciIsImluc3RhbmNlIiwiY29udGV4dFN3aXRjaGVyIiwiQ29udGV4dFN3aXRjaGVyIiwic2V0SXRlbXMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInNlbGVjdFF1ZXJ5IiwiZW1wdHlNZXNzYWdlIiwiTUVTU0FHRVMiLCJDT05URVhUIiwiTk9fTUFUQ0hJTkdfUFJPSkVDVFMiLCJmaWx0ZXJLZXlGb3JJdGVtIiwiaXRlbSIsIm1vZGVsIiwibmFtZSIsInNob3ciLCJwYW5lbCIsImF0b20iLCJ3b3Jrc3BhY2UiLCJhZGRNb2RhbFBhbmVsIiwiZWxlbWVudCIsInZpc2libGUiLCJpc1Zpc2libGUiLCJoaWRlIiwiZm9jdXMiLCJpdGVtcyIsImlkcyIsIm1hcCIsImlkIiwiY2FuZGlkYXRlIiwidHlwZSIsInBhdGhzIiwibGVuZ3RoIiwiZmlsdGVyIiwidXBkYXRlIiwiZWxlbWVudEZvckl0ZW0iLCJJdGVtIiwiU2VsZWN0TGlzdEl0ZW0iLCJkaWRDb25maXJtU2VsZWN0aW9uIiwic3dpdGNoQ29udGV4dCIsImRpZENhbmNlbFNlbGVjdGlvbiIsInByb3BzIiwiZGVzdHJveSIsImZpcnN0Q2hpbGQiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FQQTs7QUFTQTs7O0lBR01BLG1CLEdBQU4sTUFBTUEsbUJBQU4sQ0FBMEI7O0FBR3hCOzs7QUFHQUMsZ0JBQWU7QUFDYixRQUFJRCxvQkFBb0JFLFFBQXhCLEVBQWtDO0FBQ2hDLGFBQU9GLG9CQUFvQkUsUUFBM0I7QUFDRDtBQUNERix3QkFBb0JFLFFBQXBCLEdBQStCLElBQS9COztBQUVBLFNBQUtDLGVBQUwsR0FBdUIsSUFBSUMseUJBQUosRUFBdkI7QUFDQSxTQUFLQyxRQUFMO0FBQ0FDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxNQUFJQyxXQUFKLEdBQW1CO0FBQ2pCLFdBQU8sSUFBUDtBQUNEOztBQUVEOzs7O0FBSUEsTUFBSUMsWUFBSixHQUFvQjtBQUNsQixXQUFPQyxlQUFTQyxPQUFULENBQWlCQyxvQkFBeEI7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsbUJBQWtCQyxJQUFsQixFQUF3QjtBQUN0QixXQUFPQSxLQUFLQyxLQUFMLENBQVdDLElBQWxCO0FBQ0Q7O0FBRUQ7OztBQUdNQyxNQUFOLEdBQWM7QUFBQTs7QUFBQTtBQUNaLFVBQUksQ0FBQyxNQUFLQyxLQUFWLEVBQWlCO0FBQ2YsY0FBS0EsS0FBTCxHQUFhLE1BQU1DLEtBQUtDLFNBQUwsQ0FBZUMsYUFBZixDQUE2QjtBQUM5Q1AsZ0JBQU0sTUFBS1EsT0FEbUM7QUFFOUNDLG1CQUFTO0FBRnFDLFNBQTdCLENBQW5CO0FBSUQ7O0FBRUQsVUFBSSxNQUFLTCxLQUFMLENBQVdNLFNBQVgsRUFBSixFQUE0QjtBQUMxQixjQUFLTixLQUFMLENBQVdPLElBQVg7QUFDRCxPQUZELE1BR0s7QUFDSCxjQUFLUCxLQUFMLENBQVdELElBQVg7QUFDQSxjQUFLUyxLQUFMO0FBQ0Q7QUFkVztBQWViOztBQUVEOzs7O0FBSUFyQixXQUFVc0IsS0FBVixFQUFpQjtBQUNmLFNBQUtBLEtBQUwsR0FBYSxDQUFDQSxLQUFELEdBQ1QsRUFEUyxHQUVUQSxNQUFNQyxHQUFOLENBQ0NDLEdBREQsQ0FDS0MsTUFBTTtBQUNULFlBQU1DLFlBQVlKLE1BQU1FLEdBQU4sQ0FBVUMsRUFBVixDQUFsQjtBQUNBLFVBQUlDLFVBQVVDLElBQVYsS0FBbUIsU0FBbkIsSUFBZ0NELFVBQVVoQixLQUFWLENBQWdCa0IsS0FBaEIsQ0FBc0JDLE1BQTFELEVBQWtFO0FBQ2hFLGVBQU9ILFNBQVA7QUFDRDtBQUNGLEtBTkQsRUFPQ0ksTUFQRCxDQU9RcEIsU0FBU0EsS0FQakIsQ0FGSjs7QUFXQSxTQUFLcUIsTUFBTCxDQUFZLElBQVo7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsaUJBQWdCdkIsSUFBaEIsRUFBc0I7QUFDcEIsVUFBTXdCLE9BQU8sSUFBSUMsd0JBQUosQ0FBbUIsRUFBRXpCLElBQUYsRUFBbkIsQ0FBYjtBQUNBLFdBQU93QixLQUFLaEIsT0FBWjtBQUNEOztBQUVEOzs7O0FBSUFrQixzQkFBcUIxQixJQUFyQixFQUEyQjtBQUN6QiwwQkFBTyxxQkFBUCxFQUE4QkEsSUFBOUI7QUFDQSxTQUFLWCxlQUFMLENBQXFCc0MsYUFBckIsQ0FBbUMzQixJQUFuQztBQUNBLFNBQUtJLEtBQUwsQ0FBV08sSUFBWDtBQUNEOztBQUVEOzs7QUFHQWlCLHVCQUFzQjtBQUNwQiwwQkFBTyxvQkFBUDtBQUNBLFNBQUt4QixLQUFMLENBQVdPLElBQVg7QUFDRDs7QUFFRDs7Ozs7QUFLTVcsUUFBTixDQUFjTyxLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsYUFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBT3JDLGVBQUs4QixNQUFMLENBQVksTUFBWixDQUFQO0FBRm1CO0FBR3BCOztBQUVEOzs7QUFHTVEsU0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsYUFBSzFCLEtBQUwsQ0FBVzBCLE9BQVg7QUFDQSxZQUFNdEMsZUFBS3NDLE9BQUwsQ0FBYSxNQUFiLENBQU47QUFGZTtBQUdoQjs7QUFFRDs7O0FBR0FsQixVQUFTO0FBQ1A7QUFDQSxTQUFLSixPQUFMLENBQWF1QixVQUFiLENBQXdCbkIsS0FBeEI7QUFDRDs7QUFFRDs7OztBQUlBb0IsV0FBVTtBQUNSLFdBQU8sbUJBQUMsd0JBQUQsRUFBZ0IsSUFBaEIsQ0FBUDtBQUNEO0FBN0l1QixDO2tCQWdKWDlDLG1CIiwiZmlsZSI6InNlbGVjdC1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICdhdG9tLXNlbGVjdC1saXN0JztcbmltcG9ydCBkZXZsb2cgZnJvbSAnLi8uLi9zZXJ2aWNlcy9kZXZsb2cnO1xuaW1wb3J0IHsgTUVTU0FHRVMgfSBmcm9tICcuLy4uL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBDb250ZXh0U3dpdGNoZXIgZnJvbSAnLi8uLi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyJztcbmltcG9ydCBTZWxlY3RMaXN0SXRlbSBmcm9tICcuLy4uL2NvbXBvbmVudHMvc2VsZWN0LWxpc3QtaXRlbSc7XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgU2VsZWN0TGlzdENvbnRhaW5lciB7XG4gIHN0YXRpYyBpbnN0YW5jZTtcblxuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBpZiAoU2VsZWN0TGlzdENvbnRhaW5lci5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIFNlbGVjdExpc3RDb250YWluZXIuaW5zdGFuY2U7XG4gICAgfVxuICAgIFNlbGVjdExpc3RDb250YWluZXIuaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgdGhpcy5jb250ZXh0U3dpdGNoZXIgPSBuZXcgQ29udGV4dFN3aXRjaGVyKCk7XG4gICAgdGhpcy5zZXRJdGVtcygpO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBzZWxlY3RRdWVyeSAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBlbXB0eU1lc3NhZ2UgKCkge1xuICAgIHJldHVybiBNRVNTQUdFUy5DT05URVhULk5PX01BVENISU5HX1BST0pFQ1RTO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGZpbHRlcktleUZvckl0ZW0gKGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbS5tb2RlbC5uYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBzaG93ICgpIHtcbiAgICBpZiAoIXRoaXMucGFuZWwpIHtcbiAgICAgIHRoaXMucGFuZWwgPSBhd2FpdCBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHtcbiAgICAgICAgaXRlbTogdGhpcy5lbGVtZW50LFxuICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFuZWwuaXNWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWwuc2hvdygpO1xuICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBpdGVtcyAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBzZXRJdGVtcyAoaXRlbXMpIHtcbiAgICB0aGlzLml0ZW1zID0gIWl0ZW1zXG4gICAgICA/IFtdXG4gICAgICA6IGl0ZW1zLmlkc1xuICAgICAgICAubWFwKGlkID0+IHtcbiAgICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSBpdGVtcy5tYXBbaWRdO1xuICAgICAgICAgIGlmIChjYW5kaWRhdGUudHlwZSA9PT0gJ3Byb2plY3QnICYmIGNhbmRpZGF0ZS5tb2RlbC5wYXRocy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBjYW5kaWRhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKG1vZGVsID0+IG1vZGVsKTtcblxuICAgIHRoaXMudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gaXRlbSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEFuIEhUTUxFbGVtZW50XG4gICAqL1xuICBlbGVtZW50Rm9ySXRlbSAoaXRlbSkge1xuICAgIGNvbnN0IEl0ZW0gPSBuZXcgU2VsZWN0TGlzdEl0ZW0oeyBpdGVtIH0pO1xuICAgIHJldHVybiBJdGVtLmVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHsqfSBpdGVtIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZENvbmZpcm1TZWxlY3Rpb24gKGl0ZW0pIHtcbiAgICBkZXZsb2coJ2RpZENvbmZpcm1TZWxlY3Rpb24nLCBpdGVtKTtcbiAgICB0aGlzLmNvbnRleHRTd2l0Y2hlci5zd2l0Y2hDb250ZXh0KGl0ZW0pO1xuICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBkaWRDYW5jZWxTZWxlY3Rpb24gKCkge1xuICAgIGRldmxvZygnZGlkQ2FuY2VsU2VsZWN0aW9uJyk7XG4gICAgdGhpcy5wYW5lbC5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMucGFuZWwuZGVzdHJveSgpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgZm9jdXMgKCkge1xuICAgIC8vIFRPRE8gZmluZCBvdXQgd2h5IHRoaXMuZm9jdXMgZG9lc24ndCBleGlzdCBpZiB3ZSBkb24ndCBvdmVyaWRlIGl0XG4gICAgdGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gPFNlbGVjdExpc3Qgey4uLnRoaXN9IC8+O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdExpc3RDb250YWluZXI7XG4iXX0=