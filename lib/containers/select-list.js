/** @jsx etch.dom */

import { Emitter } from 'atom';
import etch from 'etch';
import SelectList from 'atom-select-list';
import { MESSAGES } from './../constants/base';
import SelectListItem from './../components/select-list-item';

/**
 *
 */
export default class SelectListContainer {
  /**
   *
   */
  constructor () {
    this.emitter = new Emitter();

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
    return item.name;
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
   * @param {MapIterator} content - description
   */
  setItems (content = []) {
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
  elementForItem (item) {
    const Item = new SelectListItem({ item });
    return Item.element;
  }

  /**
   *
   * @param {*} item - description
   */
  didConfirmSelection (item) {
    this.emitter.emit('select-list-select-item', item);
    this.panel.hide();
  }

  /**
   *
   */
  didCancelSelection () {
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

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {Function} callback - description
   */
  onDidSelectItem (callback) {
    this.emitter.on('select-list-select-item', callback);
  }
}
