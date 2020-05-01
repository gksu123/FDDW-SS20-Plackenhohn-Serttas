#!/usr/bin/env node
var request = require('request');
const fetch = require('node-fetch');
var amqp = require('amqplib/callback_api');

//let apiKey = '09d42d940cc979f914409599ef6b7251';
  
let cities= []
getcities()
sendWeather()

function getcities() {
  amqp.connect('amqp://urqhfjsh:De4vJ6bu15evWfugZUfdgi2nxrVvUSun@kangaroo.rmq.cloudamqp.com/urqhfjsh', function(error0, connection) {
  
      if (error0) {
        throw error0;
      }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        var exchange = 'cities';

        channel.assertExchange(exchange, 'fanout' , {
          durable: false
        });

        channel.assertQueue('weather-monitor', {
          exclusive: true
        }, function(error2, q) {
          if (error2){
            throw error2;
          }

          channel.bindQueue(q.queue, exchange, 'weather-monitor');

          channel.consume(q.queue, function(msg) {
            if (msg.content) {
              cities.push(msg.content.toString())
            }
          },{
            noAck: true
          });
          });
        });
      });
  }

function sendWeather() {
  amqp.connect('amqp://urqhfjsh:De4vJ6bu15evWfugZUfdgi2nxrVvUSun@kangaroo.rmq.cloudamqp.com/urqhfjsh', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = 'data';

      channel.assertExchange(exchange, 'topic', {
        durable: false
      });

      let exchange1='data_combine';
      channel.assertExchange(exchange, 'topic', {
        durable : false
      });

      setInterval(() => {
        async function getWeather() {
          if(cities.length == 0) {
            console.log( '[weather] waiting...')
          }
          else{
            console.log('')
            for(ans of cities) {
            await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ans}&units=imperial&appid=09d42d940cc979f914409599ef6b7251`, {
              'method' : 'GET' , })
              .then(data => {
                return data.text()
              })
              .then(text => {
                channel.publish(exchange, '' + ans.toLowerCase(), Buffer.from(text));
                console.log("[weather] sent weather-monitor-data from " + ans );
                console.log("");
              })
            }
          }
        }
        getWeather()
      }, 6000)
      
      channel.assertQueue('', {
        exclusive:true
      }, function (error2, q){
        if (error2){
          throw error2;
        }
        console.log(' [*] Waiting for data. To exit press CTRL+C');
  
        channel.bindQueue(q.queue, exchange, '#');
  
          channel.consume(q.queue, function(msg) {
            console.log("[x] Get data");
  
            senddata(msg.fields.routingKey, msg.content.toString(), channel, exchange1)
          },{
            noAck: true
          });
        });
  })
})

    function senddata(key, content, channel, exchange){
      channel.publish(exchange, key, Buffer.from(content));
      console.log("[x] Sent data");
      console.log("");
    }
  }


