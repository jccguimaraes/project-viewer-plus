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
    atom.config.set(databaseName, 'state.json');
  });

  beforeEach('activating package', async () => {
    dock = atom.workspace.getRightDock();
    return atom.packages.activatePackage(pvpPackage);
  });

  beforeEach('get package', () => {
    pkg = atom.packages.getLoadedPackage(packageName);
  });

  it('should have all commands available', () => {
    const { label, submenu } = atom.menu.template.filter(menu =>
      menu.label === 'Packages'
    )[0].submenu[0];

    expect(label).to.equal('Project Viewer Plus');
    expect(submenu).to.have.length(11);
    expect(submenu[0].label).to.equal('Toggle visibility');
    expect(submenu[1].label).to.equal('Toggle focus');
    expect(submenu[2].label).to.equal('Toggle list (disabled)');
    expect(submenu[3].type).to.equal('separator');
    expect(submenu[4].label).to.equal('State - clear (read README)');
    expect(submenu[5].label).to.equal('File - save');
    expect(submenu[6].label).to.equal('File - edit');
    expect(submenu[7].label).to.equal('File - import');
    expect(submenu[8].label).to.equal('File - import legacy');
    expect(submenu[9].type).to.equal('separator');
    expect(submenu[10].label).to.equal('Open Editor');
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
