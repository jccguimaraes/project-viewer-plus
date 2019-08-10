/** @jsx etch.dom */

import { Emitter, CompositeDisposable } from 'atom';
import etch from 'etch';
import icons from './../constants/icons';
import Icon from './../components/icon';

/* eslint-disable-next-line require-jsdoc */
export default class IconsContainer {
  /* eslint-disable-next-line require-jsdoc */
  constructor (props, children) {
    this.disposables = new CompositeDisposable();
    this.emitter = new Emitter();

    this.icons = [];
    this.icon = props.entry ? props.entry.icon : '';
    this.children = children;
    this.onDidChange = props.onDidChange;

    this.filterIcons();

    etch.initialize(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    await etch.destroy(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    if (props) {
      this.icon = props.entry ? props.entry.icon : '';
      this.filterIcons(props.search);
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  get events () {
    return {
      search: () => this.filterIcons(),
      keyup: event => this.update({ search: event.target.value })
    };
  }

  /* eslint-disable-next-line require-jsdoc */
  async filterIcons (filter) {
    this.icons = [];

    icons.forEach(icon => {
      const finding = icon.replace('-icon', '');

      if (!filter || !filter.length || finding.includes(filter)) {
        this.icons.push(
          <Icon
            icon={icon}
            selected={icon === this.icon}
            onDidClick={icon => this.onDidChange(icon)}
          />
        );
      }
    });
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    return (
      <div className="block-container">
        {this.children.map(child => child)}
        <input
          className="input-search"
          type="search"
          on={this.events}
          placeholder="type to search for an icon"
        />
        <ul className="info-messages block">
          <li>
            Showing&nbsp;
            <span className="highlight">{this.icons.length}</span>&nbsp;icon(s).
          </li>
        </ul>
        <div className="block-icons">{this.icons}</div>
      </div>
    );
  }
}
