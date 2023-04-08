import {SlashCommandBuilder, EmbedBuilder} from'discord.js';

export default {
    data: new SlashCommandBuilder().setName('meme').setDescription('Zufällige Memes von Reddit'),
    async execute(interaction) {
        await interaction.deferReply();

        const request = await fetch('https://www.reddit.com/r/memes/random/.json');
        if(request.status !== 200) {
            await interaction.editReply("Ich konnte keine Memes finden, versuche es später erneut!");
        }
        const memeJson = await request.json();

        const embed = new EmbedBuilder();

        const [list] = memeJson;
        const [post] = list.data.children;
        const permalink = post.data.permalink;
        const memeUrl = `https://reddit.com${permalink}`;
        const memeImage = post.data.url;
        const memeTitle = post.data.title;
        const memeUpvotes = post.data.ups;
        const memeNumComments = post.data.num_comments;

        embed.setTitle(`${memeTitle}`);
        embed.setURL(`${memeUrl}`);
        embed.setColor('Random');
        embed.setImage(memeImage);
        embed.setFooter({
            text: `👍 ${memeUpvotes} 💬 ${memeNumComments}`
        });
        await interaction.editReply({
            embeds: [embed],
        });
    },
};