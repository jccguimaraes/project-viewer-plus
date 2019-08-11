const path = require('path');
const pvpPackage = path.resolve(__dirname, '..');

let pane;
let dock;
let pkg;

describe('package lifecycle', () => {
  before(async () => {
    attachToDOM(atom.workspace.getElement());
    pane = atom.workspace.getActivePane();
    dock = atom.workspace.getRightDock();
    pkg = await atom.packages.loadPackage(pvpPackage);
    // attachToDOM(atom.workspace.getElement());
  });

  it('should attach to the right dock', async () => {
    dock.onDidAddPaneItem(
      pane => {
        expect(pane.item).to.eql(pkg.mainModule.mainContainer);
        expect(dock.getPaneItems().length).to.equal(1);
      }
    );

    await pkg.activate();
  });

  it('should dettach from the right dock', async () => {
    dock.onDidDestroyPaneItem(
      pane => {
        expect(pane.item).to.eql(pkg.mainModule.mainContainer);
        expect(dock.getPaneItems().length).to.equal(0);
      }
    );

    await pkg.deactivate();
  });
});
