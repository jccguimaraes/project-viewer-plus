/** @jsx etch.dom */

import etch from 'etch';
import GroupComponent from './../components/group';
import ProjectComponent from './../components/project';

/**
 *
 */
export default class ListContainer {
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
   * @param {Object} resource - the updated group or project
   */
  handleUpdate (resource) {
    console.log(resource);
  }

  /**
   *
   * @returns {Object} description
   */
  render () {
    const { groups, projects, isRoot } = this.props;
    const className = isRoot
      ? 'list-tree has-collapsable-children'
      : 'list-tree';

    return (
      <ul className={className}>
        {[
          groups.map(group => (
            <GroupComponent
              {...group}
              key={group.id}
              onUpdate={this.handleUpdate.bind(this)}
            />
          )),
          projects.map(project => (
            <ProjectComponent
              {...project}
              key={project.id}
              onUpdate={this.handleUpdate.bind(this)}
            />
          ))
        ]}
      </ul>
    );
  }
}
