/** @babel */

import { expect } from 'chai';
import sinon from 'sinon';

import state from '../lib/services/state';

import fileState from './mocks/file.json';

describe('state', () => {
  it('should serialize the state', () => {
    state.deserializeGroupAndReturnId(fileState, true);

    const storedState = state.serializeGroupById();

    expect(storedState)
      .to.have.property('groups')
      .to.be.a('array');
    expect(storedState)
      .to.have.property('projects')
      .to.be.a('array');

    expect(storedState.groups).to.have.length(1);
    expect(storedState.projects).to.have.length(1);

    const group1 = storedState.groups[0];
    expect(group1.name).to.equal('group #1');
    expect(group1.id).to.be.a('string');
    expect(group1.order)
      .to.be.a('string')
      .to.equal('alphabetically');
    expect(group1.icon)
      .to.be.a('string')
      .to.equal('');

    const project1 = storedState.projects[0];
    expect(project1.name).to.equal('project #1');
    expect(project1.id).to.not.be.undefined;
    expect(project1)
      .to.have.property('paths')
      .to.be.a('array');

    const path = project1.paths[0];
    expect(path)
      .to.have.property('platform')
      .to.be.a('string')
      .to.equal('win32');
  });

  it('should update only the icon for entry with id "123-asd"', () => {
    state.deserializeGroupAndReturnId(fileState, true);

    const id = '123-asd';

    const oldState = state.mapping.get(id);
    const newState = {
      icon: 'node'
    };

    state.fullOrParcialUpdateExistingEntry(id, newState);

    expect(oldState.icon).to.equal('');
    expect(state.mapping.get(id).icon).to.equal('node');
  });

  it('should return only projects underneath a group', () => {
    const projects = state.getProjectsInGroup();

    expect(projects).to.have.length(3);
  });
});
