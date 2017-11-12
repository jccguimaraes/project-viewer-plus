/** @jsx etch.dom */

import etch from 'etch';

/**
 *
 */
class EmptyComponent {

  /**
   *
   * @param {Object} props - description
   */
  constructor (props) {
    this.props = props;

    etch.initialize(this);
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  async update (props) {
    if (props) {
      this.props = props;
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /**
   *
   */
  async destroy () {
    await etch.destroy(this);
  }

  /**
   *
   * @returns {Object} description
   */
  render () {
    return (
      <ul class='background-message centered'>
        <li>
          <span class='icon icon-tasklist'></span>
        </li>
      </ul>
    );
  }
}

export default EmptyComponent;
