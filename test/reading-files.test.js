'use strict';

import { expect } from 'chai';
import path from 'path';
import etch from 'etch';

import {
  pvpPackage,
  databasePath,
  databaseName,
  packageName,
  uri
} from './utils';

let dock;
let pkg;

describe('reading files', () => {
  context('no current or legacy files exists', () => {
    before('set config database file path', async () => {
      await atom.packages.reset();
      atom.config.set(databasePath, path.resolve(__dirname, './DUMMY'));
      atom.config.set(databaseName, 'no-existing.json');
    });

    beforeEach('activating package', async () => {
      dock = atom.workspace.getRightDock();
      await atom.packages.activatePackage(pvpPackage);
    });

    it('should open the view and create a clean state', async () => {
      await atom.workspace.open(uri);

      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();

      expect(paneItem.groups).to.be.an('array').that.is.empty;
      expect(paneItem.projects).to.be.an('array').that.is.empty;
    });
  });

  context('no current file exists, only legacy file', () => {
    before('set config database file path', async () => {
      await atom.packages.reset();
      atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
      atom.config.set(databaseName, 'no-existing.json');
    });

    beforeEach('activating package', async () => {
      dock = atom.workspace.getRightDock();
      await atom.packages.activatePackage(pvpPackage);
    });

    it('should open the view and read state from file', async () => {
      await atom.workspace.open(uri);

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

  context('file exists', () => {
    before('set config database file path', async () => {
      await atom.packages.reset();
      atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
      atom.config.set(databaseName, 'state.json');
    });

    beforeEach('activating package', async () => {
      dock = atom.workspace.getRightDock();
      await atom.packages.activatePackage(pvpPackage);
    });

    it('should open the view and read state from file', async () => {
      await atom.workspace.open(uri);

      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();

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
