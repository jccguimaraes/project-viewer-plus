/** @jsx etch.dom */

import etch from 'etch';

/**
 *
 */
export default class SelectListItemComponent {
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
   */
  async destroy () {
    await etch.destroy(this);
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
   * @returns {Object} description
   */
  render () {
    const { item } = this.props;
    const iconClass = item.icon
      ? `primary-line icon ${item.icon}-icon`
      : 'primary-line';

    return (
      <li className="two-lines">
        <div className={iconClass}>{item.name}</div>
        <div className="secondary-line">{item.paths}</div>
      </li>
    );
  }
}
