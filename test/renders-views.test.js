import { expect } from 'chai';
import path from 'path';
import etch from 'etch';
import sinon from 'sinon';

import * as pkgDeps from 'atom-package-deps';

import PVP from '../lib/project-viewer-plus';
import {
  pvpPackage,
  databasePath,
  databaseName,
  packageName,
  uri
} from './utils';

describe('renders views', function () {
  before(function () {
    this.pvp = new PVP();
  });

  beforeEach(function () {
    // this.stub = sinon.stub(pkgDeps, 'install').resolves();
  });

  afterEach(async function () {
    // this.stub.restore();
    await this.pvp.deactivate();
  });

  context('when no groups or projects', function () {
    before(async function () {
      atom.config.set(databasePath, path.resolve(__dirname, './DUMMY'));

      await atom.packages.reset();
      await this.pvp.activate();
      await atom.workspace.open(uri);
    });

    after(async function () {
      await this.pvp.deactivate();
    });

    it('should open an empty view', async function () {
      const dock = atom.workspace.getRightDock();
      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();

      expect(paneItem.element.childNodes).to.have.lengthOf(1);

      const listTree = paneItem.element.firstChild;

      expect(listTree.classList.contains('list-tree')).to.be.true;
      expect(listTree.classList.contains('has-collapsable-children')).to.be
        .true;

      expect(listTree.childNodes).to.have.lengthOf(0);
    });
  });

  context('when groups and projects', function () {
    before(async function () {
      atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
      atom.config.set(databaseName, 'state.json');

      await atom.packages.reset();
      await this.pvp.activate();
      await atom.workspace.open(uri);
    });

    after(async function () {
      await this.pvp.deactivate();
    });

    it('should open the view with groups and projects', async function () {
      const dock = atom.workspace.getRightDock();
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

  context('expanding group', function () {
    before(async function () {
      atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
      atom.config.set(databaseName, 'state.json');

      await atom.packages.reset();
      await this.pvp.activate();
      await atom.workspace.open(uri);
    });

    after(async function () {
      await this.pvp.deactivate();
    });

    it.skip('should show it\'s groups and projects', async function () {
      const workspace = atom.views.getView(atom.workspace);
      attachToDOM(workspace);

      const dock = atom.workspace.getRightDock();
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

  context('restarting', function () {
    before(async function () {
      atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
      atom.config.set(databaseName, 'state.json');

      await this.pvp.activate();
      await atom.workspace.open(uri);
    });

    after(async function () {
      await this.pvp.deactivate();
    });

    it.skip('should keep view\'s state', async function () {
      const dock = atom.workspace.getRightDock();
      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();

      const listTree = paneItem.element.firstChild;
      const group = listTree.firstChild;
      const css = window.getComputedStyle(group.childNodes[1], null);

      expect(group.classList.contains('collapsed')).to.be.false;
      expect(group.classList.contains('expanded')).to.be.true;

      expect(css.display).to.equal('block');
    });
  });
});
