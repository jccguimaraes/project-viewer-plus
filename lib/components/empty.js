/** @jsx etch.dom */

import etch from 'etch';
import Database from './../services/database';

/**
 *
 */
class EmptyComponent {
  /**
   *
   * @param {Object} props - description
   */
  constructor (props) {
    this.props = props;
    this.database = new Database();

    etch.initialize(this);
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  async update (props) {
    if (props) {
      this.props = props;
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /**
   *
   */
  async destroy () {
    await etch.destroy(this);
  }

  /**
   *
   */
  onCreate () {
    this.database.createDatabase();
  }

  /**
   *
   */
  onFile () {}

  /**
   *
   */
  onImport () {
    this.database.importContent();
  }

  /**
   *
   * @returns {Object} description
   */
  render () {
    return (
      <div className="empty-options">
        <button className="btn btn-info btn-xs" on={{ click: this.onCreate }}>
          Create
        </button>
        <button className="btn btn-info btn-xs" on={{ click: this.onFile }}>
          Import from file...
        </button>
        <button className="btn btn-info btn-xs" on={{ click: this.onImport }}>
          Import legacy
        </button>
      </div>
    );
  }
}

export default EmptyComponent;
