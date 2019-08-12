'use strict';

const path = require('path');
const pvpPackage = path.resolve(__dirname, '..');

let dock;
let pkg;

const databasePath = 'project-viewer-plus.database.localPath';
const databaseName = 'project-viewer-plus.database.fileName';
const packageName = 'project-viewer-plus';
const commandStart = `${packageName}:`;
const uri = `atom://${packageName}:`;

describe('package lifecycle', () => {
  before('set config database file path', () => {
    atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
    atom.config.set(databaseName, 'no-existing.json');
  });

  beforeEach('Activating package', async () => {
    // attachToDOM(atom.views.getView(atom.workspace));
    dock = atom.workspace.getRightDock();
    return atom.packages.activatePackage(pvpPackage);
  });

  beforeEach('get package', () => {
    pkg = atom.packages.getLoadedPackage(packageName);
  });

  it('should have all commands available', () => {
    const list = atom.commands
      .findCommands({ target: atom.views.getView(atom.workspace) })
      .filter(command => command.name.startsWith(commandStart));

    expect(list.length).to.equal(12);
  });

  it('should not open the view on new Atom instance', async () => {
    expect(dock.getPaneItems().length).to.equal(0);
  });

  it('should open the view', async () => {
    await atom.workspace.open('atom://project-viewer-plus');

    const paneItem = dock.getPaneItems()[0];

    expect(dock.getPaneItems().length).to.equal(1);
    expect(paneItem).to.eql(pkg.mainModule.mainContainer);
  });

  it('should dettach from the right dock', async () => {
    await atom.packages.deactivatePackage(packageName);

    expect(dock.getPaneItems().length).to.equal(0);
  });
});
