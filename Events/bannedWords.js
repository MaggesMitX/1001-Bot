const { Events } = require('discord.js');

// Liste mit gesperrten Wörtern
const bannedWords = require('words.yml');

await ('message', message => {
    // Überprüfen, ob eines der gesperrten Wörter in der Nachricht enthalten ist
    for (let i = 0; i < bannedWords.length; i++) {
        if (message.content.includes(bannedWords[i])) {
            // Löschen der Nachricht
            message.delete();
            // Senden einer Benachrichtigung an den Benutzer
            message.reply('Deine Nachricht enthielt unangemessene Sprache und wurde gelöscht.');
            return;
        }
    }
});
