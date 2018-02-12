export const PLUGIN_NAME = 'project-viewer-plus';
export const DATABASE_FILE = 'project-viewer-plus.json';
export const LEGACY_DATABASE_FILE = 'project-viewer.json';
export const DOCK_URI = `atom://${PLUGIN_NAME}`;
export const DOCK_TITLE = 'Project Viewer';
export const DESERIALIZER = 'ProjectViewerPlus';
export const DOCK_ICON = 'bookmark';
export const DOCK_SIZE = 200;
export const ALLOWED_DOCKS = ['left', 'right'];
export const ACTION = {
  MODIFIED: 'modified',
  DELETED: 'deleted',
  RENAMED: 'renamed'
};
export const MESSAGES = {
  CONTEXT: {
    NOT_A_PROJECT: 'NOT_A_PROJECT',
    NO_VALID_PROJECT_ID: 'NO_VALID_PROJECT_ID'
  },
  EMITTER: {
    BAD_LEGACY_CONTENT: 'Bad legacy database content.',
    NO_LEGACY_DB: 'No legacy database file found.'
  }
};
export const EMITTER = {
  ERROR: 'did-error',
  CHANGE_CONTENT: 'did-change-content'
};
