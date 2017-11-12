import { CompositeDisposable } from 'atom';
import SelectList from 'atom-select-list';

/**
 *
 */
class SelectListComponent {

  /**
   *
   */
  constructor () {
    this.items = [];
    this.selectListView = new SelectList({
      items: this.items,
      emptyMessage: 'There are no projects...',
      didCancelSelection: () => this.cancel(),
      didConfirmEmptySelection: () => this.confirm(),
      didConfirmSelection: item => this.confirmSelection(item),
      filterKeyForItem: item => item.breadcrumb(),
      elementForItem: item => this.createItem(item)
    });

    this.subscriptions = new CompositeDisposable();
  }

  /**
   *
   */
  get element () {
    return this.selectListView.element;
  }

  /**
   *
   */
  destroy () {
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
  cancel () {
    this.selectListView.reset();
    this.hide();
  }

  /**
   *
   * @param {Object} item - description
   */
  confirm (item) {
    this.cancel();
  }

  /**
   *
   */
  show () {
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
  hide () {
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
  setItems (items) {
    this.selectListView.update({
      items,
      loadingMessage: null,
      loadingBadge: null
    });
  }
}

export default SelectListComponent;
