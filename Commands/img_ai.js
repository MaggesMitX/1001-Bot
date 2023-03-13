const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const axios = require("axios");
const { openAiKey } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imagine')
        .setDescription(
            'Lässt Dir von OpenAI ein Bild generieren'
        )
        .addStringOption((option) =>
            option
                .setName('beschreibung')
                .setDescription(
                    'Bildbeschreibung, lass deinen Gefühlen freien lauf...'
                )
        ),
    async execute(interaction) {
        const args = interaction.options.get('beschreibung')?.value.trim();

        await interaction.deferReply();

        if (!args) {
            return interaction.editReply(
                `Keine Beschreibung gefunden!`
            );
        }

        try {
            const response = await axios.post("https://api.openai.com/v1/images/generations",
                {
                    "model": "image-alpha-001",
                    "prompt": args,
                    "num_images": 1
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${openAiKey}`
                    }
                });

            const image = response.data.data[0].url;
            const embed = new EmbedBuilder()
                .setDescription(`Bild angefordert von ${interaction.user.username}`)
                .setTitle(args)
                .setImage(image)
                .setColor('Random')
                .setTimestamp(Date.now())
            await interaction.editReply({
                embeds: [embed],
            });
        } catch (error) {
            console.error(error);
            await interaction.editReply(
                'Bei der Erstellung des Bildes ist ein Fehler aufgetreten.'
            );
        }

    },
};
