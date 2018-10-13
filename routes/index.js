var nodemailer = require('nodemailer');
var sleep = require('system-sleep');

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
        var text_html = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"><title>Print</title></head>'+
                    '<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">'+
                    '<img src="cid:unique@kreata.ee" width="1000" height="1815" alt=""><div style="position:absolute; left:10px; top: 1820px; background-color:#FFFFFF; outline-style:double; padding:5px">'+
                    '<dl><dt>Format: PNG-24</dt><dt>Dimensions: 1000w x 1815h</dt><dt>Size: 527,1K</dt><dt>Settings: Non-Interlaced, Transparency on</dt></dl>'+
                    '<pre><code>&lt;html&gt;&lt;head&gt;&lt;title&gt;Print&lt;/title&gt;&lt;meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"&gt;'+
                    '&lt;/head&gt;&lt;body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0"&gt;&lt;img src="cid:unique2@kreata.ee" width="1000" height="1815" alt=""&gt;'+
                    '&lt;/body&gt;&lt;/html&gt;</code></pre></div></body></html>';
        /*
        //Sacar correos de la base de datos, sin que se repitan
        usuarioModel.get_mails(function(error, data) {
            if(error){
                console.log(error.message);
            }else{
                correos = data;
            }
        }); */
        var correos = ['canespfam@gmail.com','benjamin.meneses.14@sansano.usm.cl'];
        console.log('Cantidad de correos: ' + correos.length);
        var correos_enviados = [];
        var correos_grupo = [];
        var count = 0;
        for (var i = 0; i < correos.length; i++) {
            correos_grupo.push(correos[i]);
            if ((i+1)%15 == 0 || (i+1) == correos.length) {
                console.log('Enviar email a: ' + correos_grupo);
                var mailOptions = {
                    from: 'no-reply@gojump.cl',
                    to: correos_grupo,
                    subject: 'Mail  GoJump',
                    text: 'Saludos, te han invitado a un evento de GoJump',
                    html: text_html,
                    attachments: [{
                        filename: 'WEB-copia.png',
                        path: './public/HTML/01_files/WEB-copia.png',
                        cid: 'unique@kreata.ee'
                    },
                    {
                        filename: 'WEB-copia.png',
                        path: './public/HTML/01_files/WEB-copia.png',
                        cid: 'unique2@kreata.ee'
                    }]
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                        count = count + correos_grupo.length;
                        if (count == correos.length) {
                            res.send('Error, no se han enviado emails');
                        }
                    }
                    else{
                        correos_enviados.push(correos_grupo);
                        console.log('Email enviado a ' + correos_grupo + ' Cantidad: ' + count);
                        if (count == correos.length - 1) {
                            count = count + correos.length%15;
                            res.send('Email enviado a: ' + correos_enviados + '\n Total: ' + correos_enviados.length);
                        }
                        count = count + 4;
                    }
                });
                correos_grupo = [];
                sleep(6000);
            }
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