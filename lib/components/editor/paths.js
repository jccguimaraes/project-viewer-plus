/** @jsx etch.dom */

import etch from 'etch';

/* eslint-disable-next-line require-jsdoc */
export default class EditorPaths {
  /* eslint-disable-next-line require-jsdoc */
  didClick (event) {
    atom.pickFolder(paths => {
      console.log('pickFolders', event.type, paths);
      this.onDidChange(paths);
    });
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor (props, children) {
    console.log('created editor-paths component', props);

    this.onDidChange = props.onDidChange;
    this.paths = props.paths || [];
    this.children = children;

    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    console.log('updated editor-paths component', this, props);

    if (props) {
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    console.log('destroyed editor-paths component', this);
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    console.log('rendered editor-paths component', this);

    return (
      <div className="block-container">
        {this.children.map(child => child)}
        <button
          on={{
            click: this.didClick
          }}
          className="btn btn-primary"
        >
          Add path(s)
        </button>
      </div>
    );
  }
}
