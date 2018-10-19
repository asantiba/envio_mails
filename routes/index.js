var nodemailer = require('nodemailer');
var sleep = require('system-sleep');
var app = require('express').Router();
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


//Rutas
app.get('/', function (req, res) {
    res.render('index.ejs');
});

//Envia el mail a todos los correos de la bd
app.post('/enviar_mail',function(req, res) {
    /*
    //Sacar correos de la base de datos, sin que se repitan
    usuarioModel.get_mails(function(error, data) {
        if(error){
            console.log(error.message);
        }else{
            correos = data;
        }
    }); */
    var correos = require("../database/mails").todos;
    console.log('Cantidad de correos: ' + correos.length);
    var count = 0;
    res.send("yuju!");
    for (var i = 0; i < correos.length; i++) {
        var mailOptions = {
            from: '"GoJump" <no-reply@gojump.cl>',
            to: correos[i],
            subject: '¡Celebra Halloween con Nosotros!',
            html: '<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"><title>El evento mas escalofriante del año</title></head>'+
            '<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">'+
            '<div style="position: absolute;align-self: center; background-color:#FFFFFF; outline-style:double; padding:5px">' +
            '<img src="cid:unique@kreata.ee" alt="">' +
            '<p style="font-size: xx-small">Este e-mail es un anuncio de GoJump. Te enviamos este e-mail ya que inscribiste tu dirección de correo en nuestros registros para recibir novedades, ofertas, promociones y más. Si no quieres recibir más correos escríbenos a unsubscribe@gojump.cl</p>' +
            '</div></body></html>',
            attachments: [{
                filename: 'WEB-copia.png',
                path: './public/HTML/01_files/WEB-copia.png',
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
            to: ['benja_as@hotmail.com'],
            subject: '¡Celebra Halloween con Nosotros!',
            html: '<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"><title>El evento mas escalofriante del año</title></head>'+
                '<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">'+
                '<div style="position: absolute;align-self: center; background-color:#FFFFFF; outline-style:double; padding:5px">' +
                '<img src="cid:unique@kreata.ee" alt="">' +
                '<p>Este e-mail es un anuncio de GoJump. Te enviamos este e-mail ya que inscribiste tu dirección de correo en nuestros registros para recibir novedades, ofertas, promociones y más. Si no quieres recibir más correos escríbenos a unsubscribe@gojump.cl</p>' +
                '</div></body></html>',
            attachments: [{
                filename: 'WEB-copia.png',
                path: './public/HTML/01_files/WEB-copia.png',
                cid: 'unique@kreata.ee'
            }]
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

module.exports = app;