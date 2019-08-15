/** @jsx etch.dom */

import etch from 'etch';
import GroupComponent from './../components/group';
import ProjectComponent from './../components/project';
import state from '../services/state';

/* eslint-disable-next-line require-jsdoc */
export default class ListContainer {
  /* eslint-disable-next-line require-jsdoc */
  drop (entryId, parentId) {
    state.setParentOfEntry(entryId, parentId);
  }

  /* eslint-disable-next-line require-jsdoc */
  didDrop (event) {
    event.stopPropagation();
    event.preventDefault();

    if (!this.isRoot) {
      return;
    }
    this.drop(event.dataTransfer.getData('text/plain'));
  }

  /**
   * @param {Object} props etch component properties
   * @param {boolean} props.isRoot ...
   * @param {array} props.groups ...
   * @param {array} props.projects ...
   */
  constructor (props) {
    this.isRoot = props.isRoot;
    this.className = this.isRoot
      ? 'list-tree has-collapsable-children'
      : 'list-tree';
    this.groups = props.groups;
    this.projects = props.projects;

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
    }

    return etch.update(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    return (
      <ul
        on={{
          drop: this.didDrop
        }}
        className={this.className}
      >
        {this.groups.map(entry => (
          <GroupComponent {...entry} onDidDrop={this.drop} key={entry.id} />
        ))}
        {this.projects.map(entry => (
          <ProjectComponent {...entry} onDidDrop={this.drop} key={entry.id} />
        ))}
      </ul>
    );
  }
}
