const readline = require('readline');
var request = require('request')
var amqp = require('amqplib/callback_api');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Discord = require('discord.js');
const client = new Discord.Client();
const discordChannel = client.channels.cache.get('705755327970279428');
const token = 'NzA2MTc5MDMxNzkxNDM1ODQ4.XrWPjg.ZwPI13BcVPUvk3Tt5-DR7PyBzPg';
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


    client.login(token)

    client.on('ready', () => {
        console.log('Bot ist online!')
    });

   client.on("message", function(message) {
        var msgArray = message.content.toString().split(' ')
    //    msgArray[0] = '/subscribe'
     if(msgArray[0] === '/subscribe' || msgArray[0] === '/abonnieren' || msgArray[0] === '/channel'){
       const daten = {
         Startort: msgArray[1],
         Zielort: msgArray[2],
         Vmittel: msgArray[3]
       };
    //   channel.publish(exchange, daten.Zielort, Buffer.from(daten.Zielort));
       channel.publish(exchange, daten.Zielort, Buffer.from(`${daten.Startort},${daten.Zielort},${daten.Vmittel}`))
      }
    });

    //WETTER
    var exchange1 = 'weather-monitor';

    /*    console.log('');
        console.log('Jetzt kommen die Wetterdaten');
        console.log('Sie haben ausgewählt: ' + daten.Startort);*/
       
        channel.assertExchange(exchange1, 'fanout', {
          durable: false
        });
    
        channel.assertQueue('', {
          exclusive: true
        }, function(error2, q) {
          if (error2) {
              throw error2;
          }
          console.log(' [*] Waiting for logs. To exit press CTRL+C');
    
          channel.bindQueue(q.queue, exchange1, '');
          
     //     channel.publish(exchange1, daten.Zielort, Buffer.from(daten.Zielort));
    
          channel.consume(q.queue, function(msg) {
           //   console.log(msg)
              console.log(" [x] current weather in %s: '%s°C'", msg.fields.routingKey, msg.content.toString());
        //      console.log(msg.toString())
        
  //  if(msgArray[0] + daten){
  //  channel.send('hallooooooo');
          client.channels.cache.get('705755327970279428').send('Es wurden folgende Daten abgefragt: ' + msg.fields.routingKey )
          client.channels.cache.get('705755327970279428').send('Wetter aktuell: '+ msg.content.toString()+' °C')
            .catch(console.error);
  //  }
});
 
   }, {
       noAck: true
   });
  
   //TRAFFIC
   var exchange3 = 'data_combine';
     channel.assertExchange(exchange3, 'fanout', {
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

       channel.consume(q.queue, function(msg) {
   //      console.log(msg)
     /*        if (msg.content) {
               str = msg.content.toString().split(",")
             }*/
           console.log('')
    //     console.log(" [x] current distance is: '%s'", msg.content.toString() + ' km')
           console.log(" [x] current time is: '%s'", msg.content.toString() + ' h')

 
              client.channels.cache.get('705755327970279428').send('Es wurden folgende Daten abgefragt: ' + msg.fields.routingKey)
              client.channels.cache.get('705755327970279428').send('Zeit: '+ msg.content.toString()+' Stunden')
               .catch(console.error);
           });
       }, {
           noAck: true
       });




});
});
