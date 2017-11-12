/** @jsx etch.dom */

import etch from 'etch';
import GroupComponent from '../components/group-component';

/**
 *
 */
class GroupsContainer {

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
   * @returns {Object} description
   */
  getGroups () {
    return this.props.groups.forEach(group => <GroupComponent />);
  }

  /**
   *
   * @returns {Object} description
   */
  render () {

    const groups = [];

    return (
      this.getGroups()
    );
  }
}

export default GroupsContainer;
