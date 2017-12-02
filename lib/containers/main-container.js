/** @jsx etch.dom */

import { Emitter, CompositeDisposable } from 'atom';
import etch from 'etch';
import Database from './../services/database';

// import { ipcMain, webContents } from 'remote';
// import { ipcRenderer } from 'electron';

import {
  DOCK_ICON,
  DOCK_TITLE,
  DOCK_URI,
  PLUGIN_NAME
} from './../constants/base';
import ProjectViewerComponent from './../components/main-component';
import StatusContainer from './status-container';
import SelectList from './select-list-container';
import EmptyComponent from './../components/empty-component';

/**
 *
 */
class ProjectViewer {

  /**
   *
   */
  constructor () {
    this.disposables = new CompositeDisposable();
    this.emitter = new Emitter();

    // const random = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    //
    // ipcMain.on('pvx-channel', function (event, arg) {
    //   event.sender.send('pvx-res', `project #${random}`);
    // });
    //
    // ipcRenderer.on('pvx-res', function (event, arg) {
    //   console.log('pvx-res', arg);
    // });

    this.selectList = new SelectList();
    this.database = new Database();

    this.database.onDidChange(content => {
      this.update(content);
      this.selectList.setItems(content);
    });

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
   * @returns {Object} description
   */
  render () {
    if (!this.props) {
      return (
        <div class='tool-panel project-viewer-plus' tabIndex="-1">
          <EmptyComponent />
          <StatusContainer ref='statusContainer' />
        </div>
      );
    }

    return (
      <div class='tool-panel project-viewer-plus' tabIndex="-1">
        <ProjectViewerComponent ref='projectViewerComponent' {...this.props} />
        <StatusContainer ref='statusContainer' />
      </div>
    );
  }

  /**
   *
   */
  async destroy () {
    this.disposables.dispose();
    this.emitter.emit('did-destroy');
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
    return 200;
  }

  /**
   *
   * @returns {string} description
   */
  getDefaultLocation () {
    return atom.config.get(`${PLUGIN_NAME}.dock.position`) || 'right';
  }

  /**
   *
   * @returns {Array} description
   */
  getAllowedLocations () {
    return ['left', 'right'];
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
   *
   */
  toggleSelectList () {
    this.selectList.show();
  }
}

export default ProjectViewer;
