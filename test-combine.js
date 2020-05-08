const readline = require('readline');
var request = require('request')
var amqp = require('amqplib/callback_api');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzA2MTc5MDMxNzkxNDM1ODQ4.XrQGDw.sKF2YRmtqmQtiDVYE-*****';
// token Ende jl6iNTEO4


/*
*
*
* DIES IST EINE TESTDATEI // IN DER DATEI KANN MAN DIE EINGABE ÜBER DISCORD MACHEN
*
*
*/


let str

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
         //     channel.publish(exchange, ans, Buffer.from(ans));

          rl.question('Bitte geben Sie [weather] für Wetterdaten oder [traffic] für Verkehrsinfos ein: ', (type) => {
            if(type === 'weather'){
              channel.publish(exchange, ans, Buffer.from(ans));
              getWeather(ans, channel)
            }else if(type === 'traffic'){ 
              rl.question('Geben Sie ein Verkehrsmittel ein: '  , (ans3) => {   
              channel.publish(exchange, ans, Buffer.from(`${ans2},${ans},${ans3}`))              
              getMap(ans, ans2, ans3, channel)
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


function getMap(ans, ans2, ans3, channel){
  var exchange3 = 'data_combine';
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

      channel.bindQueue(q.queue, exchange3, ans);
      
  //    channel.publish(exchange3, ans, Buffer.from(`${ans2},${ans},${ans3}`))

      channel.consume(q.queue, function(msg) {
  //      console.log(msg)
    /*        if (msg.content) {
              str = msg.content.toString().split(",")
            }*/
          console.log('')
          console.log(` [x] destination: from ${ans2} to ${ans} by ${ans3}`);
  //        console.log(" [x] current traffic news in %s: '%s'", msg.fields.routingKey, msg.content.toString())
          console.log(" [x] current time is: '%s'", msg.content.toString() + ' h')

          //DISCORD
          client.login(token)

           client.on('ready', () => {
               console.log('Bot ist online!')
           });

          client.on("message", function(message) {
            var msgArray = message.toString().split(' ')
            msgArray[0] = '/subscribe'
        //    if(msgArray[0] === '/subscribe' || msgArray[0] === '/abonnieren' || msgArray[0] === '/channel'){
              const daten = {
                Startort: msgArray[1],
                Zielort: msgArray[2],
                Vmittel: msgArray[3]
              };
        //      console.log(daten)
        //      console.log(msg.content.toString())

        //  if (message.content === (msgArray[0] + daten.Startort + daten.Zielort + daten.Vmittel)){
              if(msgArray[0] + daten){
                    message.channel.send('Es wurden folgende Daten abgefragt: ' + msg.fields.routingKey )
                    message.channel.send('Zeit: '+ msg.content.toString()+' h')
                    .catch(console.error);
              }
          });
      }, {
          noAck: true
      });
    });
  }

  
function getWeather(ans, channel){
  var exchange1 = 'weather-monitor';

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
      
  //    channel.publish(exchange1, ans, Buffer.from(ans));

      channel.consume(q.queue, function(msg) {
          console.log(" [x] current weather in %s: '%s°C'", msg.fields.routingKey, msg.content.toString());
    //      console.log(msg.toString())
                     
          //DISCORD
          client.login(token)

           client.on('ready', () => {
               console.log('Bot ist online!')
           });

          client.on("message", function(message) {
            var msgArray = message.toString().split(' ')
            msgArray[0] = '/subscribe'

              const daten = {
                Startort: msgArray[1],
                Zielort: msgArray[2],
                Vmittel: msgArray[3]
              };

              if(msgArray[0] + daten){
                    message.channel.send('Es wurden folgende Daten abgefragt: ' + msg.fields.routingKey )
                    message.channel.send('Wetter aktuell: '+ msg.content.toString() + '°C')
                    .catch(console.error);
              }
          });

      }, {
          noAck: true
      });
    });
  }