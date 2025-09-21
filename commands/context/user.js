const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("User Details")
    .setType(ApplicationCommandType.User),
  async execute(interaction) {
    const target = interaction.targetUser;
    let message = `Username: ${target.discriminator === "0" ? target.username + " (with nickname: " + target.globalName + ")" : target.username + "#" + target.discriminator}`;

    await interaction.reply(message);
  },
};
