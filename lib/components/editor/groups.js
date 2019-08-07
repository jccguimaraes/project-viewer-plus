/** @jsx etch.dom */

import etch from 'etch';

import ListSelector from '../list-selector';

/* eslint-disable-next-line require-jsdoc */
export default class EditorGroups {
  /* eslint-disable-next-line require-jsdoc */
  updateEntry (props) {
    this.groups = props.groups;
    this.selectedId = props.selectedId;
    this.didClick = props.onDidClick;
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor (props, children) {
    console.log('created editor-groups component', props, children);

    this.children = children;
    this.updateEntry(props);

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
      this.updateEntry(props);
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

        <ListSelector
          groups={this.groups}
          selectedId={this.selectedId}
          onDidClick={this.didClick}
        />
      </div>
    );
  }
}
