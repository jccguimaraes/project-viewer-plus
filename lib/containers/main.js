/** @jsx etch.dom */

import { CompositeDisposable, Disposable } from 'atom';
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
  // isPermanentDockItem () {
  //   return true;
  // }

  /* eslint-disable-next-line require-jsdoc */
  toggleVisibility () {
    atom.workspace.toggle(DOCK_URI);
    // this.isInDock() ? this.destroyMainItem() : this.addMainItem();
  }

  /* eslint-disable-next-line require-jsdoc */
  isInDock () {
    return !!atom.workspace.paneForURI(this.getURI());
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroyMainItem () {
    this.toggleVisibility();
    this.destroy();
  }

  /**
   * Focus PVP on the current dock if visible
   */
  focusMainItem () {
    atom.workspace.paneForURI(this.getURI()).activateItem(this);
    // this.element.focus();
  }

  /* eslint-disable-next-line require-jsdoc */
  async toggleFocus () {
    if (!this.isInDock()) {
      return;
    }

    if (atom.workspace.getActivePaneContainer().getActivePaneItem() !== this) {
    //   this.activePane = atom.workspace.getActivePane();
    //   this.activePaneItem = atom.workspace.getActivePaneItem();
    //   this.activeElement = document.activeElement;
    //   this.focusMainItem();
    }
    else if (this.activePane && this.activePaneItem) {
    //   this.activePane.activateItem(this.activePaneItem);
    //   this.activeElement.focus();
    //   delete this.activePane;
    //   delete this.activePaneItem;
    //   delete this.activeElement;
    }
  }

  /**
   * The main container is the only Etch element that will not be passed a
   * props parameter. We want the state to handle the update of groups and
   * projects. For this matter, this is also the only component that
   * initializes groups and projects.
   */
  constructor () {
    this.subscriptions = new CompositeDisposable();
    this.isViewActive = false;

    this.groups = [];
    this.projects = [];

    etch.initialize(this);

    this.addCommands();
    this.addContextMenu();
  }

  /* eslint-disable-next-line require-jsdoc */
  activate (doUpdate) {
    state.onDidChangeState(() => {
      this.update(state.serializeGroupById());
    });

    this.isViewActive = true;

    if (doUpdate) {
      this.update(state.serializeGroupById());
    }
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    this.subscriptions.dispose();
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  addCommands () {
    this.subscriptions.add(
      atom.commands.add(this.element, {
        'core:move-up': function () {},
        'core:move-down': function () {},
        'core:move-left': function () {},
        'core:move-right': function () {},
        'core:confirm': function () {}
      })
    );
  }

  /* eslint-disable-next-line require-jsdoc */
  addContextMenu () {
    this.subscriptions.add(
      atom.contextMenu.add({
        '.project-viewer-plus': [
          {
            command: 'project-viewer-plus:add-entry',
            label: 'Add group/project...',
            shouldDisplay: evt =>
              evt.target.nodeName === 'UL' ||
              !evt.target.closest('li').className.includes('pv-project')
          }
        ],
        '.project-viewer-plus .pv-group': [
          {
            command: 'project-viewer-plus:edit-entry',
            label: 'Edit group...'
          },
          {
            command: 'project-viewer-plus:delete-entry',
            label: 'Delete group...'
          }
        ],
        '.project-viewer-plus .pv-project': [
          {
            command: 'project-viewer-plus:edit-entry',
            label: 'Edit project...'
          },
          {
            command: 'project-viewer-plus:delete-entry',
            label: 'Delete project...'
          }
        ]
      })
    );
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    if (props) {
      this.groups = props.groups;
      this.projects = props.projects;

      return etch.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    if (!this.isViewActive) {
      return (
        <div className="pvp-loader">
          <span className="loading loading-spinner-small inline-block"></span>
        </div>
      );
    }

    return (
      <div className="tool-panel project-viewer-plus" tabIndex="-1">
        <MainComponent groups={this.groups} projects={this.projects} />
      </div>
    );
  }

  /* eslint-disable-next-line require-jsdoc */
  serialize () {
    return {
      deserializer: 'project-viewer-plus/mainView'
    };
  }
}
