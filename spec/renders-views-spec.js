'use strict';

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

describe('renders views', () => {
  when('when no groups or projects', () => {
    before('set config database file path', () => {
      atom.packages.reset();
      atom.config.set(databasePath, path.resolve(__dirname, './DUMMY'));
    });

    beforeEach('activating package', async () => {
      dock = atom.workspace.getRightDock();
      return atom.packages.activatePackage(pvpPackage);
    });

    it('should open the view without any groups or projects', async () => {
      await atom.workspace.open('atom://project-viewer-plus');

      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();
      await wait(50);

      expect(paneItem.element.childNodes).to.have.lengthOf(1);

      const listTree = paneItem.element.firstChild;

      expect(listTree.classList.contains('list-tree')).to.be.true;
      expect(listTree.classList.contains('has-collapsable-children')).to.be
        .true;

      expect(listTree.childNodes).to.have.lengthOf(0);
    });
  });

  when('when groups and projects', () => {
    before('set config database file path', () => {
      atom.packages.reset();
      atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
      atom.config.set(databaseName, 'state.json');
    });

    beforeEach('activating package', async () => {
      dock = atom.workspace.getRightDock();
      return atom.packages.activatePackage(pvpPackage);
    });

    it('should open the view with groups and projects', async () => {
      await atom.workspace.open('atom://project-viewer-plus');

      const paneItem = dock.getPaneItems()[0];

      // hack - force etch to update and render
      await etch.getScheduler().getNextUpdatePromise();
      await wait(50);

      const listTree = paneItem.element.firstChild;

      expect(listTree.childNodes).to.have.lengthOf(2);

      const groups = listTree.childNodes[0];
      const project = listTree.childNodes[1];

      expect(groups.nodeName).to.equal('LI');
      expect(groups.classList.contains('list-nested-item')).to.be.true;
      expect(groups.classList.contains('collapsed')).to.be.true;

      const subGroups = groups.childNodes[0];
      const subProjects = groups.childNodes[1];
      console.log(subGroups);
      console.log(subProjects);

      expect(project.nodeName).to.equal('LI');
      expect(project.draggable).to.be.true;
      expect(project.classList.contains('list-item')).to.be.true;
      expect(project.classList.contains('pv-project')).to.be.true;
      expect(project.childNodes).to.be.have.lengthOf(1);
      expect(project.firstChild.nodeName).to.equal('SPAN');
      expect(project.firstChild.innerHTML).to.equal('project #1');
    });
  });
});
