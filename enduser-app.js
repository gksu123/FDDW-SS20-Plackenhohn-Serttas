const readline = require('readline');
var request = require('request')
var amqp = require('amqplib/callback_api');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzA2MTc5MDMxNzkxNDM1ODQ4.XrAzNA.OZbE_***************';
// token Ende rDwX-CY2vUkgN309s489wQ


amqp.connect('amqp://urqhfjsh:De4vJ6bu15evWfugZUfdgi2nxrVvUSun@kangaroo.rmq.cloudamqp.com/urqhfjsh', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'city';

        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        rl.question('Bitte geben Sie ein Startort ein: ', (ans2) => {
          rl.question('Bitte geben Sie ein Zielort ein: ', (ans) => {
         //     channel.publish(exchange, '', Buffer.from(ans));

          rl.question('Bitte geben Sie [weather] für Wetterdaten oder [traffic] für Verkehrsinfos ein: ', (type) => {
            if(type === 'weather'){
              getWeather(type, ans, channel)
            }else if(type === 'traffic'){ 
              rl.question('Geben Sie ein Verkehrsmittel ein: '  , (ans3) => {                 
              getMap(type, ans, ans2, ans3, channel)
              })
            }else{
              console.log('');
              console.log('Ungültige Eingabe! Bitte versuchen Sie es erneut.');
              console.log('');
              process.exit();
            }
          }); 
       });       
    })
      });
});



function getMap(type, ans, ans2, ans3, channel){
  var exchange3 = 'traffic-monitor';
  //if(type2 === 'y')
  //{
    console.log('');
    console.log('Jetzt kommen die Verkehrsinfos ');
    console.log('Ihre Route: ' + ans2 + ' nach ' + ans );
   
    channel.assertExchange(exchange3, 'topic', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
          throw error2;
      }
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      channel.bindQueue(q.queue, exchange3, '');
      
      channel.publish(exchange3, '', Buffer.from(`${ans2},${ans},${ans3}`))

      channel.consume(q.queue, function(msg) {
          console.log(" [x] Sent %s:'%s'", msg.fields.routingKey, msg.content.toString());
                    
          //DISCORD
          client.login(token)

          client.on('ready', () => {
              console.log('Bot ist online!')
          });

          client.on("message", function(message) {
            if(message.content === 'subscribe' || message.content === 'abonnieren' || message.content === 'channel'){
              message.channel.send('Es wurden folgende Daten abgefragt: ' + msg.fields.routingKey)
              message.channel.send(msg.content.toString())
              .catch(console.error);
            }
          });
      }, {
          noAck: true
      });
    });
/*  }else if(type2 === 'n'){
    rl.close();
    process.exit();*/
//  }else{
  //    console.log("Keine gültige eingabe!");
//      rl.close();
//      process.exit();
//    }
}

function getWeather(type, ans, channel){
  var exchange1 = 'data_combine';
//  if(type == 'weather')
//  {
    console.log('');
    console.log('Jetzt kommen die Wetterdaten');
    console.log('Sie haben ausgewählt: ' + ans);
   
    channel.assertExchange(exchange1, 'topic', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
          throw error2;
      }
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      channel.bindQueue(q.queue, exchange1, ans);

      
      channel.consume(q.queue, function(msg) {
          console.log(" [x] Sent %s:'%s'", msg.fields.routingKey, msg.content.toString());
    //      console.log(msg)
                     
          //DISCORD
          client.login(token)

          client.on('ready', () => {
              console.log('Bot ist online!')
          });

          client.on("message", function(message) {
            if(message.content === 'subscribe' || message.content === 'abonnieren' || message.content === 'channel'){
              message.channel.send('Es wurden folgende Daten abgefragt: ' + msg.fields.routingKey )
              message.channel.send(msg.content.toString())
              .catch(console.error);
            }
          });

      }, {
          noAck: true
      });
    });

/*  }else if(type2 === 'n'){
    rl.close();
    process.exit();*/
/*  }else{
//      console.log("Keine gültige eingabe!");
      rl.close();
      process.exit();
    }*/
}
