/** @jsx etch.dom */

import etch from 'etch';
import devlog from './../services/devlog';
import ListContainer from './../containers/list';
import Database from '../services/database';

/**
 *
 */
class GroupComponent {
  /**
   *
   * @param {Object} props - description
   */
  constructor (props) {
    this.props = props;
    this.database = new Database();
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
    this.props.expanded = !this.props.expanded;
    this.update(this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrag (event) {
    devlog(event.type, this.props);
    event.target.classList.add('dragging');
  }

  /**
   *
   * @param {Object} event - description
   */
  didDragEnd (event) {
    devlog(event.type, this.props);
    event.target.classList.remove('dragging');
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
  render () {
    const events = {
      click: this.didClick,
      dragstart: this.didDrag,
      drop: this.didDrop,
      dragend: this.didDragEnd
    };

    const icon =
      this.props.model.icon && atom.packages.isPackageActive('file-icons')
        ? `icon ${this.props.model.icon}-icon`
        : '';
    const foldingState = this.props.expanded ? 'expanded' : 'collapsed';

    return (
      <li className={`list-nested-item ${foldingState}`}>
        <div className="list-item pv-group" on={{ ...events }} draggable="true">
          <span className={icon}>{this.props.model.name}</span>
        </div>

        <ListContainer {...this.props} />
      </li>
    );
  }
}

export default GroupComponent;
