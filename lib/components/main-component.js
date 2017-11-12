/** @jsx etch.dom */

import etch from 'etch';
import GroupComponent from './group-component';
import ProjectComponent from './project-component';

/**
 *
 */
class ProjectViewerComponent {

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
  update (props) {
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
   * @returns {Array} description
   */
  getGroups () {
    if (!this.props.ids) {
      return [];
    }

    const parentId = this.props.ids.find(
      id => this.props.map[id].parentId === undefined
    );

    if (!parentId) {
      return [];
    }

    const parent = this.props.map[parentId];
    const groups = parent.children
      .map(id => this.props.map[id])
      .filter(child => child.type === 'group');

    return groups.map(group => <GroupComponent {...group} />);
  }

  /**
   *
   * @returns {Array} description
   */
  getProjects () {
    return [];
  }

  /**
   *
   * @returns {Object} description
   */
  render () {
    return (
      <ol class='list-tree has-collapsable-children'>
        {this.getGroups()}
        {this.getProjects()}
      </ol>
    );
  }
}

export default ProjectViewerComponent;
