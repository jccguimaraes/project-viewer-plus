/** @jsx etch.dom */

import etch from 'etch';
import ListContainer from './../containers/list';

/* eslint-disable-next-line require-jsdoc */
export default class MainComponent {
  /**
   * @param {Object} props etch component properties
   */
  constructor (props) {
    console.log('created main component', props);
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
    console.log('updated main component', this, props);

    if (props) {
      this.groups = props.groups;
      this.projects = props.projects;

      return etch.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    console.log('destroyed main component', this);
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    console.log('rendered main component', this);

    return (
      <ListContainer groups={this.groups} projects={this.projects} isRoot />
    );
  }
}
