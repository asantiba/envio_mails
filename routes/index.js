var nodemailer = require('nodemailer');
var sleep = require('system-sleep');

//modelos
var usuarioModel =  require('../models/usuario');

//Direccion origen para enviar mail
var transporter = nodemailer.createTransport('SMTP',{
    auth: {
        //Este es el correo que utilizan para enviar mensajes y su contraseña, este correo lo cree yo
        user: 'no-reply@gojump.cl',
        pass: 'belitajump'
    }
});

module.exports = function(app,res){

    //Rutas
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    //Envia el mail a todos los correos de la bd
    app.post('/enviar_mail',function(req, res) {
        var correos = ['canespfam@gmail.com','acamposa2874@gmail.com'];
        /*usuarioModel.get_mails(function(error, data) {
            if(error){
                console.log(error.message);
            }else{
                correos = data;
            }
        });
        
        for (var i = 0; i < correos.length; i++) {
            var mailOptions = {
                from: 'Jump',
                to: correos[i],
                subject: 'Mail masivo jump',
                text: 'Hola, te han invitado a un correo de prueba'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                } 
                else{
                    console.log('Email enviado a'+correos[i]);
                }
            });
            sleep(3000);
        }
        */
        var mailOptions = {
            from: 'Jump',
            to: correos,
            subject: 'Mail masivo jump',
            text: 'Hola, te han invitado a un correo de prueba'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            } 
            else{
                console.log('Email enviado a'+correos[i]);
            }
        });
    });
    app.get('/enviar_especifico',function(req, res) {
            var mailOptions = {
                from: 'no-reply@gojump.cl',
                to: "benja_as@hotmail.com",
                subject: 'Mail masivo jump',
                text: 'Hola, te han invitado a un correo de prueba'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                    res.send("mala,\n %s",error.toString());
                }
                else{
                    console.log('Email enviado a'+correos[i]);
                    res.send("wena\n");
                }
            });
    });

};