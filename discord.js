const Discord = require('discord.js');
const client = new Discord.Client();
const token = "NzA1NzAwMDk5NzExMzAzNjgx.XqwTAw.UBYX0z4c9fHVgGdh1uAFRbKyOic";

client.login(token);


client.on('ready', () => {
  var testChannel = client.channels.cache.find(channel => channel.id === '705755327970279425');

  console.log("The bot is logged in.")

  setInterval(() => {
    testChannel.send("Hallo! Das ist eine Message die im Intervall sendet.");
  }, 5000);
});

client.on('message', message => {

  if (message.author.bot) return;

  if (checkCommand(message, "help"))
  {
    message.channel.send("You triggered the help command.");
  }
  else if (checkCommand(message, "roles"))
  {
    message.channel.send("here is a list of all of the available server roles.");
  }
  else if (checkCommand(message, "img"))
  {
    message.channel.send("Here is an image");
  }
  else if(checkCommand(message,"google"))
  {
    message.channel.send("Googling...");
  }
    else{

      if(message.content.toLowerCase() === 'hallo')
      {
        message.author.send("Hey!");
        message.channel.send("Hey!" + message.author);
      }
    }
  });

  function checkCommand(message,commandName)
  {
    return message.content.toLowerCase().startsWith("?" + commandName);
  }


