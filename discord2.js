const Discord = require('discord.js');
const client = new Discord.Client();
const token = "NzA1ODU1ODEyNDI1NDgyMzIx.XqxxrQ.t-KFreCTNCVuOkYC96WiM******"

client.login(token)

client.on('ready', () => {
    console.log('Bot ist online!')
});

client.on("message", function(message) {
    if (message.content === "hi"){
            message.channel.send('Hey, guck dir die Wetterdaten an!')
            .catch(console.error);
     
    }

});
