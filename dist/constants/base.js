"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EMITTER = exports.MESSAGES = exports.ACTION = exports.ALLOWED_DOCKS = exports.DOCK_SIZE = exports.DOCK_ICON = exports.DESERIALIZER = exports.DOCK_TITLE = exports.DOCK_URI = exports.LEGACY_DATABASE_FILE = exports.DATABASE_FILE = exports.PLUGIN_NAME = void 0;
var PLUGIN_NAME = 'project-viewer-plus';
exports.PLUGIN_NAME = PLUGIN_NAME;
var DATABASE_FILE = 'project-viewer-plus.json';
exports.DATABASE_FILE = DATABASE_FILE;
var LEGACY_DATABASE_FILE = 'project-viewer.json';
exports.LEGACY_DATABASE_FILE = LEGACY_DATABASE_FILE;
var DOCK_URI = "atom://".concat(PLUGIN_NAME);
exports.DOCK_URI = DOCK_URI;
var DOCK_TITLE = 'Project Viewer';
exports.DOCK_TITLE = DOCK_TITLE;
var DESERIALIZER = 'ProjectViewerPlus';
exports.DESERIALIZER = DESERIALIZER;
var DOCK_ICON = 'bookmark';
exports.DOCK_ICON = DOCK_ICON;
var DOCK_SIZE = 200;
exports.DOCK_SIZE = DOCK_SIZE;
var ALLOWED_DOCKS = ['left', 'right'];
exports.ALLOWED_DOCKS = ALLOWED_DOCKS;
var ACTION = {
  MODIFIED: 'modified',
  DELETED: 'deleted',
  RENAMED: 'renamed'
};
exports.ACTION = ACTION;
var MESSAGES = {
  ATOM: {
    INVALID_ATOM_API: 'INVALID_ATOM_API'
  },
  CONTEXT: {
    NO_MATCHING_PROJECTS: 'No matching projects',
    NOT_A_PROJECT: 'Not a project',
    NO_VALID_PROJECT_ID: 'No valid project ID',
    SAME_PROJECT_ID: 'Same project ID'
  },
  EMITTER: {
    BAD_LEGACY_CONTENT: 'Bad legacy database content.',
    NO_LEGACY_DB: 'No legacy database file found.'
  }
};
exports.MESSAGES = MESSAGES;
var EMITTER = {
  ERROR: 'did-error',
  CHANGE_CONTENT: 'did-change-content'
};
exports.EMITTER = EMITTER;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb25zdGFudHMvYmFzZS5qcyJdLCJuYW1lcyI6WyJQTFVHSU5fTkFNRSIsIkRBVEFCQVNFX0ZJTEUiLCJMRUdBQ1lfREFUQUJBU0VfRklMRSIsIkRPQ0tfVVJJIiwiRE9DS19USVRMRSIsIkRFU0VSSUFMSVpFUiIsIkRPQ0tfSUNPTiIsIkRPQ0tfU0laRSIsIkFMTE9XRURfRE9DS1MiLCJBQ1RJT04iLCJNT0RJRklFRCIsIkRFTEVURUQiLCJSRU5BTUVEIiwiTUVTU0FHRVMiLCJBVE9NIiwiSU5WQUxJRF9BVE9NX0FQSSIsIkNPTlRFWFQiLCJOT19NQVRDSElOR19QUk9KRUNUUyIsIk5PVF9BX1BST0pFQ1QiLCJOT19WQUxJRF9QUk9KRUNUX0lEIiwiU0FNRV9QUk9KRUNUX0lEIiwiRU1JVFRFUiIsIkJBRF9MRUdBQ1lfQ09OVEVOVCIsIk5PX0xFR0FDWV9EQiIsIkVSUk9SIiwiQ0hBTkdFX0NPTlRFTlQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFPLElBQU1BLFdBQVcsR0FBRyxxQkFBcEI7O0FBQ0EsSUFBTUMsYUFBYSxHQUFHLDBCQUF0Qjs7QUFDQSxJQUFNQyxvQkFBb0IsR0FBRyxxQkFBN0I7O0FBQ0EsSUFBTUMsUUFBUSxvQkFBYUgsV0FBYixDQUFkOztBQUNBLElBQU1JLFVBQVUsR0FBRyxnQkFBbkI7O0FBQ0EsSUFBTUMsWUFBWSxHQUFHLG1CQUFyQjs7QUFDQSxJQUFNQyxTQUFTLEdBQUcsVUFBbEI7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHLEdBQWxCOztBQUNBLElBQU1DLGFBQWEsR0FBRyxDQUFDLE1BQUQsRUFBUyxPQUFULENBQXRCOztBQUNBLElBQU1DLE1BQU0sR0FBRztBQUNwQkMsRUFBQUEsUUFBUSxFQUFFLFVBRFU7QUFFcEJDLEVBQUFBLE9BQU8sRUFBRSxTQUZXO0FBR3BCQyxFQUFBQSxPQUFPLEVBQUU7QUFIVyxDQUFmOztBQUtBLElBQU1DLFFBQVEsR0FBRztBQUN0QkMsRUFBQUEsSUFBSSxFQUFFO0FBQ0pDLElBQUFBLGdCQUFnQixFQUFFO0FBRGQsR0FEZ0I7QUFJdEJDLEVBQUFBLE9BQU8sRUFBRTtBQUNQQyxJQUFBQSxvQkFBb0IsRUFBRSxzQkFEZjtBQUVQQyxJQUFBQSxhQUFhLEVBQUUsZUFGUjtBQUdQQyxJQUFBQSxtQkFBbUIsRUFBRSxxQkFIZDtBQUlQQyxJQUFBQSxlQUFlLEVBQUU7QUFKVixHQUphO0FBVXRCQyxFQUFBQSxPQUFPLEVBQUU7QUFDUEMsSUFBQUEsa0JBQWtCLEVBQUUsOEJBRGI7QUFFUEMsSUFBQUEsWUFBWSxFQUFFO0FBRlA7QUFWYSxDQUFqQjs7QUFlQSxJQUFNRixPQUFPLEdBQUc7QUFDckJHLEVBQUFBLEtBQUssRUFBRSxXQURjO0FBRXJCQyxFQUFBQSxjQUFjLEVBQUU7QUFGSyxDQUFoQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBQTFVHSU5fTkFNRSA9ICdwcm9qZWN0LXZpZXdlci1wbHVzJztcbmV4cG9ydCBjb25zdCBEQVRBQkFTRV9GSUxFID0gJ3Byb2plY3Qtdmlld2VyLXBsdXMuanNvbic7XG5leHBvcnQgY29uc3QgTEVHQUNZX0RBVEFCQVNFX0ZJTEUgPSAncHJvamVjdC12aWV3ZXIuanNvbic7XG5leHBvcnQgY29uc3QgRE9DS19VUkkgPSBgYXRvbTovLyR7UExVR0lOX05BTUV9YDtcbmV4cG9ydCBjb25zdCBET0NLX1RJVExFID0gJ1Byb2plY3QgVmlld2VyJztcbmV4cG9ydCBjb25zdCBERVNFUklBTElaRVIgPSAnUHJvamVjdFZpZXdlclBsdXMnO1xuZXhwb3J0IGNvbnN0IERPQ0tfSUNPTiA9ICdib29rbWFyayc7XG5leHBvcnQgY29uc3QgRE9DS19TSVpFID0gMjAwO1xuZXhwb3J0IGNvbnN0IEFMTE9XRURfRE9DS1MgPSBbJ2xlZnQnLCAncmlnaHQnXTtcbmV4cG9ydCBjb25zdCBBQ1RJT04gPSB7XG4gIE1PRElGSUVEOiAnbW9kaWZpZWQnLFxuICBERUxFVEVEOiAnZGVsZXRlZCcsXG4gIFJFTkFNRUQ6ICdyZW5hbWVkJ1xufTtcbmV4cG9ydCBjb25zdCBNRVNTQUdFUyA9IHtcbiAgQVRPTToge1xuICAgIElOVkFMSURfQVRPTV9BUEk6ICdJTlZBTElEX0FUT01fQVBJJ1xuICB9LFxuICBDT05URVhUOiB7XG4gICAgTk9fTUFUQ0hJTkdfUFJPSkVDVFM6ICdObyBtYXRjaGluZyBwcm9qZWN0cycsXG4gICAgTk9UX0FfUFJPSkVDVDogJ05vdCBhIHByb2plY3QnLFxuICAgIE5PX1ZBTElEX1BST0pFQ1RfSUQ6ICdObyB2YWxpZCBwcm9qZWN0IElEJyxcbiAgICBTQU1FX1BST0pFQ1RfSUQ6ICdTYW1lIHByb2plY3QgSUQnXG4gIH0sXG4gIEVNSVRURVI6IHtcbiAgICBCQURfTEVHQUNZX0NPTlRFTlQ6ICdCYWQgbGVnYWN5IGRhdGFiYXNlIGNvbnRlbnQuJyxcbiAgICBOT19MRUdBQ1lfREI6ICdObyBsZWdhY3kgZGF0YWJhc2UgZmlsZSBmb3VuZC4nXG4gIH1cbn07XG5leHBvcnQgY29uc3QgRU1JVFRFUiA9IHtcbiAgRVJST1I6ICdkaWQtZXJyb3InLFxuICBDSEFOR0VfQ09OVEVOVDogJ2RpZC1jaGFuZ2UtY29udGVudCdcbn07XG4iXX0=