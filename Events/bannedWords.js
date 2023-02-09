const { Events } = require('discord.js');

// Liste mit gesperrten Wörtern
const bannedWords = require('../words.yml');

/*
    function HashMap() {
    const map = {};

    map["Key1"] = "Value1";
    map["Key2"] = "Value2";
    map["Key3"] = "Value3";

    return map;
}
*/
//  async('message', message ) => {
//     // Überprüfen, ob eines der gesperrten Wörter in der Nachricht enthalten ist
//     for (let i = 0; i < bannedWords.length; i++) {
//         if (message.content.includes(bannedWords[i])) {
//             // Löschen der Nachricht
//             await message.delete();
//             // Senden einer Benachrichtigung an den Benutzer
//             await message.reply('Deine Nachricht enthielt unangemessene Sprache und wurde gelöscht.');
//             return;
//         }
//     }
// });
