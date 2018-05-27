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
              onSelectProject={this.props.onSelectProject}
            />
          )),
          projects.map(project => (
            <ProjectComponent
              {...project}
              key={project.id}
              onSelectProject={this.props.onSelectProject}
            />
          ))
        ]}
      </ul>
    );
  }
}
