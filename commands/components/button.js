const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  MessageFlags,
} = require("discord.js");
const ephemeral = require("./ephemeral");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buttons")
    .setDescription("Shows examples of Discord buttons."),
  async execute(interaction) {
    const button1 = new ButtonBuilder()
      .setLabel("Reply")
      .setCustomId("button1")
      .setStyle(ButtonStyle.Primary);

    const button2 = new ButtonBuilder()
      .setLabel("Edit")
      .setCustomId("button2")
      .setStyle(ButtonStyle.Secondary);

    const button3 = new ButtonBuilder()
      .setLabel("Follow Up")
      .setCustomId("button3")
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(button1, button2, button3);

    const response = await interaction.reply({
      content: "This is examples of Discord buttons.",
      components: [row],
      withResponse: true,
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const cont = await response.resource.message.awaitMessageComponent({
        filter: collectorFilter,
        time: 60_000,
      });
      switch (cont.customId) {
        case "button1":
          await cont.reply({
            content:
              "Message replied. This is sent because you select Reply option",
            components: [],
            ephemeral: true,
          });
          await interaction.editReply({
            content: "This is examples of Discord buttons.",
            components: [],
          });
          break;
        case "button2":
          await interaction.editReply({
            content:
              "Mesage edited. This message is edited because you select Edit option.",
            components: [],
          });
          break;
        case "button3":
          await cont.deferReply({
            ephemeral: true,
          });
          await cont.followUp({
            content:
              "Message replied. This message is edited because you select Follow Up option.",
            components: [],
          });
          await interaction.editReply({
            content: "This is examples of Discord buttons.",
            components: [],
          });
          break;
      }
    } catch (err) {
      await interaction.editReply({
        content: "Expired.",
        components: [],
      });
    }
  },
};
