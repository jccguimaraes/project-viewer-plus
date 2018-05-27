/** @jsx etch.dom */

import { Emitter, CompositeDisposable } from 'atom';
import etch from 'etch';
import Icons from './icons';

/**
 *
 */
export default class EditorContainer {
  /**
   *
   */
  constructor () {
    this.disposables = new CompositeDisposable();
    this.emitter = new Emitter();

    etch.initialize(this);
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  async update (props) {
    if (props) {
      this.props = props;
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /**
   *
   */
  async destroy () {
    this.disposables.dispose();
    this.emitter.emit('did-destroy');
  }

  /**
   *
   */
  renderOptions () {
    /**
    if (this.props.editable) {
      return [
        <div className="block">
          <button className="btn btn-error inline-block-tight">Delete</button>
          <button className="btn btn-success inline-block-tight">Update</button>
        </div>,
        <h1>Edit {this.props.model.name}</h1>
      ];
    }

    return [
      <div className="block">
        <button className="btn btn-warning inline-block-tight">Cancel</button>
        <button className="btn btn-success inline-block-tight">Create</button>
      </div>,
      <h1>Name</h1>
    ];
    */
  }

  /**
   *
   * @param {string} icon - description
   */
  handleIconClick (icon) {
    console.log(icon);
  }

  /**
   *
   * @returns {Object} description
   */
  render () {
    const editable = false;

    const props = {
      editable: editable,
      model: editable
        ? {
          name: 'project-viewer-plus'
        }
        : undefined
    };

    return (
      <div className="project-viewer-plus-editor pane-item native-key-bindings">
        <div className="block-container">
          <h2>Type</h2>
          <label class="input-label">
            <input class="input-radio" type="radio" name="type" /> Group
          </label>
          <label class="input-label">
            <input class="input-radio" type="radio" name="type" /> Project
          </label>
        </div>

        <div className="block-container">
          <h2>Options</h2>
          <input className="input-text" type="text" placeholder="Name of ..."/>
          <label>
            Sort By&nbsp;
            <select class="input-select">
              <option>Alphabetically</option>
              <option>Position</option>
            </select>
          </label>
          <label>
            <input class='input-checkbox' type='checkbox' />
            &nbsp;Color&nbsp;
            <input class="input-color" type="color" />
          </label>
        </div>

        <Icons onIconClick={this.handleIconClick} />

        <div className="block-container">
          <h2>Paths</h2>
          <button className="btn btn-primary">Add path(s)</button>
        </div>

      </div>
    );
  }

  /**
   * @param {Function} callback - description
   * @returns {Object} description
   */
  onDidDestroy (callback) {
    return this.emitter.on('did-destroy', callback);
  }

  /**
   *
   * @returns {string} description
   */
  getURI () {
    return 'pvp-editor';
  }

  /**
   *
   * @returns {string} description
   */
  getTitle () {
    return 'Editor';
  }

  /**
   *
   * @returns {string} description
   */
  getIconName () {
    return 'github';
  }
}
