'use strict';

const { expect } = require('chai');
const path = require('path');
const etch = require('etch');

import {
  pvpPackage,
  databasePath,
  databaseName,
  packageName,
  uri
} from './utils';

let dock;
let pkg;

describe.only('renders views', () => {
  context('when no groups or projects', () => {
    before('set config database file path', async () => {
      await atom.packages.reset();
      atom.config.set(databasePath, path.resolve(__dirname, './DUMMY'));
    });

    beforeEach('activating package', async () => {
      dock = atom.workspace.getRightDock();
      await atom.packages.activatePackage(pvpPackage);
    });

    it('should open the view without any groups or projects', async () => {
      const workspace = atom.views.getView(atom.workspace);
      attachToDOM(workspace);

      await atom.workspace.open(uri);

      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      // await etch.getScheduler().getNextUpdatePromise();

      expect(paneItem.element.childNodes).to.have.lengthOf(1);

      const listTree = paneItem.element.firstChild;

      expect(listTree.classList.contains('list-tree')).to.be.true;
      expect(listTree.classList.contains('has-collapsable-children')).to.be
        .true;

      expect(listTree.childNodes).to.have.lengthOf(0);
    });
  });

  context('when groups and projects', () => {
    before('set config database file path', async () => {
      await atom.packages.reset();
      atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
      atom.config.set(databaseName, 'state.json');
    });

    beforeEach('activating package', async () => {
      dock = atom.workspace.getRightDock();
      await atom.packages.activatePackage(pvpPackage);
    });

    it('should open the view with groups and projects', async () => {
      const workspace = atom.views.getView(atom.workspace);
      attachToDOM(workspace);

      await atom.workspace.open(uri);

      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();

      const listTree = paneItem.element.firstChild;

      expect(listTree.childNodes).to.have.lengthOf(2);

      const groups = listTree.childNodes[0];
      const project = listTree.childNodes[1];

      expect(groups.nodeName).to.equal('LI');
      expect(groups.classList.contains('list-nested-item')).to.be.true;
      expect(groups.classList.contains('collapsed')).to.be.true;

      expect(project.nodeName).to.equal('LI');
      expect(project.draggable).to.be.true;
      expect(project.classList.contains('list-item')).to.be.true;
      expect(project.classList.contains('pv-project')).to.be.true;
      expect(project.childNodes).to.be.have.lengthOf(1);
      expect(project.firstChild.nodeName).to.equal('SPAN');
      expect(project.firstChild.classList.contains('icon')).to.be.true;
      expect(project.firstChild.classList.contains('node-icon')).to.be.true;
      expect(project.firstChild.innerHTML).to.equal('project #1');

      const subGroups = groups.childNodes[0];
      const subProjects = groups.childNodes[1];

      expect(subGroups.nodeName).to.equal('DIV');
      expect(project.draggable).to.be.true;
      expect(subGroups.classList.contains('list-item')).to.be.true;
      expect(subGroups.classList.contains('pv-group')).to.be.true;
      expect(subGroups.firstChild.nodeName).to.equal('SPAN');
      expect(subGroups.firstChild.classList.contains('icon')).to.be.true;
      expect(subGroups.firstChild.classList.contains('atom-icon')).to.be.true;
    });
  });

  context('expanding group', () => {
    before('set config database file path', async () => {
      await atom.packages.reset();
      atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
      atom.config.set(databaseName, 'state.json');
    });

    beforeEach('activating package', async () => {
      dock = atom.workspace.getRightDock();
      await atom.packages.activatePackage(pvpPackage);
    });

    after('deactivating package', async () => {
      await atom.packages.deactivatePackage(packageName);
    });

    it('should show it\'s groups and projects', async () => {
      const workspace = atom.views.getView(atom.workspace);
      attachToDOM(workspace);

      await atom.workspace.open(uri);

      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();

      const listTree = paneItem.element.firstChild;
      const group = listTree.firstChild;
      const css = window.getComputedStyle(group.childNodes[1], null);

      expect(css.display).to.equal('none');
      expect(group.classList.contains('collapsed')).to.be.true;
      expect(group.classList.contains('expanded')).to.be.false;

      group.firstChild.click();

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();

      expect(group.classList.contains('collapsed')).to.be.false;
      expect(group.classList.contains('expanded')).to.be.true;

      expect(css.display).to.equal('block');
    });
  });

  context('restarting', () => {
    before('set config database file path', () => {
      atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
      atom.config.set(databaseName, 'state.json');
    });

    beforeEach('activating package', async () => {
      dock = atom.workspace.getRightDock();
      await atom.packages.activatePackage(pvpPackage);
    });

    it('should keep view\'s state', async () => {
      const workspace = atom.views.getView(atom.workspace);
      attachToDOM(workspace);
    });
  });
});
