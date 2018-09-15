/** @jsx etch.dom */

import etch from 'etch';
import GroupComponent from './../components/group';
import ProjectComponent from './../components/project';

/* eslint-disable-next-line require-jsdoc */
export default class ListContainer {
  /**
   * @param {Object} props etch component properties
   */
  constructor (props) {
    this.groups = props.groups;
    this.projects = props.projects;
    this.isRoot = props.isRoot;

    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    if (props) {
      this.groups = props.groups;
      this.projects = props.projects;

      return etch.update(this, false);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    const className = this.isRoot
      ? 'list-tree has-collapsable-children'
      : 'list-tree';

    return (
      <ul className={className}>
        {this.groups.map(resource => (
          <GroupComponent resource={resource} key={resource.id} />
        ))}
        {this.projects.map(resource => (
          <ProjectComponent resource={resource} key={resource.id} />
        ))}
      </ul>
    );
  }
}
