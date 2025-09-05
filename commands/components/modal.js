const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Shows an example of Discord modal."),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("myModal")
      .setTitle("My Modal");

    const sumInput = new TextInputBuilder()
      .setCustomId("sum")
      .setLabel("What is 9 + 11?")
      .setStyle(TextInputStyle.Short);

    const descriptionInput = new TextInputBuilder()
      .setCustomId("description")
      .setLabel("Write anything here.")
      .setStyle(TextInputStyle.Paragraph);

    const firstActRow = new ActionRowBuilder().addComponents(sumInput);
    const secondActRow = new ActionRowBuilder().addComponents(descriptionInput);

    modal.addComponents(firstActRow, secondActRow);

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    await interaction.showModal(modal);

    try {
      const modalSubmit = await interaction.awaitModalSubmit({
        filter: collectorFilter,
        time: 60_000,
      });

      const result = {
        sum: modalSubmit.fields.getTextInputValue("sum"),
        description: modalSubmit.fields.getTextInputValue("description"),
      };

      await modalSubmit.reply(JSON.stringify(result));
    } catch (err) {
      await interaction.editReply({
        content: "Expired.",
        components: [],
      });
    }
  },
};
