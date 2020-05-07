var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport(options[, defaults])

var transport = nodemailer.createTransport({
    service: 'web',
    auth: {
        user: 'kimberly.plackenhohn@web.de',
        pass:''
    }
});

var mailOptions = {
    from: '',
    to: '',
    subject: '',
    text: ``
};

transport.sendMail(mailOptions, function(error, info) {
    if(error) {
        console.log(error);
    } else {
        console.log('Email sent:' + info.response);
    }
});