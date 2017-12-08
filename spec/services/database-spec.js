'use strict';

const path = require('path');
const Database = require('../../bundle/services/database');
const { PLUGIN_NAME } = require('../../bundle/constants/base');

describe('database', function () {

  // INIT - THIS IS REALLY IMPORTANT AND SHOULD BE ON EVERY TEST FILE
  //      - KEEP IN MIND THE RELATIVE PATH OF __DIRNAME
  beforeEach(function () {
    this.CURRENT_PATH = atom.config.get(`${PLUGIN_NAME}.database.localPath`);
    atom.config.set(
      `${PLUGIN_NAME}.database.localPath`,
      path.join(__dirname, '..', 'fixtures')
    );
  });

  afterEach(function () {
    atom.config.set(`${PLUGIN_NAME}.database.localPath`, this.CURRENT_PATH);
  });
  // END - THIS IS REALLY IMPORTANT AND SHOULD BE ON EVERY TEST FILE

  beforeEach(function () {
    this.db = new Database();
  });

  afterEach(function () {
    this.db.destroy();
  });

  it('should return a singleton', function () {
    expect(Database.instance).toBe(this.db);
    expect(this.db.disposables).toBeDefined();
    expect(this.db.emitter).toBeDefined();
  });

  describe('when initialized', function () {

    beforeEach(function () {
      spyOn(this.db, 'readContent');
      waitsForPromise(() => this.db.initialize());
    });

    it('should have created a listener on atom\'s folder', function () {
      expect(this.db.file).toBeDefined();
      expect(this.db.readContent).toHaveBeenCalled();
      expect(this.db.readContent.calls.length).toEqual(1);
    });
  });

  describe('when no database file exists', function () {

    it ('should create a new database file', function () {});
  });

  describe('when no valid schema database file exists', function () {

    it('should only notify the user', function () {});
  });

  describe('when a previous database file exists', function () {

    it ('should convert the old schema to the new one', function () {});
  });

  describe('when a current database file exists', function () {

    it('should do nothing', function () {});
  });

  describe('when the database file is modified', function () {

    it('should only notify the user', function () {});
  });

  describe('when the database file is renamed', function () {

    it('should only notify the user', function () {});
  });

  describe('when the database file is deleted', function () {

    it('should only notify the user', function () {});
  });

  describe('when the database file is renamed back', function () {

    describe('when no valid schema exists', function () {

      it('should only notify the user', function () {});
    });
  });

  describe('when the database file is manually created', function () {

    it('should validate the schema', function () {});
  });

  describe('when an update occurs', function () {

    it('should write to a file', function () {});
  });
});
