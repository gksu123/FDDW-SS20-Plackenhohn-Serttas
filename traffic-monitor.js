#!/usr/bin/env node
var request = require('request');
const fetch = require('node-fetch');
var amqp = require('amqplib/callback_api');

// let apiKey2 = '061864de-5ff2-43a3-abbd-a26d08e0284c'; //grasshopper
// let apiKey3 = 'e54dae4da22b4a3696e10c720de2b3f8';     //geocoder
/*
let url3 = `https://api.opencagedata.com/geocode/v1/json?q=${ans}&key=e54dae4da22b4a3696e10c720de2b3f8&language=de&pretty=1`;
 
opencage.geocode({p : ans}).then(data => {
    console.log(JSON.stringify(data));
    if (data.status.code == 200) {
      if (data.results.length > 0) {
        var place = data.results[0];
        console.log(place.formatted);
        console.log(place.geometry);
        console.log(place.annotations.timezone.name);
      }
      } else if (data.status.code == 402) {
      console.log('hit free-trial daily limit');
      console.log('become a customer: https://opencagedata.com/pricing'); 
    }else {
      // other possible response codes:
      // https://opencagedata.com/api#codes
      console.log('error', data.status.message);
    }
  }).catch(error => {
    console.log('error', error.message);
  });
*/

//let str
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
              city.push(str[1])
          //    city.push(msg.content.toString())
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
      var exchange = 'data';

      channel.assertExchange(exchange, 'topic', {
        durable: false
      });

      let exchange1='data_combine';
      channel.assertExchange(exchange, 'topic', {
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
<<<<<<< HEAD
                await fetch(`https://graphhopper.com/api/1/route?point=52.3127,13.2437&point=50.44,7.6&vehicle=${ans3}&locale=de&calc_points=true&key=061864de-5ff2-43a3-abbd-a26d08e0284c`)
=======
                await fetch(`https://graphhopper.com/api/1/route?point=52.3127,13.2437&point=50.44,7.6&vehicle=car&locale=de&calc_points=true&key=061864de-5ff2-43a3-abbd-a26d08e0284c`)
>>>>>>> 70684fc0230c877713f3d765057fe85ec4e27b28
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
                channel.publish(exchange, ans, Buffer.from((out.paths[0].time/(1000*60*60)).toString()));
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
  
            sendData(msg.fields.routingKey, msg.content.toString(), channel, exchange1)
          },{
            noAck: true
          });
        });
  })
})

    function sendData(key, content, channel, exchange){
      channel.publish(exchange, key, Buffer.from(content));
      console.log("[x] Sent");
      console.log("");
    }
  }


