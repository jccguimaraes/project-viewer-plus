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

describe('reading files', function () {
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

  context('no current or legacy files exists', function () {
    before(async function () {
      atom.config.set(databasePath, path.resolve(__dirname, './DUMMY'));
      atom.config.set(databaseName, 'no-existing.json');

      await atom.packages.reset();
      await this.pvp.activate();
      await atom.workspace.open(uri);
    });

    it('should open the view and create a clean state', async function () {
      const dock = atom.workspace.getRightDock();
      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();

      expect(paneItem.groups).to.be.an('array').that.is.empty;
      expect(paneItem.projects).to.be.an('array').that.is.empty;
    });
  });

  context('no current file exists, only legacy file', function () {
    before(async function () {
      atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
      atom.config.set(databaseName, 'no-existing.json');

      await atom.packages.reset();
      await this.pvp.activate();
      await atom.workspace.open(uri);
    });

    it('should open the view and read state from file', async function () {
      const dock = atom.workspace.getRightDock();
      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();

      expect(paneItem.groups)
        .to.be.an('array')
        .to.have.lengthOf(1);
      expect(paneItem.projects).to.be.an('array').that.is.empty;

      const group = paneItem.groups[0];

      expect(group.id).to.be.a('string');
      expect(group.name).to.equal('group #1');
      expect(group.order).to.equal('alphabetically');
    });
  });

  context('file exists', function () {
    before(async function () {
      atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
      atom.config.set(databaseName, 'state.json');

      await atom.packages.reset();
      await this.pvp.activate();
      await atom.workspace.open(uri);
    });

    it('should open the view and read state from file', async function () {
      const dock = atom.workspace.getRightDock();
      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      // await etch.getScheduler().getNextUpdatePromise();

      expect(paneItem.groups)
        .to.be.an('array')
        .to.have.lengthOf(1);
      expect(paneItem.projects)
        .to.be.an('array')
        .to.have.lengthOf(1);

      const group = paneItem.groups[0];

      expect(group.id).to.be.a('string');
      expect(group.icon).to.equal('atom');
      expect(group.name).to.equal('group #1');
      expect(group.folding).to.equal('collapsed');
      expect(group.order).to.equal('alphabetically');
      expect(group.parentId).to.be.undefined;
      expect(group.groups)
        .to.be.an('array')
        .to.have.lengthOf(1);
      expect(group.projects)
        .to.be.an('array')
        .to.have.lengthOf(1);

      const project = paneItem.projects[0];

      expect(project.id).to.be.a('string');
      expect(project.name).to.equal('project #1');
      expect(project.icon).to.equal('node');
      expect(project.parentId).to.be.undefined;
      expect(project.paths)
        .to.be.an('array')
        .to.eql(['/path/to/project-1']);
    });
  });
});
