import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export default {
  data: new SlashCommandBuilder()
    .setName('mensa')
    .setDescription('Zeigt dir die Gerichte der Mensa zu einem bestimmten Datum an!')
    .addStringOption((option) =>
      option.setName('datum').setDescription('Das Datum zu welchem Gerichte gesucht werden sollen z.B. 2022-11-28')
    ),
  async execute(interaction) {
    fetchMensaData();
    await interaction.deferReply();

    const specifiedDate =
      interaction.options.get('datum')?.value.trim().toLowerCase() || new Date().toJSON().slice(0, 10);

    const dateIsValid = validateDate(specifiedDate);
    const convertedDate = convertDate(specifiedDate);

    if (!dateIsValid)
      return interaction.editReply(
        `${convertedDate} ist leider kein gültiges Datum! Bitte gib ein Datum im Format YYYY-MM-DD an oder 'morgen' bzw. 'übermorgen'!`
      );

    const dishes = await fetchMensaData(convertedDate);

    if (Object.keys(dishes).length === 0)
      return interaction.editReply(`Für das Datum ${convertedDate} wurden leider keine Gerichte gefunden!`);

    const embed = new EmbedBuilder()
      .setTitle('Mensa-Gerichte')
      .setDescription(`Gerichte in der Mensa am ${convertedDate}`)
      .setColor('#ffd600')
      .setTimestamp(Date.now())
      .setThumbnail('https://www.kstw.de/typo3conf/ext/ep_template_werk/Resources/Public/Icons/icon_koeln.png');

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
      [index].children[2].data.match(/([0-9]{1}\,[0-9]{2})/g)
      .map((price) => `${price}€`)
      .join(' | ');

    dishes[element.children[0].data.trim()] = {
      name: element.children[0].data.trim(),
      description,
      price,
    };
  });

  return dishes;
}

function validateDate(date) {
  if (date === 'morgen' || date === 'übermorgen') return true;

  const dateRegex = new RegExp('(?:^[0-9]{4})-(?:[0-9]{2})-(?:[0-9]{2}$)');

  return dateRegex.test(date);
}

function convertDate(date) {
  if (date !== 'morgen' && date !== 'übermorgen') return date;

  let newDate = new Date();

  date === 'morgen' ? newDate.setDate(newDate.getDate() + 1) : newDate.setDate(newDate.getDate() + 2);
  return newDate.toJSON().slice(0, 10);
}
