var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');
    require('dotenv').config();

    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 3000;
    app.get('/', function (req, res) {
      res.render('index');
    });
    app.post('/send-email', function (req, res) {
        console.log('request body subject ++++++++', req.body.subject);
        console.log('request body body ++++++++', req.body.body);

        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SENDER,
                pass: process.env.SENDER_PASSWORD
            }
        });
        let mailOptions = {
            from: ' "Newsletter Request" ', // sender address
            to: process.env.RECIEVER, // list of receivers
            subject: req.body.subject, // Subject line
            html: req.body.body // email body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
                res.render('index');
            });
        });
            app.listen(port, function(){
              console.log('Server is running at port: ',port);
            });
