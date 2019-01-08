/** @jsx etch.dom */

import { Emitter, CompositeDisposable } from 'atom';
import etch from 'etch';

/**
 *
 */
export default class IconComponent {
  /* eslint-disable-next-line require-jsdoc */
  toggleSelected () {
    this.element.classList.toggle('selected');
    this.props.selected = !this.props.selected;
  }

  /* eslint-disable-next-line require-jsdoc */
  handleClick () {
    this.props.onIconClick(this.props.icon);
    this.toggleSelected();
  }

  /* eslint-disable-next-line require-jsdoc */
  handleMouseOver () {
    this.disposables.add(
      atom.tooltips.add(this.element, {
        title: this.props.icon,
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

  /**
   *
   * @returns {Object} description
   */
  get events () {
    return {
      click: this.handleClick,
      mouseover: this.handleMouseOver,
      mouseleave: this.handleMouseLeave
    };
  }

  /**
   *
   * @param {Object} [props] etch component properties
   */
  constructor (props) {
    this.props = props;
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
      this.props = props;
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /**
   *
   * @returns {Object} description
   */
  render () {
    const iconClass = this.props
      ? `icon ${this.props.icon}-icon ${this.props.selected ? 'selected' : ''}`
      : 'icon default-icon';

    return <span on={this.events} className={iconClass} />;
  }
}
