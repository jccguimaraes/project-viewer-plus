import { File } from 'atom';

const checkFile = async filePath => {
  const file = new File(filePath);
  const exists = await file.exists();

  if (!exists) {
    throw Error();
  }

  return file;
};

/**
 * Helper function to save a file
 * @param {string} filePath the full path of the file to saveFile
 * @param {string} content the current serialized state
 * @returns {Object|Error}
 */
export const saveFile = async (filePath, content) => {
  const file = await checkFile(filePath);

  await file.write(content);
};

/**
 * Helper function to read a file
 * @param {string} filePath the full path of the file to readFile
 * @returns {Object|Error}
 */
export const readFile = async filePath => {
  const file = await checkFile(filePath);

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
