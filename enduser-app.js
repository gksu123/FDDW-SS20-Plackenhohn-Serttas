const readline = require('readline');
var request = require('request')
var amqp = require('amqplib/callback_api');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

amqp.connect('amqp://urqhfjsh:De4vJ6bu15evWfugZUfdgi2nxrVvUSun@kangaroo.rmq.cloudamqp.com/urqhfjsh', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'cities';

        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        rl.question('Bitte geben Sie ein Zielort ein: ', (ans) => {
          channel.publish(exchange, '', Buffer.from(ans));
          rl.question('Möchten Sie die Wetterdaten für Ihr Zielort haben? (y/n): ', (type) => {
            getWeather(type, ans, channel)
          });
        });
      });
});

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
      }, {
          noAck: true
      });
    });
    
  }else{
    rl.close();
    process.exit();
  }

}

