/** @jsx etch.dom */

import etch from 'etch';
// import SelectList from '../components/select-list-component';
import SelectList from 'atom-select-list';

/**
 *
 */
class SelectListContainer {

  /**
   *
   */
  constructor () {
    this.items = ['Alice', 'Bob', 'Carol'];
    this.elementForItem = item => document.createElement('p');
    etch.initialize(this);
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
   * @returns {Object} description
   */
  render () {
    return (
      <SelectList items={this.items} elementForItem={this.elementForItem} />
    );
  }
}

export default SelectListContainer;
