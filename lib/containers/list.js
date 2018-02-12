/** @jsx etch.dom */

import etch from 'etch';
import GroupComponent from './../components/group';
import ProjectComponent from './../components/project';
import Database from './../services/database';
import devlog from './../services/devlog';

/**
 *
 */
class ListContainer {
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
   * @returns {Object} description
   */
  render () {
    const children = this.props.children || [];
    const content = this.database.content || [];
    const className = this.props.root
      ? 'list-tree has-collapsable-children'
      : 'list-tree';

    return (
      <ul className={className}>
        {children.map(id => {
          const resource = content.map[id];
          if (!resource) {
            return null;
          }

          if (resource.type === 'project') {
            return <ProjectComponent {...resource} />;
          }
          return <GroupComponent {...resource} />;
        })}
      </ul>
    );
  }
}

export default ListContainer;
