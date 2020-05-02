const Discord = require('discord.js');
const client = new Discord.Client();
const token = "NzA1ODU1ODEyNDI1NDgyMzIx.XqxxrQ.t-KFreCTNCVuOkYC9**********";

client.login(token)

client.on('ready', () => {
    console.log('Bot ist online!')
});

client.on("message", function(message) {
    if (message.content === "hi"){
        var interval = setInterval (function () {
            message.channel.send('Hallo')
            .catch(console.error);
        }, 5000);
    }

});
