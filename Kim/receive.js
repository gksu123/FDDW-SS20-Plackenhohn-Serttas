#!/usr/bin/env node


var amqp = require('amqplib/callback_api');



amqp.connect('amqp://wfcotqhq:OXIBwoEG8g8s27WbaKgdXswuCBzr7FTf@squid.rmq.cloudamqp.com/wfcotqhq', function(error0, connection) {

    if (error0) {

        throw error0;

    }

    connection.createChannel(function(error1, channel) {

        if (error1) {

            throw error1;

        }



        var queue = 'hello';



        channel.assertQueue(queue, {

            durable: false

        });



        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);



        channel.consume(queue, function(body) {

            console.log(" [x] Received %s", body.content.toString());

        }, {

            noAck: true

        });

    });

});