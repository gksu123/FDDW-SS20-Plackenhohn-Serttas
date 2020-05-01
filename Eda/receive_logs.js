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
        var exchange = 'logs';

        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        let exchange1='data_combine';
        channel.assertExchange(exchange, 'topic', {
        durable : false
        });

        channel.assertQueue('', {
            exclusive: true
        }, function(error2, q) {
            if (error2) {
                throw error2;
            }
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            channel.bindQueue(q.queue, exchange, '#');

            channel.consume(q.queue, function(msg) {
                if (msg.content) {
                    console.log(" [x] %s", msg.content.toString());
                    senddata(msg.fields.routingKey, msg.content.toString(), channel, exchange1)
                }
            }, {
                noAck: true
            });
        });
    });
    function senddata(key, content, channel, exchange){
        channel.publish(exchange, key, Buffer.from(content));
        console.log("[x] Sent data");
        console.log("");
      }
});