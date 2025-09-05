const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ComponentType,
} = require("discord.js");
const { execute } = require("./ephemeral");
const { ActionRowBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("select")
    .setDescription("Shows example of Discord select."),
  async execute(interaction) {
    const select = new StringSelectMenuBuilder()
      .setCustomId("size")
      .setPlaceholder("What is your clothes size?")
      .addOptions(
        new StringSelectMenuOptionBuilder().setLabel("Small").setValue("s"),
        new StringSelectMenuOptionBuilder().setLabel("Medium").setValue("m"),
        new StringSelectMenuOptionBuilder().setLabel("Large").setValue("l"),
      );

    const row = new ActionRowBuilder().addComponents(select);

    const response = await interaction.reply({
      content: "Can you help me to fill this?",
      components: [row],
      withResponse: true,
    });

    const collector = response.resource.message.createMessageComponentCollector(
      { componentType: ComponentType.StringSelect, time: 3_600_000 },
    );

    collector.on("collect", async (i) => {
      const selection = i.values[0];
      await i.reply(`${i.user} has selected ${selection}!`);
    });
  },
};
