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
export const EMITTER = {
  ERROR: 'did-error',
  CHANGE_CONTENT: 'did-change-content'
};
