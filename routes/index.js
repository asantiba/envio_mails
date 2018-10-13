var mysql = require('mysql');
var nodemailer = require('nodemailer');

//modelos
var usuarioModel =  require('../models/usuario');

//Direccion origen para enviar mail
var transporter = nodemailer.createTransport({
    host:'renes10416me.dedicados.cl',
    port: 465,
    auth: {
        //Este es el correo que utilizan para enviar mensajes y su contraseña, este correo lo cree yo
        user: '_mainaccount@gojump.cl',
        pass: '13551355'
    }
});

module.exports = function(app,res){

    //Rutas
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    //Envia el mail a todos los correos de la bd
    app.post('/enviar_mail',function(req, res) {
        var correos = [];
        usuarioModel.get_mails(function(error, data) {
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
                    res.send("mala,\n %s",error.toString());
                }
                else{
                    console.log('Email enviado a'+correos[i]);
                    res.send("wena\n");
                }
            });
        }
    });
    app.get('/enviar_especifico',function(req, res) {
            var mailOptions = {
                from: 'no-reply@gojump.cl',
                to: "alexis.santibanez.14@sansano.usm.cl",
                subject: 'Mail masivo jump',
                text: 'Hola, te han invitado a un correo de prueba'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                    res.send("mala,\n %s",error.toString());
                }
                else{
                    console.log('Email enviado al apu');
                    res.send("wena\n ");
                }
            });
    });

};