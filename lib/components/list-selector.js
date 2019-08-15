/** @jsx etch.dom */

import etch from 'etch';

import GroupSelector from './group-selector';

/**
 * Component that generates an Atom `list-nested-item` (aka group)
 */
export default class ListSelectorComponent {
  /* eslint-disable-next-line require-jsdoc */
  updateEntry (props) {
    this.groups = props.groups;
    this.selectedId = props.selectedId;
    this.didClick = props.onDidClick;
  }

  /**
   * Group needs to be initialized as an etch component
   * @param {Object} props etch component properties
   * @param {Object} props.id the group resource model and extras
   * @param {Object} props.name the group resource model and extras
   * @param {Object} props.folding the group resource model and extras
   * new state
   */
  constructor (props) {
    this.updateEntry(props);
    etch.initialize(this);
  }

  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * Calling etch.update returns a Promise which can be helpful in the future
   * @param {Object} [props] etch component properties
   */
  async update (props) {
    if (props) {
      this.updateEntry(props);
    }

    return etch.update(this);
  }

  /**
   * Called whenever etch destroys the component
   */
  async destroy () {
    await etch.destroy(this);
  }

  /**
   * render upon an etch update
   * @returns {Object} returns a virtual DOM tree representing the current
   * state of the component
   */
  render () {
    return (
      <ul className="list-tree">
        {this.groups.map(group => (
          <GroupSelector
            {...group}
            selectedId={this.selectedId}
            onDidClick={this.didClick}
          />
        ))}
      </ul>
    );
  }
}
