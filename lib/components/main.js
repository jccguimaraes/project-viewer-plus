/** @jsx etch.dom */

import etch from 'etch';
import ListContainer from './../containers/list';

/* eslint-disable-next-line require-jsdoc */
export default class MainComponent {
  /**
   * @param {Object} props etch component properties
   */
  constructor (props) {
    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  update (props) {
    console.log('update', props);
    if (props) {
      this.props = props;
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
    const { projects = [], groups = [] } = this.props || {};

    return <ListContainer groups={groups} projects={projects} isRoot />;
  }
}
