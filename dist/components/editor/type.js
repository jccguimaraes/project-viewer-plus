'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class EditorType {
  /* eslint-disable-next-line require-jsdoc */
  didClick(evt) {
    const type = evt.target.closest('label').textContent.toLowerCase();
    this.onDidChange(type);
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor(props, children) {
    console.log('created editor-type component', props, children);

    this.onDidChange = props.onDidChange;
    this.children = children;
    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    console.log('updated editor-type component', this, props);

    if (props) {
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed editor-type component', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered editor-type component', this);

    return _etch2.default.dom(
      'div',
      { className: 'block-container' },
      this.children.map(child => child),
      _etch2.default.dom(
        'label',
        { 'class': 'input-label' },
        _etch2.default.dom('input', { 'class': 'input-radio', type: 'radio', name: 'type', on: {
            click: evt => this.didClick(evt)
          } }),
        'Group'
      ),
      _etch2.default.dom(
        'label',
        { 'class': 'input-label' },
        _etch2.default.dom('input', { 'class': 'input-radio', type: 'radio', name: 'type', on: {
            click: evt => this.didClick(evt)
          } }),
        'Project'
      )
    );
  }
}
exports.default = EditorType; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci90eXBlLmpzIl0sIm5hbWVzIjpbIkVkaXRvclR5cGUiLCJkaWRDbGljayIsImV2dCIsInR5cGUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidGV4dENvbnRlbnQiLCJ0b0xvd2VyQ2FzZSIsIm9uRGlkQ2hhbmdlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwibWFwIiwiY2hpbGQiLCJjbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsVUFBTixDQUFpQjtBQUM5QjtBQUNBQyxXQUFVQyxHQUFWLEVBQWU7QUFDYixVQUFNQyxPQUFPRCxJQUFJRSxNQUFKLENBQVdDLE9BQVgsQ0FBbUIsT0FBbkIsRUFBNEJDLFdBQTVCLENBQXdDQyxXQUF4QyxFQUFiO0FBQ0EsU0FBS0MsV0FBTCxDQUFpQkwsSUFBakI7QUFDRDs7QUFFRDtBQUNBTSxjQUFhQyxLQUFiLEVBQW9CQyxRQUFwQixFQUE4QjtBQUM1QkMsWUFBUUMsR0FBUixDQUFZLCtCQUFaLEVBQTZDSCxLQUE3QyxFQUFvREMsUUFBcEQ7O0FBRUEsU0FBS0gsV0FBTCxHQUFtQkUsTUFBTUYsV0FBekI7QUFDQSxTQUFLRyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBRyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY04sS0FBZCxFQUFxQjtBQUNuQkUsWUFBUUMsR0FBUixDQUFZLCtCQUFaLEVBQTZDLElBQTdDLEVBQW1ESCxLQUFuRDs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxhQUFPSSxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2ZQLFlBQVFDLEdBQVIsQ0FBWSxpQ0FBWixFQUErQyxJQUEvQztBQUNBLFVBQU1DLGVBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBQyxXQUFVO0FBQ1JSLFlBQVFDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4QyxJQUE5Qzs7QUFFQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsaUJBQWY7QUFDRyxXQUFLRixRQUFMLENBQWNVLEdBQWQsQ0FBa0JDLFNBQVNBLEtBQTNCLENBREg7QUFFRTtBQUFBO0FBQUEsVUFBTyxTQUFNLGFBQWI7QUFDRSxzQ0FBTyxTQUFNLGFBQWIsRUFBMkIsTUFBSyxPQUFoQyxFQUF3QyxNQUFLLE1BQTdDLEVBQW9ELElBQUk7QUFDdERDLG1CQUFPckIsT0FBTyxLQUFLRCxRQUFMLENBQWNDLEdBQWQ7QUFEd0MsV0FBeEQsR0FERjtBQUFBO0FBQUEsT0FGRjtBQU9FO0FBQUE7QUFBQSxVQUFPLFNBQU0sYUFBYjtBQUNFLHNDQUFPLFNBQU0sYUFBYixFQUEyQixNQUFLLE9BQWhDLEVBQXdDLE1BQUssTUFBN0MsRUFBb0QsSUFBSTtBQUN0RHFCLG1CQUFPckIsT0FBTyxLQUFLRCxRQUFMLENBQWNDLEdBQWQ7QUFEd0MsV0FBeEQsR0FERjtBQUFBO0FBQUE7QUFQRixLQURGO0FBZUQ7QUF4RDZCO2tCQUFYRixVLEVBTHJCIiwiZmlsZSI6InR5cGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvclR5cGUge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGljayAoZXZ0KSB7XG4gICAgY29uc3QgdHlwZSA9IGV2dC50YXJnZXQuY2xvc2VzdCgnbGFiZWwnKS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMub25EaWRDaGFuZ2UodHlwZSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZWRpdG9yLXR5cGUgY29tcG9uZW50JywgcHJvcHMsIGNoaWxkcmVuKTtcblxuICAgIHRoaXMub25EaWRDaGFuZ2UgPSBwcm9wcy5vbkRpZENoYW5nZTtcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBlZGl0b3ItdHlwZSBjb21wb25lbnQnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGVkaXRvci10eXBlIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGVkaXRvci10eXBlIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImlucHV0LWxhYmVsXCI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtcmFkaW9cIiB0eXBlPVwicmFkaW9cIiBuYW1lPVwidHlwZVwiIG9uPXt7XG4gICAgICAgICAgICBjbGljazogZXZ0ID0+IHRoaXMuZGlkQ2xpY2soZXZ0KVxuICAgICAgICAgIH19IC8+R3JvdXBcbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiaW5wdXQtbGFiZWxcIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC1yYWRpb1wiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJ0eXBlXCIgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiBldnQgPT4gdGhpcy5kaWRDbGljayhldnQpXG4gICAgICAgICAgfX0gLz5Qcm9qZWN0XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=