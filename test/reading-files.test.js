'use strict';

const { expect } = require('chai');
const path = require('path');
const etch = require('etch');

const wait = ms =>
  new Promise(resolve => window.setTimeout(() => resolve(), ms));

const pvpPackage = path.resolve(__dirname, '..');
const databasePath = 'project-viewer-plus.database.localPath';
const databaseName = 'project-viewer-plus.database.fileName';
const packageName = 'project-viewer-plus';
const uri = `atom://${packageName}:`;

let dock;
let pkg;

describe('reading files', () => {
  context('no current or legacy files exists', () => {
    before('set config database file path', () => {
      atom.packages.reset();
      atom.config.set(databasePath, path.resolve(__dirname, './DUMMY'));
      atom.config.set(databaseName, 'no-existing.json');
    });

    beforeEach('activating package', async () => {
      dock = atom.workspace.getRightDock();
      return atom.packages.activatePackage(pvpPackage);
    });

    it('should open the view and create a clean state', async () => {
      const workspace = atom.views.getView(atom.workspace);
      // attachToDOM(workspace);

      await atom.workspace.open('atom://project-viewer-plus');

      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();
      await wait(50);

      expect(paneItem.groups).to.be.an('array').that.is.empty;
      expect(paneItem.projects).to.be.an('array').that.is.empty;
    });
  });

  context('no current file exists, only legacy file', () => {
    before('set config database file path', () => {
      atom.packages.reset();
      atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
      atom.config.set(databaseName, 'no-existing.json');
    });

    beforeEach('activating package', async () => {
      dock = atom.workspace.getRightDock();
      return atom.packages.activatePackage(pvpPackage);
    });

    it('should open the view and read state from file', async () => {
      const workspace = atom.views.getView(atom.workspace);
      // attachToDOM(workspace);

      await atom.workspace.open('atom://project-viewer-plus');

      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();
      await wait(50);

      expect(paneItem.groups).to.be.an('array').to.have.lengthOf(1);
      expect(paneItem.projects).to.be.an('array').that.is.empty;

      const group = paneItem.groups[0];

      expect(group.id).to.be.a('string');
      expect(group.name).to.equal('group #1');
      expect(group.order).to.equal('alphabetically');
    });
  });

  context('file exists', () => {
    before('set config database file path', () => {
      atom.packages.reset();
      atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
      atom.config.set(databaseName, 'state.json');
    });

    beforeEach('activating package', async () => {
      dock = atom.workspace.getRightDock();
      return atom.packages.activatePackage(pvpPackage);
    });

    it('should open the view and read state from file', async () => {
      const workspace = atom.views.getView(atom.workspace);
      // attachToDOM(workspace);

      await atom.workspace.open('atom://project-viewer-plus');

      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();
      await wait(50);

      expect(paneItem.groups).to.be.an('array').to.have.lengthOf(1);
      expect(paneItem.projects).to.be.an('array').to.have.lengthOf(1);

      const group = paneItem.groups[0];

      expect(group.id).to.be.a('string');
      expect(group.icon).to.equal('atom');
      expect(group.name).to.equal('group #1');
      expect(group.folding).to.equal('collapsed');
      expect(group.order).to.equal('alphabetically');
      expect(group.parentId).to.be.undefined;
      expect(group.groups).to.be.an('array').to.have.lengthOf(1);
      expect(group.projects).to.be.an('array').to.have.lengthOf(1);

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
