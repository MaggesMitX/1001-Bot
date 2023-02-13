
const { Configuration, OpenAIApi } = require("openai");
const { openAiKey } = require('../config.json');
const {SlashCommandBuilder} = require("discord.js");
const {options} = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ai')
        .setDescription(
            'Frage GPT nach deinen Bedürfnissen'
        )
        .addStringOption((option) =>
            option
                .setName('frage')
                .setDescription(
                    'ChatGPT AI Funktion, schieß einfach drauf los...'
                )
        ),
    async execute(interaction) {
        const args = interaction.options.get('frage')?.value.trim();

        await interaction.deferReply();

        if (!args) {
            return interaction.editReply(
                `Kein Text gefunden.`
            );
        }

        try {
            const configuration = new Configuration({
                apiKey: `${openAiKey}`,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: args,
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            await interaction.editReply(response);

        } catch (error) {
            console.error(error);
            await interaction.editReply(
                'Bei der Erstellung einer Antwort ist ein Fehler aufgetreten.'
            );
        }
    }
}