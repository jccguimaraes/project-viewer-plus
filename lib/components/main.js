/** @jsx etch.dom */

import etch from 'etch';
import ListContainer from './../containers/list';

/**
 *
 */
class MainComponent {

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
  update (props) {
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
   * @returns {Object} description
   */
  render () {
    const parentId = this.props.ids.find(id => !this.props.map[id].parentId);
    const parent = this.props.map[parentId];

    return <ListContainer {...parent} root />;
  }
}

export default MainComponent;
