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

/** @jsx etch.dom */

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
    const Item = new _selectListItem.default({
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


  async update(props) {
    this.props = props;
    return _etch.default.update(this);
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
    await _etch.default.destroy(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL3NlbGVjdC1saXN0LmpzIl0sIm5hbWVzIjpbIlNlbGVjdExpc3RDb250YWluZXIiLCJjb25zdHJ1Y3RvciIsImVtaXR0ZXIiLCJFbWl0dGVyIiwic3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwic2V0SXRlbXMiLCJnZXRQcm9qZWN0c0luR3JvdXAiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInNlbGVjdFF1ZXJ5IiwiZW1wdHlNZXNzYWdlIiwiTUVTU0FHRVMiLCJDT05URVhUIiwiTk9fTUFUQ0hJTkdfUFJPSkVDVFMiLCJmaWx0ZXJLZXlGb3JJdGVtIiwiaXRlbSIsIm5hbWUiLCJzaG93IiwicGFuZWwiLCJhdG9tIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsImVsZW1lbnQiLCJ2aXNpYmxlIiwiaXNWaXNpYmxlIiwiaGlkZSIsImZvY3VzIiwiY29udGVudCIsIml0ZW1zIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsInZhbHVlIiwiaGFzT3duUHJvcGVydHkiLCJwdXNoIiwidXBkYXRlIiwiZWxlbWVudEZvckl0ZW0iLCJJdGVtIiwiU2VsZWN0TGlzdEl0ZW0iLCJkaWRDb25maXJtU2VsZWN0aW9uIiwiZW1pdCIsImRpZENhbmNlbFNlbGVjdGlvbiIsInByb3BzIiwiZGVzdHJveSIsImNsZWFyIiwiZGlzcG9zZSIsImZpcnN0Q2hpbGQiLCJyZW5kZXIiLCJvbkRpZFNlbGVjdEl0ZW0iLCJjYWxsYmFjayIsIm9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFSQTs7QUFVQTs7O0FBR2UsTUFBTUEsbUJBQU4sQ0FBMEI7QUFDdkM7OztBQUdBQyxFQUFBQSxXQUFXLEdBQUk7QUFDYixTQUFLQyxPQUFMLEdBQWUsSUFBSUMsYUFBSixFQUFmOztBQUNBQyxtQkFBTUMsZ0JBQU4sQ0FBdUIsTUFBTTtBQUMzQixXQUFLQyxRQUFMLENBQWNGLGVBQU1H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QSxlQUFlLENBQUVDLFFBQUYsRUFBWTtBQUN6QixTQUFLaEQsT0FBTCxDQUFhaUQsRUFBYixDQUFnQix5QkFBaEIsRUFBMkNELFFBQTNDO0FBQ0Q7O0FBdEpzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnYXRvbS1zZWxlY3QtbGlzdCc7XG5cbmltcG9ydCB7IE1FU1NBR0VTIH0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi8uLi9zZXJ2aWNlcy9zdGF0ZSc7XG5pbXBvcnQgU2VsZWN0TGlzdEl0ZW0gZnJvbSAnLi8uLi9jb21wb25lbnRzL3NlbGVjdC1saXN0LWl0ZW0nO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdExpc3RDb250YWluZXIge1xuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgIHN0YXRlLm9uRGlkQ2hhbmdlU3RhdGUoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRJdGVtcyhzdGF0ZS5nZXRQcm9qZWN0c0luR3JvdXAoKSk7XG4gICAgfSk7XG4gICAgdGhpcy5zZXRJdGVtcygpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0IHNlbGVjdFF1ZXJ5ICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0IGVtcHR5TWVzc2FnZSAoKSB7XG4gICAgcmV0dXJuIE1FU1NBR0VTLkNPTlRFWFQuTk9fTUFUQ0hJTkdfUFJPSkVDVFM7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZmlsdGVyS2V5Rm9ySXRlbSAoaXRlbSkge1xuICAgIHJldHVybiBpdGVtLm5hbWU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIHNob3cgKCkge1xuICAgIGlmICghdGhpcy5wYW5lbCkge1xuICAgICAgdGhpcy5wYW5lbCA9IGF3YWl0IGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoe1xuICAgICAgICBpdGVtOiB0aGlzLmVsZW1lbnQsXG4gICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYW5lbC5pc1Zpc2libGUoKSkge1xuICAgICAgdGhpcy5wYW5lbC5oaWRlKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5wYW5lbC5zaG93KCk7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7TWFwSXRlcmF0b3J9IGNvbnRlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2V0SXRlbXMgKGNvbnRlbnQpIHtcbiAgICB0aGlzLml0ZW1zID0gW107XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29udGVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb250ZW50LmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgaWYgKCF2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgncGF0aHMnKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLml0ZW1zLnB1c2godmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHsqfSBpdGVtIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gQW4gSFRNTEVsZW1lbnRcbiAgICovXG4gIGVsZW1lbnRGb3JJdGVtIChpdGVtKSB7XG4gICAgY29uc3QgSXRlbSA9IG5ldyBTZWxlY3RMaXN0SXRlbSh7IGl0ZW0gfSk7XG4gICAgcmV0dXJuIEl0ZW0uZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGl0ZW0gLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkQ29uZmlybVNlbGVjdGlvbiAoaXRlbSkge1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdzZWxlY3QtbGlzdC1zZWxlY3QtaXRlbScsIGl0ZW0pO1xuICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBkaWRDYW5jZWxTZWxlY3Rpb24gKCkge1xuICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGlmICh0aGlzLnBhbmVsKSB7XG4gICAgICB0aGlzLnBhbmVsLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5lbWl0dGVyLmNsZWFyKCk7XG4gICAgdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGZvY3VzICgpIHtcbiAgICAvLyBUT0RPIGZpbmQgb3V0IHdoeSB0aGlzLmZvY3VzIGRvZXNuJ3QgZXhpc3QgaWYgd2UgZG9uJ3Qgb3ZlcmlkZSBpdFxuICAgIHRoaXMuZWxlbWVudC5maXJzdENoaWxkLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIDxTZWxlY3RMaXN0IHsuLi50aGlzfSAvPjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIG9uRGlkU2VsZWN0SXRlbSAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oJ3NlbGVjdC1saXN0LXNlbGVjdC1pdGVtJywgY2FsbGJhY2spO1xuICB9XG59XG4iXX0=