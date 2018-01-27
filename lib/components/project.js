/** @jsx etch.dom */

import etch from 'etch';
import { ipcRenderer } from 'electron';
import devlog from './../services/devlog';
import ContextSwitcher from './../services/context-switcher';

/**
 *
 */
class ProjectComponent {
  /**
   *
   * @param {Object} props - description
   */
  constructor (props) {
    this.props = props;
    this.contextSwitcher = new ContextSwitcher();

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
    // ipcRenderer.send('pvx-channel', this);
    devlog(event.type, this.props);
    this.contextSwitcher.switchContext(this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrag (event) {
    devlog(event.type, this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrop (event) {
    devlog(event.type, this.props);
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
      this.props.model.icon && atom.packages.isPackageActive('file-icons')
        ? `icon ${this.props.model.icon}-icon`
        : '';
    const selected = this.props.selected ? 'selected' : '';

    return (
      <li
        className={`list-item pv-project ${selected}`}
        on={this.events}
        draggable="true"
      >
        <span className={icon}>{this.props.model.name}</span>
      </li>
    );
  }
}

export default ProjectComponent;
