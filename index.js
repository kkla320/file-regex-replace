const core = require('@actions/core');
const fs = require('fs').promises;
const path = require("path");

try {
    const regex = new RegExp(core.getInput('regex'), core.getInput('flags'));
    const replacement = core.getInput('replacement');
    const dir = core.getInput('dir');

    let contents = await fs.readdir(dir);
    for (const content of contents) {
      const oldPath = path.join(dir, content);
      const isDirectory = await fs.stat(oldPath).isDirectory;
      if (isDirectory) {
        continue;
      }

      const newFileName = content.replace(regex, replacement);
      console.log(`Attempting to rename ${oldPath} to ${newPath}`);
      const newPath = path.join(dir, newFileName);
      await fs.rename(oldPath, newPath)
    }
  } catch (error) {
    core.setFailed(error.message);
  }
