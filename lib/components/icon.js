/** @jsx etch.dom */

import { Emitter, CompositeDisposable } from 'atom';
import etch from 'etch';

/* eslint-disable-next-line require-jsdoc */
export default class IconComponent {
  /* eslint-disable-next-line require-jsdoc */
  handleClick () {
    this.element.classList.toggle('selected');
    this.selected = this.element.classList.contains('selected');
    this.onDidClick(this.selected ? this.icon: '');
  }

  /* eslint-disable-next-line require-jsdoc */
  handleMouseOver () {
    this.disposables.add(
      atom.tooltips.add(this.element, {
        title: this.icon,
        delay: {
          show: 500
        },
        class: 'pvp-tooltip'
      })
    );
  }

  /* eslint-disable-next-line require-jsdoc */
  handleMouseLeave () {
    this.disposables.dispose();
  }

  /* eslint-disable-next-line require-jsdoc */
  get events () {
    return {
      click: this.handleClick,
      mouseover: this.handleMouseOver,
      mouseleave: this.handleMouseLeave
    };
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor (props) {
    this.icon = props.icon;
    this.selected = props.selected;
    this.onDidClick = props.onDidClick;
    this.disposables = new CompositeDisposable();
    this.emitter = new Emitter();

    etch.initialize(this);
  }

  /**
   *
   */
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
      this.icon = props.icon;
      this.selected = props.selected || false;
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /**
   *
   * @returns {Object} description
   */
  render () {
    const iconClass = this.icon
      ? `icon ${this.icon}-icon ${this.selected ? 'selected' : ''}`
      : 'icon default-icon';

    return <span on={this.events} className={iconClass} />;
  }
}
