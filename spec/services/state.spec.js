'use strict';

const { testquire } = require('atom-coverage');
const State = testquire('services/state');

describe('service : state', function () {
  describe('when no content', function () {
    before(function () {
      this.state = new State();
      this.state.update();
      this.iterator = this.state.list();
    });

    beforeEach(function () {
      this.entry = this.iterator.next().value;
    });

    after(function () {
      this.state.clear();
    });

    it('should not create a group', function () {
      expect(this.entry).to.be.undefined;
    });
  });

  context('create a group', function () {
    describe('when candidate has minimal info', function () {
      before(function () {
        const content = { groups: [{ name: 'group' }] };

        this.state = new State();
        this.state.update(content);
        this.iterator = this.state.list();
      });

      beforeEach(function () {
        this.entry = this.iterator.next().value;
      });

      after(function () {
        this.state.clear();
      });

      it('should have all the necessary properties', function () {
        expect(this.entry[1]).to.have.property('type', 'group');
        expect(this.entry[1]).to.have.property('parentId', undefined);
        expect(this.entry[1]).to.have.property('expanded', false);
        expect(this.entry[1].model).to.have.property('id', this.entry[0]);
        expect(this.entry[1].model).to.have.property('name', 'group');
        expect(this.entry[1].model).to.have.property('icon', undefined);
      });
    });

    describe('when candidate has bloated info', function () {
      before(function () {
        const content = { groups: [{ name: 'group', dummy: 'goofy' }] };

        this.state = new State();
        this.state.update(content);
        this.iterator = this.state.list();
      });

      beforeEach(function () {
        this.entry = this.iterator.next().value;
      });

      after(function () {
        this.state.clear();
      });

      it('should only have the necessary properties', function () {
        expect(this.entry[1].model).to.not.have.property('dummy');
      });
    });

    describe('when candidate does not have a name', function () {
      before(function () {
        const content = { groups: [{}] };

        this.state = new State();
        this.state.update(content);
        this.iterator = this.state.list();
      });

      beforeEach(function () {
        this.entry = this.iterator.next().value;
      });

      after(function () {
        this.state.clear();
      });

      it('should not create a group', function () {
        expect(this.entry).to.be.undefined;
      });
    });
  });

  context('create a project', function () {
    describe('when candidate has minimal info', function () {
      before(function () {
        const content = { projects: [{ name: 'project' }] };

        this.state = new State();
        this.state.update(content);
        this.iterator = this.state.list();
      });

      beforeEach(function () {
        this.entry = this.iterator.next().value;
      });

      after(function () {
        this.state.clear();
      });

      it('should have all the necessary properties', function () {
        expect(this.entry[1]).to.have.property('type', 'project');
        expect(this.entry[1]).to.have.property('parentId', undefined);
        expect(this.entry[1].model).to.have.property('id', this.entry[0]);
        expect(this.entry[1].model).to.have.property('name', 'project');
        expect(this.entry[1].model).to.have.property('icon', undefined);
      });
    });

    describe('when candidate has bloated info', function () {
      before(function () {
        const content = { projects: [{ name: 'project', dummy: 'goofy' }] };

        this.state = new State();
        this.state.update(content);
        this.iterator = this.state.list();
      });

      beforeEach(function () {
        this.entry = this.iterator.next().value;
      });

      after(function () {
        this.state.clear();
      });

      it('should only have the necessary properties', function () {
        expect(this.entry[1].model).to.not.have.property('dummy');
      });
    });

    describe('when candidate does not have a name', function () {
      before(function () {
        const content = { projects: [{}] };

        this.state = new State();
        this.state.update(content);
        this.iterator = this.state.list();
      });

      beforeEach(function () {
        this.entry = this.iterator.next().value;
      });

      after(function () {
        this.state.clear();
      });

      it('should not create a project', function () {
        expect(this.entry).to.be.undefined;
      });
    });
  });

  context('when adding', function () {
    before(function () {
      this.state = new State();
    });

    after(function () {
      this.state.clear();
    });

    it('should add resourses', function () {
      this.group = this.state.setGroup({ name: 'group' });
      this.state.setItem(this.group);
      let iterator = this.state.list();

      expect(iterator.next().value).to.not.be.undefined;
      expect(iterator.next().value).to.be.undefined;

      this.project = this.state.setProject({ name: 'project' });
      this.state.setItem(this.project);
      iterator = this.state.list();

      expect(iterator.next().value).to.not.be.undefined;
      expect(iterator.next().value).to.not.be.undefined;
    });

    it('should update resourses', function () {
      this.group.name = 'updated group';
      this.state.setItem(this.group);
      let iterator = this.state.list();
      expect(iterator.next().value).to.not.be.undefined;
      expect(iterator.next().value).to.not.be.undefined;
      expect(iterator.next().value).to.be.undefined;
    });
  });

  context('when removing', function () {
    before(function () {
      const content = {
        groups: [{ id: 'asd-123', name: 'group #1' }],
        projects: [{ name: 'project #1', paths: ['to/some/where'] }]
      };
      this.state = new State();
      this.state.update(content);
    });

    it('should not delete anything if no valid resource', function () {
      this.state.removeItem();
      let iterator = this.state.list();
      expect(iterator.next().value).to.not.be.undefined;
      expect(iterator.next().value).to.not.be.undefined;
    });

    it('should delete the group', function () {
      expect(this.state.getGroup('asd-123')).not.to.be.undefined;
      this.state.removeItem({ id: 'asd-123' });
      expect(this.state.getGroup('asd-123')).to.be.undefined;
    });

    it('should delete the project', function () {
      let iterator = this.state.list();
      const id = iterator.next().value[0];
      expect(this.state.getProject(id)).not.to.be.undefined;
      this.state.removeItem({ id });
      expect(this.state.getProject(id)).to.be.undefined;
    });
  });

  context('when setting new content', function () {
    before(function () {
      const content = {
        groups: [{ id: 'asd-123', name: 'group #1' }],
        projects: [{ name: 'project #1', paths: ['to/some/where'] }]
      };
      this.state = new State();
      this.state.update(content);
      this.iterator = this.state.list();
    });

    beforeEach(function () {
      this.entry = this.iterator.next().value;
    });

    after(function () {
      this.state.clear();
    });

    it('should create a group', function () {
      expect(this.entry[0]).to.equal('asd-123');
      expect(this.entry[1]).to.have.property('type', 'group');
      expect(this.entry[1]).to.have.property('expanded', false);
      expect(this.entry[1]).to.have.property('parentId', undefined);
      expect(this.entry[1].model).to.have.property('id', this.entry[0]);
      expect(this.entry[1].model).to.have.property('name', 'group #1');
      expect(this.entry[1].model).to.have.property('sortBy', 'position');
      expect(this.entry[1].model).to.have.property('icon', undefined);
      expect(this.entry[1].model).to.not.have.property('updatedAt');
    });

    it('should create a project', function () {
      expect(this.entry[1]).to.have.property('type', 'project');
      expect(this.entry[1]).to.have.property('parentId', undefined);
      expect(this.entry[1].model).to.have.property('id', this.entry[0]);
      expect(this.entry[1].model).to.have.property('name', 'project #1');
      expect(this.entry[1].model).to.have.deep.property('paths', [
        'to/some/where'
      ]);
      expect(this.entry[1].model).to.have.property('icon', undefined);
      expect(this.entry[1].model).to.not.have.property('updatedAt');
    });
  });

  context('when updating content', function () {
    before(function () {
      const initialContent = {
        groups: [{ id: 'qwe-890', name: 'group #1' }],
        projects: [
          { id: 'asd-123', name: 'project #1', paths: ['to/some/where'] }
        ]
      };
      const updatedContent = {
        groups: [
          {
            id: 'qwe-890',
            name: 'group #1',
            groups: [{ name: 'group #1.1' }],
            projects: [{ name: 'project #1.1' }]
          }
        ],
        projects: [
          {
            id: 'asd-123',
            name: 'project #1',
            paths: ['to/some/where/else', 'to/some/where']
          }
        ]
      };
      this.state = new State();
      this.state.update(initialContent);
      this.state.update(updatedContent);
      this.iterator = this.state.list();
    });

    beforeEach(function () {
      this.entry = this.iterator.next().value;
    });

    after(function () {
      this.state.clear();
    });

    it('should update the group', function () {
      const timestamp = Date.now() + 1;

      expect(this.entry[1].model.id).to.equal('qwe-890');
      expect(this.entry[1])
        .to.have.property('updatedAt')
        .that.is.a('number');
      expect(this.entry[1].updatedAt).to.be.below(timestamp);
    });

    it('should update the project', function () {
      const timestamp = Date.now() + 1;

      expect(this.entry[1].model.id).to.equal('asd-123');
      expect(this.entry[1])
        .to.have.property('updatedAt')
        .that.is.a('number');
      expect(this.entry[1].updatedAt).to.be.below(timestamp);
      expect(this.entry[1].model.paths).to.eql([
        'to/some/where/else',
        'to/some/where'
      ]);
    });

    it('should create a new group with parentId', function () {
      expect(this.entry[1]).to.have.property('type', 'group');
      expect(this.entry[1]).to.have.property('parentId', 'qwe-890');
      expect(this.entry[1].model).to.have.property('id', this.entry[0]);
      expect(this.entry[1].model).to.have.property('name', 'group #1.1');
      expect(this.entry[1].model).to.have.property('icon', undefined);
      expect(this.entry[1].model).to.not.have.property('updatedAt');
    });

    it('should create a new project with parentId', function () {
      expect(this.entry[1]).to.have.property('type', 'project');
      expect(this.entry[1]).to.have.property('parentId', 'qwe-890');
      expect(this.entry[1].model).to.have.property('id', this.entry[0]);
      expect(this.entry[1].model).to.have.property('name', 'project #1.1');
      expect(this.entry[1].model).to.have.property('icon', undefined);
      expect(this.entry[1].model).to.not.have.property('updatedAt');
    });
  });

  context('when updating without a given group', function () {
    before(function () {
      const initialContent = {
        groups: [{ id: '123-asd', name: 'group #1' }]
      };
      const updatedContent = {
        groups: [{ name: 'group #2' }]
      };

      this.state = new State();
      this.state.update(initialContent);
      this.state.update(updatedContent);
      this.iterator = this.state.list();
    });

    beforeEach(function () {
      this.entry = this.iterator.next().value;
    });

    after(function () {
      this.state.clear();
    });

    it('should create a new group and remove the existing one', function () {
      expect(this.entry[1].model).to.not.have.property('id', '123-asd');
      expect(this.entry[1].model).to.have.property('name', 'group #2');
    });

    it('should exist only one group', function () {
      expect(this.entry).to.be.undefined;
    });
  });

  describe('when getting a group given a project id', function () {
    before(function () {
      const content = {
        groups: [{ id: 'asd-123', name: 'group #1' }],
        projects: [{ id: 'qwe-890', name: 'project #1' }]
      };
      this.state = new State();
      this.state.update(content);
    });

    it('should return undefined', function () {
      expect(this.state.getGroup('qwe-890')).to.be.undefined;
      expect(this.state.getProject('asd-123')).to.be.undefined;
    });
  });
});
