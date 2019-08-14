'use strict';

const { expect } = require('chai');
const path = require('path');
const pvpPackage = path.resolve(__dirname, '..');

let dock;
let pkg;

const databasePath = 'project-viewer-plus.database.localPath';
const databaseName = 'project-viewer-plus.database.fileName';
const packageName = 'project-viewer-plus';
const commandStart = `${packageName}:`;
const uri = `atom://${packageName}`;

describe('package lifecycle', () => {
  before('set config database file path', () => {
    atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
    atom.config.set(databaseName, 'state.json');
  });

  beforeEach('activating package', async () => {
    dock = atom.workspace.getRightDock();
    await atom.packages.activatePackage(pvpPackage);
  });

  beforeEach('get package', () => {
    pkg = atom.packages.getLoadedPackage(packageName);
  });

  it('should not open the view on new Atom instance', async () => {
    const workspace = atom.views.getView(atom.workspace);
    attachToDOM(workspace);

    expect(dock.getPaneItems()).to.be.empty;
  });

  it('should open the view', async () => {
    const workspace = atom.views.getView(atom.workspace);
    attachToDOM(workspace);

    await atom.workspace.open(uri);

    const paneItem = dock.getPaneItems()[0];

    expect(dock.getPaneItems()).to.have.lengthOf(1);
    expect(paneItem).to.eql(pkg.mainModule.mainContainer);
  });

  it('should dettach from the right dock', async () => {
    const workspace = atom.views.getView(atom.workspace);
    attachToDOM(workspace);

    await atom.packages.deactivatePackage(packageName);

    expect(dock.getPaneItems()).to.be.empty;
  });
});
