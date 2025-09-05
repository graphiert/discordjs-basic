const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ephemeral")
    .setDescription("Shows example of Ephemeral message.")
    .addStringOption((option) =>
      option.setName("message").setDescription("Drop a message here."),
    ),
  async execute(interaction) {
    const message = interaction.options.getString("message");

    if (!message) {
      await interaction.reply({
        content: "This is an example of Ephemeral message.",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content:
          "This is an example of Ephemeral message with a secret message:\n" +
          message,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
