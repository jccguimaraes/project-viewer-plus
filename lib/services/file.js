import { File } from 'atom';

/**
 * Helper function to read a file
 * @param {string} filePath the full path of the file to readFile
 * @returns {Object|Error}
 */
export const readFile = async filePath => {
  const file = new File(filePath);
  const exists = await file.exists();

  if (!exists) {
    throw Error();
  }

  const content = await file.read(true);

  if (!content) {
    throw Error();
  }

  try {
    return JSON.parse(content);
  }
  catch (err) {
    return { groups: [], projects: [] };
  }
};
