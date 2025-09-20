const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("React Message")
    .setType(ApplicationCommandType.Message),
  async execute(interaction) {
    await interaction.targetMessage.react("👍");
    await interaction.reply({
      content: "Message reacted with 👍.",
      ephemeral: true,
    });
  },
};
