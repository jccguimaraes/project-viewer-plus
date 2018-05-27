/** @jsx etch.dom */

import etch from 'etch';

/**
 *
 */
export default class EmptyComponent {
  /**
   *
   * @param {Object} props - description
   */
  constructor (props) {
    this.props = props;
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
  handleCreate () {
    this.onCreate();
  }

  /**
   *
   */
  handleImport () {}

  /**
   *
   * @returns {Object} description
   */
  render () {
    const loader = <div className="empty-options">
      <span className='loading loading-spinner-small inline-block'></span>
    </div>;

    const buttons = <div className="empty-options">
      <button className="btn btn-info btn-xs" on={{ click: this.handleCreate }}>
        Create
      </button>
      <button className="btn btn-info btn-xs" on={{ click: this.handleImport }}>
        Import legacy
      </button>
    </div>;

    return this.props.loading ? loader : buttons;
  }
}
