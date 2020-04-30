#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://urqhfjsh:De4vJ6bu15evWfugZUfdgi2nxrVvUSun@kangaroo.rmq.cloudamqp.com/urqhfjsh', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'hello';
        var msg = body;

        channel.assertQueue(queue, {
          durable: false
      });
      channel.sendToQueue(queue, Buffer.from(msg));    

    const readline = require('readline');
    var request = require('request')
      
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
      
    const question = 'Bitte geben Sie ein Land oder eine Stadt ein: '; async function mainFlow() {
      let ans = await askAnything(question);
      console.log('');
      
      let apiKey = '09d42d940cc979f914409599ef6b7251'
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${ans}&units=imperial&appid=${apiKey}`
      
      request({
        url: url,
        json: true
      }, function (error, response, body) {
        if (error) {
          console.log('error:', error);
        } else {
          (!error && response.statusCode === 200)
          console.log(body)
          console.log('Sie haben ausgewählt: ' + ans);
          rl.close();
          process.exit();
        }
      })
    }

    function askAnything(question) {
      return new Promise((resolve, reject) => {
        if (question == null) {
          reject(new Error('Sie müssen eine Frage angeben'));
        }
        else {
          rl.question(question, (answer) => resolve(answer));
        }
      })
    }
    mainFlow();

 

    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
