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

var _state = require('./../services/state');

var _state2 = _interopRequireDefault(_state);

var _selectListItem = require('./../components/select-list-item');

var _selectListItem2 = _interopRequireDefault(_selectListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
/** @jsx etch.dom */

class SelectListContainer {
  /**
   *
   */
  constructor() {
    this.emitter = new _atom.Emitter();
    _state2.default.onDidChangeState(() => {
      this.setItems(_state2.default.getProjectsInGroup());
    });
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
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    this.props = props;
    return _etch2.default.update(this, false);
  }

  /**
   * @public
   */
  async destroy() {
    if (this.panel) {
      this.panel.destroy();
    }
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
exports.default = SelectListContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL3NlbGVjdC1saXN0LmpzIl0sIm5hbWVzIjpbIlNlbGVjdExpc3RDb250YWluZXIiLCJjb25zdHJ1Y3RvciIsImVtaXR0ZXIiLCJFbWl0dGVyIiwic3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwic2V0SXRlbXMiLCJnZXRQcm9qZWN0c0luR3JvdXAiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInNlbGVjdFF1ZXJ5IiwiZW1wdHlNZXNzYWdlIiwiTUVTU0FHRVMiLCJDT05URVhUIiwiTk9fTUFUQ0hJTkdfUFJPSkVDVFMiLCJmaWx0ZXJLZXlGb3JJdGVtIiwiaXRlbSIsIm5hbWUiLCJzaG93IiwicGFuZWwiLCJhdG9tIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsImVsZW1lbnQiLCJ2aXNpYmxlIiwiaXNWaXNpYmxlIiwiaGlkZSIsImZvY3VzIiwiY29udGVudCIsIml0ZW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsInZhbHVlIiwiaGFzT3duUHJvcGVydHkiLCJwdXNoIiwidXBkYXRlIiwiZWxlbWVudEZvckl0ZW0iLCJJdGVtIiwiU2VsZWN0TGlzdEl0ZW0iLCJkaWRDb25maXJtU2VsZWN0aW9uIiwiZW1pdCIsImRpZENhbmNlbFNlbGVjdGlvbiIsInByb3BzIiwiZGVzdHJveSIsImNsZWFyIiwiZGlzcG9zZSIsImZpcnN0Q2hpbGQiLCJyZW5kZXIiLCJvbkRpZFNlbGVjdEl0ZW0iLCJjYWxsYmFjayIsIm9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7OztBQVZBOztBQWFlLE1BQU1BLG1CQUFOLENBQTBCO0FBQ3ZDOzs7QUFHQUMsZ0JBQWU7QUFDYixTQUFLQyxPQUFMLEdBQWUsSUFBSUMsYUFBSixFQUFmO0FBQ0FDLG9CQUFNQyxnQkFBTixDQUF1QixNQUFNO0FBQzNCLFdBQUtDLFFBQUwsQ0FBY0YsZ0JBQU1HLGtC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eCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJ2F0b20tc2VsZWN0LWxpc3QnO1xuXG5pbXBvcnQgeyBNRVNTQUdFUyB9IGZyb20gJy4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4vLi4vc2VydmljZXMvc3RhdGUnO1xuaW1wb3J0IFNlbGVjdExpc3RJdGVtIGZyb20gJy4vLi4vY29tcG9uZW50cy9zZWxlY3QtbGlzdC1pdGVtJztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RMaXN0Q29udGFpbmVyIHtcbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICBzdGF0ZS5vbkRpZENoYW5nZVN0YXRlKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0SXRlbXMoc3RhdGUuZ2V0UHJvamVjdHNJbkdyb3VwKCkpO1xuICAgIH0pO1xuICAgIHRoaXMuc2V0SXRlbXMoKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBzZWxlY3RRdWVyeSAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBlbXB0eU1lc3NhZ2UgKCkge1xuICAgIHJldHVybiBNRVNTQUdFUy5DT05URVhULk5PX01BVENISU5HX1BST0pFQ1RTO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGZpbHRlcktleUZvckl0ZW0gKGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbS5uYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBzaG93ICgpIHtcbiAgICBpZiAoIXRoaXMucGFuZWwpIHtcbiAgICAgIHRoaXMucGFuZWwgPSBhd2FpdCBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHtcbiAgICAgICAgaXRlbTogdGhpcy5lbGVtZW50LFxuICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFuZWwuaXNWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWwuc2hvdygpO1xuICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge01hcEl0ZXJhdG9yfSBjb250ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNldEl0ZW1zIChjb250ZW50KSB7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbnRlbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29udGVudC5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIGlmICghdmFsdWUuaGFzT3duUHJvcGVydHkoJ3BhdGhzJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5pdGVtcy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gaXRlbSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEFuIEhUTUxFbGVtZW50XG4gICAqL1xuICBlbGVtZW50Rm9ySXRlbSAoaXRlbSkge1xuICAgIGNvbnN0IEl0ZW0gPSBuZXcgU2VsZWN0TGlzdEl0ZW0oeyBpdGVtIH0pO1xuICAgIHJldHVybiBJdGVtLmVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHsqfSBpdGVtIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZENvbmZpcm1TZWxlY3Rpb24gKGl0ZW0pIHtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnc2VsZWN0LWxpc3Qtc2VsZWN0LWl0ZW0nLCBpdGVtKTtcbiAgICB0aGlzLnBhbmVsLmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgZGlkQ2FuY2VsU2VsZWN0aW9uICgpIHtcbiAgICB0aGlzLnBhbmVsLmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgaWYgKHRoaXMucGFuZWwpIHtcbiAgICAgIHRoaXMucGFuZWwuZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLmVtaXR0ZXIuY2xlYXIoKTtcbiAgICB0aGlzLmVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgZm9jdXMgKCkge1xuICAgIC8vIFRPRE8gZmluZCBvdXQgd2h5IHRoaXMuZm9jdXMgZG9lc24ndCBleGlzdCBpZiB3ZSBkb24ndCBvdmVyaWRlIGl0XG4gICAgdGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gPFNlbGVjdExpc3Qgey4uLnRoaXN9IC8+O1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWRTZWxlY3RJdGVtIChjYWxsYmFjaykge1xuICAgIHRoaXMuZW1pdHRlci5vbignc2VsZWN0LWxpc3Qtc2VsZWN0LWl0ZW0nLCBjYWxsYmFjayk7XG4gIH1cbn1cbiJdfQ==