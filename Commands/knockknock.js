import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder().setName('knock').setDescription('Gibt dir einen zufälligen Witz aus'),
  async execute(interaction) {
    var jokes = [
      { name: 'Werner', answer: 'Wer nervt mich mit diesen Scherzen' },
      { name: 'Avenue', answer: 'knocked on this door before?' },
      { name: 'Ice Cream', answer: "if you don't let me in!" },
      { name: 'Adore', answer: 'is between us. Open up!' },
      { name: 'Lettuce', answer: 'in. Its cold out here!' },
      { name: 'Bed', answer: 'you can not guess who I am.' },
      { name: 'Al', answer: 'give you a kiss if you open the door.' },
      { name: 'Olive', answer: 'you!' },
      { name: 'Abby', answer: 'birthday to you!' },
      { name: 'Rufus', answer: 'the most important part of your house.' },
      { name: 'Cheese', answer: 'a cute girl.' },
      { name: 'Wanda', answer: 'hang out with me right now?' },
      { name: 'Ho-ho.', answer: 'You know, your Santa impression could use a little work.' },
      { name: 'Mary and Abbey.', answer: 'Mary Christmas and Abbey New Year!' },
      { name: 'Carmen', answer: 'let me in already!' },
      { name: 'Ya', answer: 'I’m excited to see you too!' },
      { name: 'Scold', answer: 'outside—let me in!' },
      { name: 'Robin', answer: 'you! Hand over your cash!' },
      { name: 'Irish', answer: 'you a Merry Christmas!' },
      { name: 'Otto', answer: 'know whats taking you so long!' },
      { name: 'Needle', answer: 'little help gettin in the door.' },
      { name: 'Luke', answer: 'through the keyhole to see!' },
      { name: 'Justin', answer: 'the neighborhood and thought Id come over.' },
      { name: 'Europe', answer: 'No, you are a poo' },
      { name: 'To', answer: 'To Whom.' },
      { name: 'Wiebke', answer: 'Wie bekomm ich die Tür auf' },
      { name: 'Mikey', answer: 'doesnt fit through this keyhole' },
    ];
    //choosing a random joke from the array

    var knock = function () {
      var joke = jokes[Math.floor(Math.random() * jokes.length)];
      return formatJoke(joke);
    };
    //Formatting the output to return in a new line and plug in the output variables
    function formatJoke(joke) {
      return ['Knock, knock.', 'Wer ist da?', joke.name + '.', joke.name + ' wer?', joke.name + ' ' + joke.answer].join(
        '\n'
      );
    }
    await interaction.reply(knock());
  }, // interaction F
};
