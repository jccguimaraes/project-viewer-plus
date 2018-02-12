/** @jsx etch.dom */

import { Emitter, CompositeDisposable } from 'atom';
import etch from 'etch';

/**
 *
 */
class IconComponent {
  /**
   *
   * @param {Object} props - description
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
  handleClick () {
    this.props.onIconClick(this.props.icon);
    this.element.classList.toggle('selected');
  }

  /**
   *
   */
  handleMouseOver () {
    this.disposables.add(
      atom.tooltips.add(
        this.element, {
          title: this.props.icon,
          delay: {
            show: 500
          },
          class: 'pvp-tooltip'
        }
      )
    );
  }

  /**
   *
   */
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
   * @returns {Object} description
   */
  render () {
    const iconClass = this.props
      ? `icon ${this.props.icon}-icon`
      : 'icon default-icon';

    return <span on={this.events} className={iconClass} />;
  }
}

export default IconComponent;
