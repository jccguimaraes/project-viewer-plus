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
    this.emitter.clear();
    this.emitter.dispose();
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
   * @todo improve JSDoc
   * @param {Function} callback - description
   */
  onDidSelectItem(callback) {
    this.emitter.on('select-list-select-item', callback);
  }
}
exports.default = SelectListContainer; /** @jsx etch.dom */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL3NlbGVjdC1saXN0LmpzIl0sIm5hbWVzIjpbIlNlbGVjdExpc3RDb250YWluZXIiLCJjb25zdHJ1Y3RvciIsImVtaXR0ZXIiLCJFbWl0dGVyIiwic2V0SXRlbXMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInNlbGVjdFF1ZXJ5IiwiZW1wdHlNZXNzYWdlIiwiTUVTU0FHRVMiLCJDT05URVhUIiwiTk9fTUFUQ0hJTkdfUFJPSkVDVFMiLCJmaWx0ZXJLZXlGb3JJdGVtIiwiaXRlbSIsIm5hbWUiLCJzaG93IiwicGFuZWwiLCJhdG9tIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsImVsZW1lbnQiLCJ2aXNpYmxlIiwiaXNWaXNpYmxlIiwiaGlkZSIsImZvY3VzIiwiY29udGVudCIsIml0ZW1zIiwiZm9yRWFjaCIsInZhbHVlIiwidHlwZSIsInB1c2giLCJtb2RlbCIsInVwZGF0ZSIsImVsZW1lbnRGb3JJdGVtIiwiSXRlbSIsIlNlbGVjdExpc3RJdGVtIiwiZGlkQ29uZmlybVNlbGVjdGlvbiIsImVtaXQiLCJkaWRDYW5jZWxTZWxlY3Rpb24iLCJwcm9wcyIsImRlc3Ryb3kiLCJjbGVhciIsImRpc3Bvc2UiLCJmaXJzdENoaWxkIiwicmVuZGVyIiwib25EaWRTZWxlY3RJdGVtIiwiY2FsbGJhY2siLCJvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsbUJBQU4sQ0FBMEI7QUFDdkM7OztBQUdBQyxnQkFBZTtBQUNiLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxhQUFKLEVBQWY7O0FBRUEsU0FBS0MsUUFBTDtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7O0FBSUEsTUFBSUMsV0FBSixHQUFtQjtBQUNqQixXQUFPLElBQVA7QUFDRDs7QUFFRDs7OztBQUlBLE1BQUlDLFlBQUosR0FBb0I7QUFDbEIsV0FBT0MsZUFBU0MsT0FBVCxDQUFpQkMsb0JBQXhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FDLG1CQUFrQkMsSUFBbEIsRUFBd0I7QUFDdEIsV0FBT0EsS0FBS0MsSUFBWjtBQUNEOztBQUVEOzs7QUFHQSxRQUFNQyxJQUFOLEdBQWM7QUFDWixRQUFJLENBQUMsS0FBS0MsS0FBVixFQUFpQjtBQUNmLFdBQUtBLEtBQUwsR0FBYSxNQUFNQyxLQUFLQyxTQUFMLENBQWVDLGFBQWYsQ0FBNkI7QUFDOUNOLGNBQU0sS0FBS08sT0FEbUM7QUFFOUNDLGlCQUFTO0FBRnFDLE9BQTdCLENBQW5CO0FBSUQ7O0FBRUQsUUFBSSxLQUFLTCxLQUFMLENBQVdNLFNBQVgsRUFBSixFQUE0QjtBQUMxQixXQUFLTixLQUFMLENBQVdPLElBQVg7QUFDRCxLQUZELE1BR0s7QUFDSCxXQUFLUCxLQUFMLENBQVdELElBQVg7QUFDQSxXQUFLUyxLQUFMO0FBQ0Q7QUFDRjs7QUFFRDs7OztBQUlBcEIsV0FBVXFCLFVBQVUsRUFBcEIsRUFBd0I7QUFDdEIsU0FBS0MsS0FBTCxHQUFhLEVBQWI7O0FBRUFELFlBQVFFLE9BQVIsQ0FBZ0JDLFNBQVM7QUFDdkIsVUFBSUEsTUFBTUMsSUFBTixLQUFlLFNBQW5CLEVBQThCO0FBQzVCO0FBQ0Q7QUFDRCxXQUFLSCxLQUFMLENBQVdJLElBQVgsQ0FBZ0JGLE1BQU1HLEtBQXRCO0FBQ0QsS0FMRDs7QUFPQSxTQUFLQyxNQUFMLENBQVksSUFBWjtBQUNEOztBQUVEOzs7OztBQUtBQyxpQkFBZ0JwQixJQUFoQixFQUFzQjtBQUNwQixVQUFNcUIsT0FBTyxJQUFJQyx3QkFBSixDQUFtQixFQUFFdEIsSUFBRixFQUFuQixDQUFiO0FBQ0EsV0FBT3FCLEtBQUtkLE9BQVo7QUFDRDs7QUFFRDs7OztBQUlBZ0Isc0JBQXFCdkIsSUFBckIsRUFBMkI7QUFDekIsU0FBS1gsT0FBTCxDQUFhbUMsSUFBYixDQUFrQix5QkFBbEIsRUFBNkN4QixJQUE3QztBQUNBLFNBQUtHLEtBQUwsQ0FBV08sSUFBWDtBQUNEOztBQUVEOzs7QUFHQWUsdUJBQXNCO0FBQ3BCLFNBQUt0QixLQUFMLENBQVdPLElBQVg7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNUyxNQUFOLENBQWNPLEtBQWQsRUFBcUI7QUFDbkIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsV0FBT2xDLGVBQUsyQixNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLFFBQU1RLE9BQU4sR0FBaUI7QUFDZixTQUFLeEIsS0FBTCxDQUFXd0IsT0FBWDtBQUNBLFNBQUt0QyxPQUFMLENBQWF1QyxLQUFiO0FBQ0EsU0FBS3ZDLE9BQUwsQ0FBYXdDLE9BQWI7QUFDQSxVQUFNckMsZUFBS21DLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDs7O0FBR0FoQixVQUFTO0FBQ1A7QUFDQSxTQUFLSixPQUFMLENBQWF1QixVQUFiLENBQXdCbkIsS0FBeEI7QUFDRDs7QUFFRDs7OztBQUlBb0IsV0FBVTtBQUNSLFdBQU8sbUJBQUMsd0JBQUQsRUFBZ0IsSUFBaEIsQ0FBUDtBQUNEOztBQUVEOzs7O0FBSUFDLGtCQUFpQkMsUUFBakIsRUFBMkI7QUFDekIsU0FBSzVDLE9BQUwsQ0FBYTZDLEVBQWIsQ0FBZ0IseUJBQWhCLEVBQTJDRCxRQUEzQztBQUNEO0FBN0lzQztrQkFBcEI5QyxtQixFQVhyQiIsImZpbGUiOiJzZWxlY3QtbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnYXRvbS1zZWxlY3QtbGlzdCc7XG5pbXBvcnQgeyBNRVNTQUdFUyB9IGZyb20gJy4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IFNlbGVjdExpc3RJdGVtIGZyb20gJy4vLi4vY29tcG9uZW50cy9zZWxlY3QtbGlzdC1pdGVtJztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RMaXN0Q29udGFpbmVyIHtcbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIHRoaXMuc2V0SXRlbXMoKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXQgc2VsZWN0UXVlcnkgKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXQgZW1wdHlNZXNzYWdlICgpIHtcbiAgICByZXR1cm4gTUVTU0FHRVMuQ09OVEVYVC5OT19NQVRDSElOR19QUk9KRUNUUztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBmaWx0ZXJLZXlGb3JJdGVtIChpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgc2hvdyAoKSB7XG4gICAgaWYgKCF0aGlzLnBhbmVsKSB7XG4gICAgICB0aGlzLnBhbmVsID0gYXdhaXQgYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7XG4gICAgICAgIGl0ZW06IHRoaXMuZWxlbWVudCxcbiAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhbmVsLmlzVmlzaWJsZSgpKSB7XG4gICAgICB0aGlzLnBhbmVsLmhpZGUoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnBhbmVsLnNob3coKTtcbiAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtNYXBJdGVyYXRvcn0gY29udGVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBzZXRJdGVtcyAoY29udGVudCA9IFtdKSB7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuXG4gICAgY29udGVudC5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIGlmICh2YWx1ZS50eXBlICE9PSAncHJvamVjdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5pdGVtcy5wdXNoKHZhbHVlLm1vZGVsKTtcbiAgICB9KTtcblxuICAgIHRoaXMudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gaXRlbSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEFuIEhUTUxFbGVtZW50XG4gICAqL1xuICBlbGVtZW50Rm9ySXRlbSAoaXRlbSkge1xuICAgIGNvbnN0IEl0ZW0gPSBuZXcgU2VsZWN0TGlzdEl0ZW0oeyBpdGVtIH0pO1xuICAgIHJldHVybiBJdGVtLmVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHsqfSBpdGVtIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZENvbmZpcm1TZWxlY3Rpb24gKGl0ZW0pIHtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnc2VsZWN0LWxpc3Qtc2VsZWN0LWl0ZW0nLCBpdGVtKTtcbiAgICB0aGlzLnBhbmVsLmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgZGlkQ2FuY2VsU2VsZWN0aW9uICgpIHtcbiAgICB0aGlzLnBhbmVsLmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5wYW5lbC5kZXN0cm95KCk7XG4gICAgdGhpcy5lbWl0dGVyLmNsZWFyKCk7XG4gICAgdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGZvY3VzICgpIHtcbiAgICAvLyBUT0RPIGZpbmQgb3V0IHdoeSB0aGlzLmZvY3VzIGRvZXNuJ3QgZXhpc3QgaWYgd2UgZG9uJ3Qgb3ZlcmlkZSBpdFxuICAgIHRoaXMuZWxlbWVudC5maXJzdENoaWxkLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIDxTZWxlY3RMaXN0IHsuLi50aGlzfSAvPjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIG9uRGlkU2VsZWN0SXRlbSAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oJ3NlbGVjdC1saXN0LXNlbGVjdC1pdGVtJywgY2FsbGJhY2spO1xuICB9XG59XG4iXX0=