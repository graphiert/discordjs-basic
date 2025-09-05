const fs = require("fs");
const path = require("path");

const foldersPath = path.join(__dirname, "../commands");
const commandFolders = fs.readdirSync(foldersPath);

module.exports = function (action) {
  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        action(command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
        );
      }
    }
  }
};
