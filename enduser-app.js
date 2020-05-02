const readline = require('readline');
var request = require('request')
var amqp = require('amqplib/callback_api');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Discord = require('discord.js');
const client = new Discord.Client();
const token = "NzA1ODU1ODEyNDI1NDgyMzIx.XqxxrQ.t-KFreCTNCVuOkYC96WiM8QLpW4"




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

    
 /*       r1.question('Bitte geben Sie ein Startort ein: '), (ans2) => {

        }
        r1.question('Geben Sie ein Verkehrsmittel ein: ')  
*/
        rl.question('Bitte geben Sie ein Zielort ein: ', (ans) => {
          channel.publish(exchange, '', Buffer.from(ans));
          rl.question('Möchten Sie die Wetterdaten für Ihr Zielort haben? (y/n): ', (type) => {
            getWeather(type, ans, channel)
      /*    r1.question('Möchten Sie die Verkehrsinfos anzeigen lassen? (y/n): '), (type2) => {
            getMap(type2, ans ,channel)
           }*/
          });
        });
      });
});

/*
function getMap(type2, ans, channel){


}
*/





function getWeather(type, ans, channel){
  var exchange1 = 'data_combine';
  if(type == 'y')
  {
    console.log('Jetzt kommen die Wetterdaten: ');
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
                     
          //DISCORD
          client.login(token)

          client.on('ready', () => {
              console.log('Bot ist online!')
          });

          client.on("message", function() {
                      message.channel.send('Es wurden folgende Daten abgefragt: ' + msg.fields.routingKey)
          //            message.channel.send(msg.content.toString())
                      message.channel.send(msg.content.toString())
                      .catch(console.error);
          });

      }, {
          noAck: true
      });
    });

    }else{
      rl.close();
      process.exit();
    }
}

