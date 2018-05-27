/** @jsx etch.dom */

import etch from 'etch';
import { CompositeDisposable } from 'atom';

/**
 *
 */
export default class ProjectComponent {
  /**
   *
   * @param {Object} props - description
   */
  constructor (props) {
    this.disposables = new CompositeDisposable();
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
   * @param {Object} event - description
   */
  didClick (event) {
    console.log(event.type, this.props);
    this.props.onSelectProject(this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrag (event) {
    console.log(event.type, this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrop (event) {
    console.log(event.type, this.props);
  }

  /**
   *
   * @returns {Object} description
   */
  get events () {
    return {
      click: this.didClick,
      dragstart: this.didDrag,
      drop: this.didDrop
    };
  }

  /**
   *
   * @returns {Object} description
   */
  render () {
    const icon =
      this.props.icon && atom.packages.isPackageActive('file-icons')
        ? `icon ${this.props.icon}-icon`
        : '';
    const selected = this.props.selected ? 'selected' : '';

    return (
      <li
        className={`list-item pv-project ${selected}`}
        on={this.events}
        draggable="true"
      >
        <span className={icon}>{this.props.name}</span>
      </li>
    );
  }
}
