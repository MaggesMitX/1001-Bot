import * as data from '../config.json' assert { type: 'json' };
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fetch from "node-fetch";

export default {
  data: new SlashCommandBuilder()
      .setName('ai')
      .setDescription('Frage 1001 nach deinen Bedürfnissen')
      .addStringOption((option) =>
          option.setName('frage').setDescription('ChatGPT AI Funktion, schieß einfach drauf los...').setRequired(true)
      ),
  async execute(interaction) {
    const args = interaction.options.get('frage')?.value.trim();

    await interaction.deferReply();

    if (!args) return interaction.editReply('Es wurde kein Text angegeben!');

    try {
      const url = 'https://api.openai.com/v1/completions';

      const body = {
        model: 'text-davinci-002',
        prompt: args,
        temperature: 0.9,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };

      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${data.default.openAiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });


      const response = await rawResponse.json();

      console.log(response);
      if (response.error) {
        await interaction.editReply('Die KI ist derzeit nicht erreichbar, versuche es später erneut!');
        return;
      }

      const answer = response.data.choices[0].text;
      const embed = new EmbedBuilder()
          .setDescription(`Frage gestellt von ${interaction.user.username}`)
          .setTitle(args)
          .addFields({ name: 'Antwort:', value: answer })
          .setColor('Random')
          .setTimestamp(Date.now())
          .setFooter({ text: 'Vielen Dank!' });
      await interaction.editReply({
        embeds: [embed],
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply('Bei der Erstellung des Bildes ist ein Fehler aufgetreten.');
    }

  },
};
