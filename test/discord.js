const Discord = require('discord.js');
const client = new Discord.Client();
const token = "NzA1NzkzMjczOTU2MDA4MDA3.Xqw3Xw.onql5MIAD0RyxoGZSSrJzGu0eb4";

client.login(token);

client.on("message", message => {
  message.channel.send("Hallo");
});

client.on('ready', () => {
  var testChannel = client.channels.cache.find(channel => channel.id === '705755327970279425');

  console.log("The bot is logged in.");
});

  client.on('message', testChannel => {
    
//   setInterval(() => {
    testChannel.channel.send("Hallo! Das ist eine Message die im Intervall sendet.");
//   process.exit();
//  }, 3000);
});


/*client.on('message', message => {

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
        message.channel.send("Hey!" + 'Kim_Uni');
      }
    }
  });

  function checkCommand(message,commandName)
  {
    return message.content.toLowerCase().startsWith("?" + commandName);
  }

*/
