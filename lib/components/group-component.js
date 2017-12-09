/** @jsx etch.dom */

import etch from 'etch';
import devlog from './../services/devlog';
import ProjectComponent from './project-component';
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
    this.props.model.collapsed = !this.props.model.collapsed;
    this.update(this.props);
    this.database.saveContent();
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
   * @returns {Array} description
   */
  getGroups () {
    const groups = this.props.children
      .map(id => this.database.content.map[id])
      .filter(child => child.type === 'group');

    return groups.map(group => <GroupComponent {...group} />);
  }

  /**
   *
   * @returns {Array} description
   */
  getProjects () {
    const projects = this.props.children
      .map(id => this.database.content.map[id])
      .filter(child => child.type === 'project');

    return projects.map(project => <ProjectComponent {...project} />);
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

    const icon = this.props.model.icon ?
      `icon icon-${this.props.model.icon}` :
      '';
    const collapsed = this.props.model.collapsed ? 'collapsed' : 'expanded';

    return (
      <li className={`list-nested-item ${collapsed}`}>
        <div
          class='list-item pv-group'
          on={{ ...events }}
          draggable='true'
        >
          <span className={icon}>{this.props.model.name}</span>
        </div>

        <ul class='list-tree'>
          {this.getGroups()}
          {this.getProjects()}
        </ul>
      </li>
    );
  }
}

export default GroupComponent;
