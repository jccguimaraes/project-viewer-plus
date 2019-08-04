/** @jsx etch.dom */

import etch from 'etch';

import GroupSelector from '../group-selector';

/* eslint-disable-next-line require-jsdoc */
export default class EditorGroups {

  /* eslint-disable-next-line require-jsdoc */
  constructor (props, children) {
    console.log('created editor-groups component', props, children);

    this.children = children;
    this.groups= props.groups;

    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    console.log('updated editor-groups component', this, props);

    if (props) {
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    console.log('destroyed editor-groups component', this);
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    console.log('rendered editor-groups component', this);

    return (
      <div className="block-container">
        {this.children.map(child => child)}

        <ul className="list-tree">{
          this.groups.map(group => <GroupSelector group={group} />)
        }</ul>
      </div>
    );
  }
}
