import { readFile, writeFile } from 'node:fs/promises'

export const readJsonFile = async (filePath) => {
  const contents = await readFile(filePath, { encoding: 'utf8' });

  return JSON.parse(contents)
}

export const writeJsonFile = async (filePath, data) => {
  await writeFile(filePath, JSON.stringify(data, null, 2));

  return true
}
