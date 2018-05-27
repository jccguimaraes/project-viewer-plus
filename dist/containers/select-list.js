'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _atomSelectList = require('atom-select-list');

var _atomSelectList2 = _interopRequireDefault(_atomSelectList);

var _base = require('./../constants/base');

var _selectListItem = require('./../components/select-list-item');

var _selectListItem2 = _interopRequireDefault(_selectListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
class SelectListContainer {
  /**
   *
   */
  constructor() {
    this.emitter = new _atom.Emitter();

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
    return item.name;
  }

  /**
   *
   */
  async show() {
    if (!this.panel) {
      this.panel = await atom.workspace.addModalPanel({
        item: this.element,
        visible: false
      });
    }

    if (this.panel.isVisible()) {
      this.panel.hide();
    } else {
      this.panel.show();
      this.focus();
    }
  }

  /**
   *
   * @param {MapIterator} content - description
   */
  setItems(content = []) {
    this.items = [];

    content.forEach(value => {
      if (value.type !== 'project') {
        return;
      }
      this.items.push(value.model);
    });

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
   * @param {Object} props - description
   * @returns {Object} description
   */
  async update(props) {
    this.props = props;
    return _etch2.default.update(this);
  }

  /**
   * @public
   */
  async destroy() {
    this.panel.destroy();
    await _etch2.default.destroy(this);
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

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {Function} callback - description
   */
  onDidSelectItem(callback) {
    this.emitter.on('select-list-select-item', callback);
  }
}
exports.default = SelectListContainer; /** @jsx etch.dom */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL3NlbGVjdC1saXN0LmpzIl0sIm5hbWVzIjpbIlNlbGVjdExpc3RDb250YWluZXIiLCJjb25zdHJ1Y3RvciIsImVtaXR0ZXIiLCJFbWl0dGVyIiwic2V0SXRlbXMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInNlbGVjdFF1ZXJ5IiwiZW1wdHlNZXNzYWdlIiwiTUVTU0FHRVMiLCJDT05URVhUIiwiTk9fTUFUQ0hJTkdfUFJPSkVDVFMiLCJmaWx0ZXJLZXlGb3JJdGVtIiwiaXRlbSIsIm5hbWUiLCJzaG93IiwicGFuZWwiLCJhdG9tIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsImVsZW1lbnQiLCJ2aXNpYmxlIiwiaXNWaXNpYmxlIiwiaGlkZSIsImZvY3VzIiwiY29udGVudCIsIml0ZW1zIiwiZm9yRWFjaCIsInZhbHVlIiwidHlwZSIsInB1c2giLCJtb2RlbCIsInVwZGF0ZSIsImVsZW1lbnRGb3JJdGVtIiwiSXRlbSIsIlNlbGVjdExpc3RJdGVtIiwiZGlkQ29uZmlybVNlbGVjdGlvbiIsImVtaXQiLCJkaWRDYW5jZWxTZWxlY3Rpb24iLCJwcm9wcyIsImRlc3Ryb3kiLCJmaXJzdENoaWxkIiwicmVuZGVyIiwib25EaWRTZWxlY3RJdGVtIiwiY2FsbGJhY2siLCJvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsbUJBQU4sQ0FBMEI7QUFDdkM7OztBQUdBQyxnQkFBZTtBQUNiLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxhQUFKLEVBQWY7O0FBRUEsU0FBS0MsUUFBTDtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7O0FBSUEsTUFBSUMsV0FBSixHQUFtQjtBQUNqQixXQUFPLElBQVA7QUFDRDs7QUFFRDs7OztBQUlBLE1BQUlDLFlBQUosR0FBb0I7QUFDbEIsV0FBT0MsZUFBU0MsT0FBVCxDQUFpQkMsb0JBQXhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FDLG1CQUFrQkMsSUFBbEIsRUFBd0I7QUFDdEIsV0FBT0EsS0FBS0MsSUFBWjtBQUNEOztBQUVEOzs7QUFHQSxRQUFNQyxJQUFOLEdBQWM7QUFDWixRQUFJLENBQUMsS0FBS0MsS0FBVixFQUFpQjtBQUNmLFdBQUtBLEtBQUwsR0FBYSxNQUFNQyxLQUFLQyxTQUFMLENBQWVDLGFBQWYsQ0FBNkI7QUFDOUNOLGNBQU0sS0FBS08sT0FEbUM7QUFFOUNDLGlCQUFTO0FBRnFDLE9BQTdCLENBQW5CO0FBSUQ7O0FBRUQsUUFBSSxLQUFLTCxLQUFMLENBQVdNLFNBQVgsRUFBSixFQUE0QjtBQUMxQixXQUFLTixLQUFMLENBQVdPLElBQVg7QUFDRCxLQUZELE1BR0s7QUFDSCxXQUFLUCxLQUFMLENBQVdELElBQVg7QUFDQSxXQUFLUyxLQUFMO0FBQ0Q7QUFDRjs7QUFFRDs7OztBQUlBcEIsV0FBVXFCLFVBQVUsRUFBcEIsRUFBd0I7QUFDdEIsU0FBS0MsS0FBTCxHQUFhLEVBQWI7O0FBRUFELFlBQVFFLE9BQVIsQ0FBZ0JDLFNBQVM7QUFDdkIsVUFBSUEsTUFBTUMsSUFBTixLQUFlLFNBQW5CLEVBQThCO0FBQzVCO0FBQ0Q7QUFDRCxXQUFLSCxLQUFMLENBQVdJLElBQVgsQ0FBZ0JGLE1BQU1HLEtBQXRCO0FBQ0QsS0FMRDs7QUFPQSxTQUFLQyxNQUFMLENBQVksSUFBWjtBQUNEOztBQUVEOzs7OztBQUtBQyxpQkFBZ0JwQixJQUFoQixFQUFzQjtBQUNwQixVQUFNcUIsT0FBTyxJQUFJQyx3QkFBSixDQUFtQixFQUFFdEIsSUFBRixFQUFuQixDQUFiO0FBQ0EsV0FBT3FCLEtBQUtkLE9BQVo7QUFDRDs7QUFFRDs7OztBQUlBZ0Isc0JBQXFCdkIsSUFBckIsRUFBMkI7QUFDekIsU0FBS1gsT0FBTCxDQUFhbUMsSUFBYixDQUFrQix5QkFBbEIsRUFBNkN4QixJQUE3QztBQUNBLFNBQUtHLEtBQUwsQ0FBV08sSUFBWDtBQUNEOztBQUVEOzs7QUFHQWUsdUJBQXNCO0FBQ3BCLFNBQUt0QixLQUFMLENBQVdPLElBQVg7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNUyxNQUFOLENBQWNPLEtBQWQsRUFBcUI7QUFDbkIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsV0FBT2xDLGVBQUsyQixNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLFFBQU1RLE9BQU4sR0FBaUI7QUFDZixTQUFLeEIsS0FBTCxDQUFXd0IsT0FBWDtBQUNBLFVBQU1uQyxlQUFLbUMsT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEOzs7QUFHQWhCLFVBQVM7QUFDUDtBQUNBLFNBQUtKLE9BQUwsQ0FBYXFCLFVBQWIsQ0FBd0JqQixLQUF4QjtBQUNEOztBQUVEOzs7O0FBSUFrQixXQUFVO0FBQ1IsV0FBTyxtQkFBQyx3QkFBRCxFQUFnQixJQUFoQixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BQyxrQkFBaUJDLFFBQWpCLEVBQTJCO0FBQ3pCLFNBQUsxQyxPQUFMLENBQWEyQyxFQUFiLENBQWdCLHlCQUFoQixFQUEyQ0QsUUFBM0M7QUFDRDtBQTdJc0M7a0JBQXBCNUMsbUIsRUFYckIiLCJmaWxlIjoic2VsZWN0LWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJ2F0b20tc2VsZWN0LWxpc3QnO1xuaW1wb3J0IHsgTUVTU0FHRVMgfSBmcm9tICcuLy4uL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBTZWxlY3RMaXN0SXRlbSBmcm9tICcuLy4uL2NvbXBvbmVudHMvc2VsZWN0LWxpc3QtaXRlbSc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0TGlzdENvbnRhaW5lciB7XG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICB0aGlzLnNldEl0ZW1zKCk7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0IHNlbGVjdFF1ZXJ5ICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0IGVtcHR5TWVzc2FnZSAoKSB7XG4gICAgcmV0dXJuIE1FU1NBR0VTLkNPTlRFWFQuTk9fTUFUQ0hJTkdfUFJPSkVDVFM7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZmlsdGVyS2V5Rm9ySXRlbSAoaXRlbSkge1xuICAgIHJldHVybiBpdGVtLm5hbWU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIHNob3cgKCkge1xuICAgIGlmICghdGhpcy5wYW5lbCkge1xuICAgICAgdGhpcy5wYW5lbCA9IGF3YWl0IGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoe1xuICAgICAgICBpdGVtOiB0aGlzLmVsZW1lbnQsXG4gICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYW5lbC5pc1Zpc2libGUoKSkge1xuICAgICAgdGhpcy5wYW5lbC5oaWRlKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5wYW5lbC5zaG93KCk7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7TWFwSXRlcmF0b3J9IGNvbnRlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2V0SXRlbXMgKGNvbnRlbnQgPSBbXSkge1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcblxuICAgIGNvbnRlbnQuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICBpZiAodmFsdWUudHlwZSAhPT0gJ3Byb2plY3QnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXRlbXMucHVzaCh2YWx1ZS5tb2RlbCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGl0ZW0gLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBIVE1MRWxlbWVudFxuICAgKi9cbiAgZWxlbWVudEZvckl0ZW0gKGl0ZW0pIHtcbiAgICBjb25zdCBJdGVtID0gbmV3IFNlbGVjdExpc3RJdGVtKHsgaXRlbSB9KTtcbiAgICByZXR1cm4gSXRlbS5lbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gaXRlbSAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWRDb25maXJtU2VsZWN0aW9uIChpdGVtKSB7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3NlbGVjdC1saXN0LXNlbGVjdC1pdGVtJywgaXRlbSk7XG4gICAgdGhpcy5wYW5lbC5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGRpZENhbmNlbFNlbGVjdGlvbiAoKSB7XG4gICAgdGhpcy5wYW5lbC5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMucGFuZWwuZGVzdHJveSgpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgZm9jdXMgKCkge1xuICAgIC8vIFRPRE8gZmluZCBvdXQgd2h5IHRoaXMuZm9jdXMgZG9lc24ndCBleGlzdCBpZiB3ZSBkb24ndCBvdmVyaWRlIGl0XG4gICAgdGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gPFNlbGVjdExpc3Qgey4uLnRoaXN9IC8+O1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWRTZWxlY3RJdGVtIChjYWxsYmFjaykge1xuICAgIHRoaXMuZW1pdHRlci5vbignc2VsZWN0LWxpc3Qtc2VsZWN0LWl0ZW0nLCBjYWxsYmFjayk7XG4gIH1cbn1cbiJdfQ==