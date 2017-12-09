/** @jsx etch.dom */

import etch from 'etch';
// import SelectList from '../components/select-list-component';
import SelectList from 'atom-select-list';

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
    return 'No projects found :(';
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
        visible: false,
        autoFocus: true
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
    this.items = !items ? [] : items.ids.map(id => {
      const candidate = items.map[id];
      if (candidate.type === 'project') {
        return candidate.model;
      }
    }).filter(model => model);

    this.update(this);
  }

  /**
   *
   * @param {*} item - description
   * @returns {Object} An HTMLElement
   */
  elementForItem (item) {
    const element = document.createElement('li');
    element.textContent = item.name;
    return element;
  }

  /**
   *
   * @param {*} item - description
   */
  didConfirmSelection (item) {
    devlog('didConfirmSelection', item);
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
   */
  focus () {
    devlog(this);
    this.element.focus();
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
   *
   */
  async destroy () {
    this.panel.destroy();
    await etch.destroy(this);
  }

  /**
   *
   * @returns {Object} description
   */
  render () {
    return (
      <SelectList {...this} />
    );
  }
}

export default SelectListContainer;
