const path = require('path');
const pvpPackage = path.resolve(__dirname, '..');

let pkg;

describe('asdasd', () => {
  before(async () => {
    pkg = await atom.packages.loadPackage(pvpPackage);
  });

  it('asdasd', async () => {
    const pane = atom.workspace.getActivePane();
    attachToDOM(atom.workspace.getElement());
    await pkg.activate();
    pkg.mainModule.activationInitialization({});
  });
});
