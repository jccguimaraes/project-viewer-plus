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
  DOCK_SIZE,
  PLUGIN_NAME,
  ALLOWED_DOCKS,
  EMITTER
} from './../constants/base';
import ProjectViewerComponent from './../components/main';
import SelectList from './select-list';
import EmptyComponent from './../components/empty';
import EditorContainer from './editor';

/**
 *
 */
class MainContainer {
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
    //   devlog('pvx-res', arg);
    // });

    this.selectList = new SelectList();
    this.database = new Database();

    this.database.onDidChange(content => {
      this.update(content);
      this.selectList.setItems(content);
    });

    this.database.onDidError(() => {
      this.update();
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

    return (
      <div className="tool-panel project-viewer-plus" tabIndex="-1">
        {this.props ?
          (<ProjectViewerComponent {...this.props} />) :
          (<EmptyComponent loading={this.database.loading} />)
        }
      </div>
    );
  }

  /**
   *
   */
  async destroy () {
    this.disposables.dispose();
    this.emitter.emit(EMITTER.ERROR);
  }

  /**
   * @param {Function} callback - description
   * @returns {Object} description
   */
  onDidDestroy (callback) {
    return this.emitter.on(EMITTER.ERROR, callback);
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
   *
   */
  toggleSelectList () {
    this.selectList.show();
  }

  /**
   *
   */
  async openEditor () {
    atom.workspace.open(await new EditorContainer());
  }
}

export default MainContainer;
