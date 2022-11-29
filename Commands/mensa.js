const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mensa')
    .setDescription('Zeigt dir die heutigen Gerichte der Mensa an!')
    .addStringOption((option) =>
      option.setName('datum').setDescription('Das Datum zu welchem Gerichte gesucht werden sollen z.B. 2022-11-28')
    ),
  async execute(interaction) {
    fetchMensaData();
    await interaction.deferReply();

    const specifiedDate = interaction.options.get('datum')?.value.trim() || new Date().toJSON().slice(0, 10);
    const dishes = await fetchMensaData(specifiedDate);

    // if (dishes.length === 0)
    //   return interaction.reply(`Für das Datum ${specifiedDate} wurden leider keine Gerichte gefunden!`);

    const embed = new EmbedBuilder()
      .setTitle('Mensa-Gerichte')
      .setDescription(`Gerichte in der Mensa am ${specifiedDate}`)
      .setColor('#69ff7a')
      .setTimestamp(Date.now());

    for (const dish in dishes) {
      embed.addFields({
        name: dishes[dish].name,
        value: `${dishes[dish].description}\n${dishes[dish].price}`,
        inline: false,
      });
    }

    await interaction.editReply({
      embeds: [embed],
    });
  },
};

async function fetchMensaData(date) {
  const dishes = [];

  const response = await fetch(`https://www.kstw.de/speiseplan?t=${date}&l=22`);
  const mensaData = await response.text();

  const mensaDOM = cheerio.load(mensaData);
  mensaDOM('[data-location="22"] .col-8 .tx-epwerkmenu-menu-meal-title').each((index, element) => {
    const description = mensaDOM('[data-location="22"] .col-8 .tx-epwerkmenu-menu-meal-description')[
      index
    ].children[0].data.trim();

    const price = mensaDOM('[data-location="22"] .col-8 .text')
      [index].children[2].data.replace(/[\r\n]/gm, '')
      .trim();

    dishes[element.children[0].data.trim()] = {
      name: element.children[0].data.trim(),
      description,
      price,
    };
  });

  return dishes;
}
