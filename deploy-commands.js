const { REST, Routes } = require("discord.js");
require("dotenv").config();

const commands = [];
const loadCommands = require("./utils/load-commands");
loadCommands(function (command) {
  commands.push(command.data.toJSON());
});

const rest = new REST().setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application commands.`);

    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      {
        body: commands,
      },
    );

    console.log(`Successfully reloaded ${data.length} application commands.`);
  } catch (error) {
    console.error(error);
  }
})();
