/** @jsx etch.dom */

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
import state from '../services/state';
import MainComponent from './../components/main';

/* eslint-disable-next-line require-jsdoc */
export default class MainContainer {
  /* eslint-disable-next-line require-jsdoc */
  constructor () {
    console.log('main');
    this.groups = [];
    this.projects = [];

    state.onDidChangeState(() => {
      this.update(state.serializeGroupById());
    });

    etch.initialize(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  getURI () {
    return DOCK_URI;
  }

  /* eslint-disable-next-line require-jsdoc */
  getTitle () {
    return DOCK_TITLE;
  }

  /* eslint-disable-next-line require-jsdoc */
  getIconName () {
    return DOCK_ICON;
  }

  /* eslint-disable-next-line require-jsdoc */
  getPreferredWidth () {
    return DOCK_SIZE;
  }

  /* eslint-disable-next-line require-jsdoc */
  getDefaultLocation () {
    return atom.config.get(`${PLUGIN_NAME}.dock.position`) || ALLOWED_DOCKS[1];
  }

  /* eslint-disable-next-line require-jsdoc */
  getAllowedLocations () {
    return ALLOWED_DOCKS;
  }

  /* eslint-disable-next-line require-jsdoc */
  isPermanentDockItem () {
    return true;
  }

  /* eslint-disable-next-line require-jsdoc */
  toggleVisibility () {
    this.isInDock() ? this.destroyMainItem() : this.addMainItem();
  }

  /* eslint-disable-next-line require-jsdoc */
  isInDock () {
    return !!atom.workspace.paneForURI(this.getURI());
  }

  /* eslint-disable-next-line require-jsdoc */
  addMainItem () {
    atom.workspace.open(this, {
      activateItem: atom.config.get(`${PLUGIN_NAME}.dock.isActive`),
      activatePane: atom.config.get(`${PLUGIN_NAME}.dock.isVisible`),
      location: atom.config.get(`${PLUGIN_NAME}.dock.position`)
    });
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroyMainItem () {
    await atom.workspace.paneForURI(this.getURI()).destroyItem(this, true);
  }

  /**
   * Focus PVP on the current dock if visible
   */
  focusMainItem () {
    atom.workspace.paneForURI(this.getURI()).activateItem(this);
    this.element.focus();
  }

  /* eslint-disable-next-line require-jsdoc */
  async toggleFocus () {
    if (!this.isInDock()) {
      return;
    }

    if (atom.workspace.getActivePaneContainer().getActivePaneItem() !== this) {
      this.activePane = atom.workspace.getActivePane();
      this.activePaneItem = atom.workspace.getActivePaneItem();
      this.activeElement = document.activeElement;
      this.focusMainItem();
    }
    else if (this.activePane && this.activePaneItem) {
      this.activePane.activateItem(this.activePaneItem);
      this.activeElement.focus();
      delete this.activePane;
      delete this.activePaneItem;
      delete this.activeElement;
    }
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    await etch.destroy(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props = {}) {
    this.groups = props.groups || this.groups;
    this.projects = props.projects || this.projects;
    return await etch.update(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    return (
      <div className="tool-panel project-viewer-plus" tabIndex="-1">
        <MainComponent groups={this.groups} projects={this.projects} />
      </div>
    );
  }
}
