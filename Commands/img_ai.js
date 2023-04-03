import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';
import * as data from '../config.json' assert { type: 'json' };

export default {
  data: new SlashCommandBuilder()
    .setName('imagine')
    .setDescription('Lässt dir von OpenAI ein Bild generieren')
    .addStringOption((option) =>
      option
        .setName('beschreibung')
        .setDescription('Bildbeschreibung, lass deinen Gefühlen freien lauf...')
        .setRequired(true)
    ),
  async execute(interaction) {
    const args = interaction.options.get('beschreibung')?.value.trim();

    await interaction.deferReply();

    if (!args) {
      await interaction.editReply('Es wurde keine Beschreibung angegeben!');
      return;
    }

    try {
      const url = 'https://api.openai.com/v1/images/generations';

      const body = {
        model: 'image-alpha-001',
        prompt: args,
        num_images: 1,
      };

      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${data.default.openAiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const imageUrl = await rawResponse.json();

      if (imageUrl.error) {
        await interaction.editReply('Die KI ist derzeit nicht erreichbar, versuche es später erneut!');
        return;
      }

      const embed = new EmbedBuilder()
        .setDescription(`Bild angefordert von ${interaction.user.username}`)
        .setTitle(args)
        .setImage(imageUrl.data[0].url)
        .setColor('Random')
        .setTimestamp(Date.now());

      await interaction.editReply({
        embeds: [embed],
      });

    } catch (error) {
      console.error(error);
      await interaction.editReply('Bei der Erstellung des Bildes ist ein Fehler aufgetreten.');
    }
  },
};
