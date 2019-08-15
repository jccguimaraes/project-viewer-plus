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
    if (props) {
      this.updateEntry(props);
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
