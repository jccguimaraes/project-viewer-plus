/** @jsx etch.dom */

import etch from 'etch';

/* eslint-disable-next-line require-jsdoc */
export default class EditorPath {
  /* eslint-disable-next-line require-jsdoc */
  didRemovePath (event) {
    this.onDidRemovePath(this.path);
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor (props) {
    console.log('created editor-path component', props);
    this.path = props.path;
    this.onDidRemovePath = props.onDidRemovePath;
    etch.initialize(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async update (props) {
    return etch.update(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    return (
      <li class="list-item">
        <span
          class="'icon icon-x"
          on={{ click: this.didRemovePath }}
        >
          {this.path}
        </span>
      </li>
    );
  }
}
