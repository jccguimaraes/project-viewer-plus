export const PLUGIN_NAME = 'project-viewer-x';
export const DATABASE_FILE = 'database.json';
export const DOCK_URI = `atom://${PLUGIN_NAME}`;
export const DOCK_TITLE = 'Project Viewer';
export const DESERIALIZER = 'ProjectViewer';
export const DOCK_ICON = 'bookmark';
export const ACTION = {
  MODIFIED: 'modified',
  DELETED: 'deleted',
  RENAMED: 'renamed'
};
export const MESSAGES = {
  CONTEXT: {
    NO_PREVIOUS_PROJECT: 'NO_PREVIOUS_PROJECT',
    NOT_A_PROJECT: 'NOT_A_PROJECT',
    NO_VALID_PROJECT_ID: 'NO_VALID_PROJECT_ID'
  }
};
