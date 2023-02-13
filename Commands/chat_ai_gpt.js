
const { Configuration, OpenAIApi } = require("openai");
const { openAiKey } = require('../config.json');
const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

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
            const answer = response.data.choices[0].text;
            const embed = new EmbedBuilder()
                .setDescription(`Frage gestellt von ${interaction.user.username}`)
                .setTitle(args)
                .addFields(
                    {name:'Antwort:', value: answer}
                )
                .setColor('Random')
                .setTimestamp(Date.now())
            await interaction.editReply({
                embeds: [embed],});

            //const answer = response.data.choices[0].text;
            //await interaction.editReply(answer);

        } catch (error) {
            console.error(error);
            await interaction.editReply(
                'Bei der Erstellung einer Antwort ist ein Fehler aufgetreten.'
            );
        }
    }
}