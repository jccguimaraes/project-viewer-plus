'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = message => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log('PV+', message);
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kZXZsb2cuanMiXSwibmFtZXMiOlsibWVzc2FnZSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFBZUEsV0FBVztBQUN4QixNQUFJQyxRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekM7QUFDRDtBQUNEQyxVQUFRQyxHQUFSLENBQVksS0FBWixFQUFtQkwsT0FBbkI7QUFDRCxDIiwiZmlsZSI6ImRldmxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IG1lc3NhZ2UgPT4ge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zb2xlLmxvZygnUFYrJywgbWVzc2FnZSk7XG59O1xuIl19