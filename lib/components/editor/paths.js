/** @jsx etch.dom */

import etch from 'etch';

import EditorPath from './path';

/* eslint-disable-next-line require-jsdoc */
export default class EditorPaths {
  /* eslint-disable-next-line require-jsdoc */
  didClick (event) {
    atom.pickFolder(paths => {
      this.onDidAddPaths(paths);
    });
  }

  /* eslint-disable-next-line require-jsdoc */
  handleRemovePath (path) {
    this.onDidRemovePath(path);
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor (props, children) {
    this.onDidAddPaths = props.onDidAddPaths;
    this.onDidRemovePath = props.onDidRemovePath;
    this.children = children;
    this.paths = props.entry.paths || [];

    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    if (props) {
      this.paths = props.entry.paths;
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
        <button
          on={{
            click: this.didClick
          }}
          className="btn btn-primary"
        >
          Add path(s)
        </button>
        <ul class="list-group">
          {this.paths.map(path => (
            <EditorPath
              path={path}
              onDidRemovePath={path => this.handleRemovePath(path)}
            />
          ))}
        </ul>
      </div>
    );
  }
}
