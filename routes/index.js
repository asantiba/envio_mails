var nodemailer = require('nodemailer');
var sleep = require('system-sleep');
var app = require('express').Router();
//modelos
var usuarioModel =  require('../models/usuario');

//Direccion origen para enviar mail
var transporter = nodemailer.createTransport({
    host:'201.148.104.16',
    port: 25,
    auth: {
        //Este es el correo que utilizan para enviar mensajes y su contraseña, este correo lo cree yo
        user: '_mainaccount@gojump.cl',
        pass: '13551355'
    },
    tls: {
        rejectUnauthorized: false
    }
});


//Rutas
app.get('/', function (req, res) {
    res.render('index.ejs');
});

//Envia el mail a todos los correos de la bd
app.get('/enviar_mail',function(req, res) {
    /*
    //Sacar correos de la base de datos, sin que se repitan
    usuarioModel.get_mails(function(error, data) {
        if(error){
            console.log(error.message);
        }else{
            correos = data;
        }
    }); */
    var correos = require("../database/mails").abmayo;
    console.log('Cantidad de correos: ' + correos.length);
    var count = 0;
    res.send("yuju!");
    for (var i = 0; i < correos.length; i++) {
        var mailOptions = {
            from: '"GoJump" <no-reply@gojump.cl>',
            to: correos[i],
            subject: '¡Los Mejores cumpleaños están en GoJump!',
            html: '<html><head><meta http-equiv="Content-Type" content="text/html;"><title>Los mejores cumpleaños son en GoJump</title></head>'+
                '<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">'+
                '<div style="position: absolute;align-self: center; background-color:#FFFFFF; padding:5px">' +
                '<a href="www.gojump.cl"><img src="cid:unique@kreata.ee" alt="Ingresa a Gojump.cl para saber mas"></a>' +
                '<p>Este e-mail es un anuncio de GoJump. Te enviamos este e-mail ya que inscribiste tu dirección de correo en nuestros registros para recibir novedades, ofertas, promociones y más. Si no quieres recibir más correos escríbenos a unsubscribe@gojump.cl</p>' +
                '</div></body></html>',
            attachments: [{
                filename: 'cumpleanosGJ.jpeg',
                path: './public/cumpleanosGJ.jpeg',
                cid: 'unique@kreata.ee'
            }]
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                console.log('Error, no se han enviado emails');
                if (count == correos.length) {
                    console.log('Error, no se han enviado emails');
                }
            }
            else{
                console.log('Email enviado a ' + correos[i] + ' Cantidad: ' + count);
                if (count == i - 1) {
                    count = correos.length;
                    console.log('Email enviado a: ' + correos[i] + '\n Total: ' + count);
                }
                count += 1;
            }
        });
        sleep(180000);
    }
});
app.get('/enviar_especifico',function(req, res) {
        var mailOptions = {
            from: '"GoJump" <no-reply@gojump.cl>',
            to: ['benjamin.meneses.14@sansano.usm.cl'],
            subject: '¡Los Mejores cumpleaños están en GoJump!',
            html: '<html><head><meta http-equiv="Content-Type" content="text/html;"><title>Los mejores cumpleaños son en GoJump</title></head>'+
                '<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">'+
                '<div style="position: absolute;align-self: center; background-color:#FFFFFF; padding:5px">' +
                '<a href="www.gojump.cl"><img src="cid:unique@kreata.ee" alt=""></a>' +
                '<p>Este e-mail es un anuncio de GoJump. Te enviamos este e-mail ya que inscribiste tu dirección de correo en nuestros registros para recibir novedades, ofertas, promociones y más. Si no quieres recibir más correos escríbenos a unsubscribe@gojump.cl</p>' +
                '</div></body></html>',
            attachments: [{
                filename: 'cumpleanosGJ.jpeg',
                path: './public/cumpleanosGJ.jpeg',
                cid: 'unique@kreata.ee'
            }]
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log("mala,\n %s",error.toString());
                res.send(error.toString());
            }
            else{
                console.log('Email enviado al apu');
                console.log(info);
                res.send("wena\n ");
            }
        });
});

module.exports = app;