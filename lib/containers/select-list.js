/** @jsx etch.dom */

import etch from 'etch';
import SelectList from 'atom-select-list';
import devlog from './../services/devlog';
import { MESSAGES } from './../constants/base';
import ContextSwitcher from './../services/context-switcher';
import SelectListItem from './../components/select-list-item';

/**
 *
 */
class SelectListContainer {
  static instance;

  /**
   *
   */
  constructor () {
    if (SelectListContainer.instance) {
      return SelectListContainer.instance;
    }
    SelectListContainer.instance = this;

    this.contextSwitcher = new ContextSwitcher();
    this.setItems();
    etch.initialize(this);
  }

  /**
   *
   * @returns {boolean} description
   */
  get selectQuery () {
    return true;
  }

  /**
   *
   * @returns {string} description
   */
  get emptyMessage () {
    return MESSAGES.CONTEXT.NO_MATCHING_PROJECTS;
  }

  /**
   *
   * @param {string} item - description
   * @returns {string} description
   */
  filterKeyForItem (item) {
    return item.model.name;
  }

  /**
   *
   */
  async show () {
    if (!this.panel) {
      this.panel = await atom.workspace.addModalPanel({
        item: this.element,
        visible: false
      });
    }

    if (this.panel.isVisible()) {
      this.panel.hide();
    }
    else {
      this.panel.show();
      this.focus();
    }
  }

  /**
   *
   * @param {Array} items - description
   */
  setItems (items) {
    this.items = !items
      ? []
      : items.ids
        .map(id => {
          const candidate = items.map[id];
          if (candidate.type === 'project' && candidate.model.paths.length) {
            return candidate;
          }
        })
        .filter(model => model);

    this.update(this);
  }

  /**
   *
   * @param {*} item - description
   * @returns {Object} An HTMLElement
   */
  elementForItem (item) {
    const Item = new SelectListItem({ item });
    return Item.element;
  }

  /**
   *
   * @param {*} item - description
   */
  didConfirmSelection (item) {
    devlog('didConfirmSelection', item);
    this.contextSwitcher.switchContext(item);
    this.panel.hide();
  }

  /**
   *
   */
  didCancelSelection () {
    devlog('didCancelSelection');
    this.panel.hide();
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  async update (props) {
    this.props = props;
    return etch.update(this);
  }

  /**
   * @public
   */
  async destroy () {
    this.panel.destroy();
    await etch.destroy(this);
  }

  /**
   *
   */
  focus () {
    // TODO find out why this.focus doesn't exist if we don't overide it
    this.element.firstChild.focus();
  }

  /**
   *
   * @returns {Object} description
   */
  render () {
    return <SelectList {...this} />;
  }
}

export default SelectListContainer;
