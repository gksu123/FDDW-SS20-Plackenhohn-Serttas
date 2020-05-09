#!/usr/bin/env node
var request = require('request');
const fetch = require('node-fetch');
var amqp = require('amqplib/callback_api');

let str
let city = []
getcity()
sendTraffic()

function getcity() {
  amqp.connect('amqp://urqhfjsh:De4vJ6bu15evWfugZUfdgi2nxrVvUSun@kangaroo.rmq.cloudamqp.com/urqhfjsh', function(error0, connection) {
  
      if (error0) {
        throw error0;
      }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        var exchange = 'city';
//    var exchange = 'traffic-monitor';

        channel.assertExchange(exchange, 'fanout' , {
          durable: false
        });

        channel.assertQueue('traffic-monitor', {
          exclusive: true
        }, function(error2, q) {
          if (error2){
            throw error2;
          }

          channel.bindQueue(q.queue, exchange, 'traffic-monitor');

          channel.consume(q.queue, function(msg) {
          //  console.log(msg.content)
            if (msg.content) {
              str = msg.content.toString().split(",")
           //   let ans = str[1]
           //   city.push({ans,"ctime":0})
              city.push(msg.content.toString())
            }
          },{
            noAck: true
          });
          });
        });
      });
  }

function sendTraffic() {
  amqp.connect('amqp://urqhfjsh:De4vJ6bu15evWfugZUfdgi2nxrVvUSun@kangaroo.rmq.cloudamqp.com/urqhfjsh', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
 /*     var exchange = 'data';

      channel.assertExchange(exchange, 'topic', {
        durable: false
      });*/

      let exchange='data_combine';
      channel.assertExchange(exchange, 'fanout', {
        durable : false
      });

     let ctime = 0.0; 

      setInterval(() => {
        async function getTraffic() {
          if(city.length == 0) {
            console.log( 'waiting for data...')
          }
          else{
            console.log('')
            let ans3 = str[2];
            for(ans of city) {
    //          await fetch(`https://graphhopper.com/api/1/route?point=50.9395,6.977547&point=50.938811,7.008111&vehicle=${ans3}&locale=de&calc_points=true&key=061864de-5ff2-43a3-abbd-a26d08e0284c`)
                await fetch(`https://graphhopper.com/api/1/route?point=52.3127,13.2437&point=50.44,7.6&vehicle=${ans3}&locale=de&calc_points=true&key=061864de-5ff2-43a3-abbd-a26d08e0284c`)
              .then(data => {
                return data.json()
              })
              .then(out => {
                let time = out.paths[0].time/(1000*60*60)
                if(time != ctime){
                  ctime = time
                  console.log("[#] Sent traffic data for " + ans);
                  console.log(out.paths[0].distance/1000 + ' km')
                  console.log(out.paths[0].time/(1000*60*60) + ' h')
          //      channel.publish(exchange, ans, Buffer.from((out.paths[0].distance/1000).toString()));
                channel.publish(exchange, ans, Buffer.from((out.paths[0].time/(1000*60*60)).toFixed(3).toString()));
              }
              else {
                  console.log('Wait...')
              } 

                console.log("");

              //  process.exit();
              })
            }
          }
        }
        getTraffic()
      }, 10000)
      
      channel.assertQueue('', {
        exclusive:true
      }, function (error2, q){
        if (error2){
          throw error2;
        }
        console.log(' [*] Waiting for data. To exit press CTRL+C');
  
        channel.bindQueue(q.queue, exchange, '#');
  
          channel.consume(q.queue, function(msg) {
      //      console.log(msg)
            console.log("[x] Get");
  
    //        sendData(msg.fields.routingKey, msg.content.toString(), channel, exchange)
          },{
            noAck: true
          });
        });
  })
})

    function sendData(key, content, channel, exchange){
 //     channel.publish(exchange, key, Buffer.from(content));
      console.log("[x] Sent");
      console.log("");
    }
  }


