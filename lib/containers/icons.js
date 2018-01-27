/** @jsx etch.dom */

import { Emitter, CompositeDisposable } from 'atom';
import etch from 'etch';
import icons from './../constants/icons';
import Icon from './../components/icon';

/**
 *
 */
class IconsContainer {
  /**
   *
   * @param {Object} props - description
   */
  constructor (props) {
    this.props = props;
    this.filterIcons();
    this.disposables = new CompositeDisposable();
    this.emitter = new Emitter();

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
  get events () {
    return {
      search: () => this.filterIcons(),
      keyup: event => this.filterIcons(event.target.value)
    };
  }

  /**
   *
   * @param {string} filter - description
   */
  async filterIcons (filter) {
    this.icons = [];

    icons.forEach(icon => {
      const finding = icon.replace('-icon', '');

      if (!filter || !filter.length || finding.includes(filter)) {
        this.icons.push(
          <Icon icon={icon} onIconClick={this.props.onIconClick} />
        );
      }
    });

    etch.update(this);
  }

  /**
   *
   * @returns {Object} description
   */
  render () {
    return (
      <div className="block-container">
        <h2>Icons</h2>
        <input
          className="input-search"
          type="search"
          on={this.events}
          placeholder="type to search for an icon"
        />
        <ul className="info-messages block">
          <li>
            Showing&nbsp;
            <span className="highlight">{this.icons.length}</span>&nbsp;icon(s).
          </li>
        </ul>
        <div className="block-icons">{this.icons}</div>
      </div>
    );
  }
}

export default IconsContainer;
