/** @jsx etch.dom */

import { Emitter, CompositeDisposable } from 'atom';
import etch from 'etch';
import {
  DOCK_ICON,
  DOCK_TITLE,
  DOCK_URI,
  DOCK_SIZE,
  PLUGIN_NAME,
  ALLOWED_DOCKS,
  EMITTER
} from './../constants/base';
import MainComponent from './../components/main';
import EmptyComponent from './../components/empty';

/**
 *
 */
export default class MainContainer {
  /**
   *
   */
  constructor () {
    this.disposables = new CompositeDisposable();
    this.emitter = new Emitter();
    this.loading = true;

    etch.initialize(this);
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  async update (props) {
    this.props = props;
    return etch.update(this);
  }

  /**
   *
   */
  handleCreate () {
    this.createFile();
  }

  /**
   *
   * @returns {Object} description
   */
  render () {
    return (
      <div className="tool-panel project-viewer-plus" tabIndex="-1">
        {this.props ?
          (<MainComponent {...this.props} />) :
          (<EmptyComponent
            loading={this.loading}
            onCreate={() => this.handleCreate()}
          />)
        }
      </div>
    );
  }

  /**
   * @todo
   */
  stopLoading () {
    this.loading = false;
    this.update();
  }

  /**
   *
   */
  startLoading () {
    this.loading = true;
    this.update();
  }

  /**
   *
   */
  async destroy () {
    this.disposables.dispose();
    this.emitter.emit(EMITTER.ERROR);
  }

  /**
   *
   * @returns {string} description
   */
  getURI () {
    return DOCK_URI;
  }

  /**
   *
   * @returns {string} description
   */
  getTitle () {
    return DOCK_TITLE;
  }

  /**
   *
   * @returns {string} description
   */
  getIconName () {
    return DOCK_ICON;
  }

  /**
   *
   * @returns {number} description
   */
  getPreferredWidth () {
    return DOCK_SIZE;
  }

  /**
   *
   * @returns {string} description
   */
  getDefaultLocation () {
    return atom.config.get(`${PLUGIN_NAME}.dock.position`) || ALLOWED_DOCKS[1];
  }

  /**
   *
   * @returns {Array} description
   */
  getAllowedLocations () {
    return ALLOWED_DOCKS;
  }

  /**
   *
   * @returns {boolean} description
   */
  isPermanentDockItem () {
    return true;
  }

  /**
   *
   */
  toggleVisibility () {
    atom.workspace.toggle(this.getURI());
  }

  /**
   *
   */
  async toggleFocus () {
    const dock = atom.workspace.paneContainerForItem(this);
    const pane = dock.getActivePane().getElement();

    if (this.activeElement && document.activeElement === pane) {
      this.activeElement.focus();
    }
    else {
      this.activeElement = document.activeElement;
      atom.workspace.open(this).then(() => this.element.focus());
    }
  }

  /**
   * @param {Function} callback - description
   * @returns {Object} description
   */
  onDidDestroy (callback) {
    return this.emitter.on(EMITTER.ERROR, callback);
  }

  /**
   * @param {Function} callback - description
   */
  onDidSelectProject (callback) {
    this.emitter.on('main-select-project', callback);
  }

  /**
   * @param {Object} content - description
   */
  handleUpdate (content) {
    const data = {
      groups: [],
      projects: []
    };
    const mapping = {};
    content.forEach(value => {
      const resource = value.model;

      if (value.type === 'group') {
        resource.groups = [];
        resource.projects = [];
      }
      mapping[value.model.id] = {
        ...resource,
        expanded: value.expanded
      };

      if (value.parentId && value.type === 'group') {
        mapping[value.parentId].groups.push(mapping[value.model.id]);
      }
      else if (value.parentId && value.type === 'project') {
        mapping[value.parentId].projects.push(mapping[value.model.id]);
      }
      else if (!value.parentId && value.type === 'group') {
        data.groups.push(mapping[value.model.id]);
      }
      else if (!value.parentId && value.type === 'project') {
        data.projects.push(mapping[value.model.id]);
      }
    });

    this.update(data);
  }
}
