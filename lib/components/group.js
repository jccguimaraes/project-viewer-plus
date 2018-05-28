/** @jsx etch.dom */

import etch from 'etch';
import ListContainer from './../containers/list';

/**
 *
 */
export default class GroupComponent {
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
    console.log(event.type, this.props);
    event.target.classList.add('dragging');
  }

  /**
   *
   * @param {Object} event - description
   */
  didDragEnd (event) {
    console.log(event.type, this.props);
    event.target.classList.remove('dragging');
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
  render () {
    const events = {
      click: this.didClick,
      dragstart: this.didDrag,
      drop: this.didDrop,
      dragend: this.didDragEnd
    };

    const icon =
      this.props.icon && atom.packages.isPackageActive('file-icons')
        ? `icon ${this.props.icon}-icon`
        : '';
    const foldingState = this.props.expanded ? 'expanded' : 'collapsed';

    return (
      <li className={`list-nested-item ${foldingState}`}>
        <div className="list-item pv-group" on={{ ...events }} draggable="true">
          <span className={icon}>{this.props.name}</span>
        </div>

        <ListContainer
          {...this.props}
          onSelectProject={this.props.onSelectProject}
        />
      </li>
    );
  }
}
