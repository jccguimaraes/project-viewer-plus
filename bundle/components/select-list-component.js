Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

var _atomSelectList = require('atom-select-list');

var _atomSelectList2 = _interopRequireDefault(_atomSelectList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
let SelectListComponent = class SelectListComponent {

  /**
   *
   */
  constructor() {
    this.items = [];
    this.selectListView = new _atomSelectList2.default({
      items: this.items,
      emptyMessage: 'There are no projects...',
      didCancelSelection: () => this.cancel(),
      didConfirmEmptySelection: () => this.confirm(),
      didConfirmSelection: item => this.confirmSelection(item),
      filterKeyForItem: item => item.breadcrumb(),
      elementForItem: item => this.createItem(item)
    });

    this.subscriptions = new _atom.CompositeDisposable();
  }

  /**
   *
   */
  get element() {
    return this.selectListView.element;
  }

  /**
   *
   */
  destroy() {
    if (this.panel) {
      this.panel.destroy();
    }

    if (this.subscriptions) {
      this.subscriptions.dispose();
      this.subscriptions = null;
    }

    this.selectListView.destroy();
  }

  /**
   *
   */
  cancel() {
    this.selectListView.reset();
    this.hide();
  }

  /**
   *
   * @param {Object} item - description
   */
  confirm(item) {
    this.cancel();
  }

  /**
   *
   */
  show() {
    this.previouslyFocusedElement = document.activeElement;
    if (!this.panel) {
      this.panel = atom.workspace.addModalPanel({
        item: this
      });
    }
    this.panel.show();
    this.selectListView.focus();
  }

  /**
   *
   */
  hide() {
    if (this.panel) {
      this.panel.hide();
    }

    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  }

  /**
   *
   * @param {Array} items - description
   */
  setItems(items) {
    this.selectListView.update({
      items,
      loadingMessage: null,
      loadingBadge: null
    });
  }
};
exports.default = SelectListComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3NlbGVjdC1saXN0LWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJTZWxlY3RMaXN0Q29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJpdGVtcyIsInNlbGVjdExpc3RWaWV3IiwiZW1wdHlNZXNzYWdlIiwiZGlkQ2FuY2VsU2VsZWN0aW9uIiwiY2FuY2VsIiwiZGlkQ29uZmlybUVtcHR5U2VsZWN0aW9uIiwiY29uZmlybSIsImRpZENvbmZpcm1TZWxlY3Rpb24iLCJpdGVtIiwiY29uZmlybVNlbGVjdGlvbiIsImZpbHRlcktleUZvckl0ZW0iLCJicmVhZGNydW1iIiwiZWxlbWVudEZvckl0ZW0iLCJjcmVhdGVJdGVtIiwic3Vic2NyaXB0aW9ucyIsImVsZW1lbnQiLCJkZXN0cm95IiwicGFuZWwiLCJkaXNwb3NlIiwicmVzZXQiLCJoaWRlIiwic2hvdyIsInByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImF0b20iLCJ3b3Jrc3BhY2UiLCJhZGRNb2RhbFBhbmVsIiwiZm9jdXMiLCJzZXRJdGVtcyIsInVwZGF0ZSIsImxvYWRpbmdNZXNzYWdlIiwibG9hZGluZ0JhZGdlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBOzs7SUFHTUEsbUIsR0FBTixNQUFNQSxtQkFBTixDQUEwQjs7QUFFeEI7OztBQUdBQyxnQkFBZTtBQUNiLFNBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQiw2QkFBZTtBQUNuQ0QsYUFBTyxLQUFLQSxLQUR1QjtBQUVuQ0Usb0JBQWMsMEJBRnFCO0FBR25DQywwQkFBb0IsTUFBTSxLQUFLQyxNQUFMLEVBSFM7QUFJbkNDLGdDQUEwQixNQUFNLEtBQUtDLE9BQUwsRUFKRztBQUtuQ0MsMkJBQXFCQyxRQUFRLEtBQUtDLGdCQUFMLENBQXNCRCxJQUF0QixDQUxNO0FBTW5DRSx3QkFBa0JGLFFBQVFBLEtBQUtHLFVBQUwsRUFOUztBQU9uQ0Msc0JBQWdCSixRQUFRLEtBQUtLLFVBQUwsQ0FBZ0JMLElBQWhCO0FBUFcsS0FBZixDQUF0Qjs7QUFVQSxTQUFLTSxhQUFMLEdBQXFCLCtCQUFyQjtBQUNEOztBQUVEOzs7QUFHQSxNQUFJQyxPQUFKLEdBQWU7QUFDYixXQUFPLEtBQUtkLGNBQUwsQ0FBb0JjLE9BQTNCO0FBQ0Q7O0FBRUQ7OztBQUdBQyxZQUFXO0FBQ1QsUUFBSSxLQUFLQyxLQUFULEVBQWdCO0FBQ2QsV0FBS0EsS0FBTCxDQUFXRCxPQUFYO0FBQ0Q7O0FBRUQsUUFBSSxLQUFLRixhQUFULEVBQXdCO0FBQ3RCLFdBQUtBLGFBQUwsQ0FBbUJJLE9BQW5CO0FBQ0EsV0FBS0osYUFBTCxHQUFxQixJQUFyQjtBQUNEOztBQUVELFNBQUtiLGNBQUwsQ0FBb0JlLE9BQXBCO0FBQ0Q7O0FBRUQ7OztBQUdBWixXQUFVO0FBQ1IsU0FBS0gsY0FBTCxDQUFvQmtCLEtBQXBCO0FBQ0EsU0FBS0MsSUFBTDtBQUNEOztBQUVEOzs7O0FBSUFkLFVBQVNFLElBQVQsRUFBZTtBQUNiLFNBQUtKLE1BQUw7QUFDRDs7QUFFRDs7O0FBR0FpQixTQUFRO0FBQ04sU0FBS0Msd0JBQUwsR0FBZ0NDLFNBQVNDLGFBQXpDO0FBQ0EsUUFBSSxDQUFDLEtBQUtQLEtBQVYsRUFBaUI7QUFDZixXQUFLQSxLQUFMLEdBQWFRLEtBQUtDLFNBQUwsQ0FBZUMsYUFBZixDQUE2QjtBQUN4Q25CLGNBQU07QUFEa0MsT0FBN0IsQ0FBYjtBQUdEO0FBQ0QsU0FBS1MsS0FBTCxDQUFXSSxJQUFYO0FBQ0EsU0FBS3BCLGNBQUwsQ0FBb0IyQixLQUFwQjtBQUNEOztBQUVEOzs7QUFHQVIsU0FBUTtBQUNOLFFBQUksS0FBS0gsS0FBVCxFQUFnQjtBQUNkLFdBQUtBLEtBQUwsQ0FBV0csSUFBWDtBQUNEOztBQUVELFFBQUksS0FBS0Usd0JBQVQsRUFBbUM7QUFDakMsV0FBS0Esd0JBQUwsQ0FBOEJNLEtBQTlCO0FBQ0EsV0FBS04sd0JBQUwsR0FBZ0MsSUFBaEM7QUFDRDtBQUNGOztBQUVEOzs7O0FBSUFPLFdBQVU3QixLQUFWLEVBQWlCO0FBQ2YsU0FBS0MsY0FBTCxDQUFvQjZCLE1BQXBCLENBQTJCO0FBQ3pCOUIsV0FEeUI7QUFFekIrQixzQkFBZ0IsSUFGUztBQUd6QkMsb0JBQWM7QUFIVyxLQUEzQjtBQUtEO0FBakd1QixDO2tCQW9HWGxDLG1CIiwiZmlsZSI6InNlbGVjdC1saXN0LWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJ2F0b20tc2VsZWN0LWxpc3QnO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIFNlbGVjdExpc3RDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB0aGlzLnNlbGVjdExpc3RWaWV3ID0gbmV3IFNlbGVjdExpc3Qoe1xuICAgICAgaXRlbXM6IHRoaXMuaXRlbXMsXG4gICAgICBlbXB0eU1lc3NhZ2U6ICdUaGVyZSBhcmUgbm8gcHJvamVjdHMuLi4nLFxuICAgICAgZGlkQ2FuY2VsU2VsZWN0aW9uOiAoKSA9PiB0aGlzLmNhbmNlbCgpLFxuICAgICAgZGlkQ29uZmlybUVtcHR5U2VsZWN0aW9uOiAoKSA9PiB0aGlzLmNvbmZpcm0oKSxcbiAgICAgIGRpZENvbmZpcm1TZWxlY3Rpb246IGl0ZW0gPT4gdGhpcy5jb25maXJtU2VsZWN0aW9uKGl0ZW0pLFxuICAgICAgZmlsdGVyS2V5Rm9ySXRlbTogaXRlbSA9PiBpdGVtLmJyZWFkY3J1bWIoKSxcbiAgICAgIGVsZW1lbnRGb3JJdGVtOiBpdGVtID0+IHRoaXMuY3JlYXRlSXRlbShpdGVtKVxuICAgIH0pO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgZ2V0IGVsZW1lbnQgKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdExpc3RWaWV3LmVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGRlc3Ryb3kgKCkge1xuICAgIGlmICh0aGlzLnBhbmVsKSB7XG4gICAgICB0aGlzLnBhbmVsLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdExpc3RWaWV3LmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY2FuY2VsICgpIHtcbiAgICB0aGlzLnNlbGVjdExpc3RWaWV3LnJlc2V0KCk7XG4gICAgdGhpcy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uZmlybSAoaXRlbSkge1xuICAgIHRoaXMuY2FuY2VsKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHNob3cgKCkge1xuICAgIHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBpZiAoIXRoaXMucGFuZWwpIHtcbiAgICAgIHRoaXMucGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHtcbiAgICAgICAgaXRlbTogdGhpc1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMucGFuZWwuc2hvdygpO1xuICAgIHRoaXMuc2VsZWN0TGlzdFZpZXcuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgaGlkZSAoKSB7XG4gICAgaWYgKHRoaXMucGFuZWwpIHtcbiAgICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCkge1xuICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gaXRlbXMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2V0SXRlbXMgKGl0ZW1zKSB7XG4gICAgdGhpcy5zZWxlY3RMaXN0Vmlldy51cGRhdGUoe1xuICAgICAgaXRlbXMsXG4gICAgICBsb2FkaW5nTWVzc2FnZTogbnVsbCxcbiAgICAgIGxvYWRpbmdCYWRnZTogbnVsbFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdExpc3RDb21wb25lbnQ7XG4iXX0=