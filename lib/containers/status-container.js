/** @jsx etch.dom */

import etch from 'etch';
import Database from './../services/database';

/**
 *
 */
class StatusComponent {

  /**
   *
   * @param {Object} props - description
   */
  constructor (props) {
    this.props = props;
    this.database = new Database();

    this.database.onDidError(this.didError);
    etch.initialize(this);
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  async update (props) {
    this.props = props;
    return etch.update(this);
  }

  /**
   *
   */
  async destroy () {
    await etch.destroy(this);
  }

  /**
   *
   * @returns {Object} description
   */
  render () {
    return (
      <div className='block .pv-status-bar'></div>
    );
  }

  /**
   *
   * @todo improve JSDoc
   * @param {Object} error - description
   */
  didError (error) {
    devlog(error);
  }
}

export default StatusComponent;
