/** @jsx etch.dom */

import etch from 'etch';

/**
 * Component that generates an Atom `list-nested-item` (aka group)
 */
export default class GroupSelectorComponent {
  /* eslint-disable-next-line require-jsdoc */
  updateEntry (entry) {
    this.id = entry.group.id;
    this.name = entry.group.name;
    this.groups = entry.group.groups;
  }

  /**
   * handler for click events
   * @param {Object} event the click event object
   */
  didClick (event) {
    this.folding = this.folding === 'expanded' ? 'collapsed' : 'expanded';
    this.update(this);
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
    console.log('created group selector', props);
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
    console.log('updated group selector', this, props);

    return Promise.resolve();
  }

  /**
   * Called whenever etch destroys the component
   */
  async destroy () {
    console.log('destroyed group selector', this);
    await etch.destroy(this);
  }

  /**
   * render upon an etch update
   * @returns {Object} returns a virtual DOM tree representing the current
   * state of the component
   */
  render () {
    console.log('rendered group selector', this);

    return (
      <li id={this.id} className="list-nested-item">
        <div class="list-item">
          <span>{this.name}</span>
        </div>
        <ul class="list-tree">
          {this.groups.map(subGroup => (
            <GroupSelectorComponent group={subGroup} />
          ))}
        </ul>
      </li>
    );
  }
}
