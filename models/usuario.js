//llamamos al paquete mysql que hemos instalado
var mysql = require('mysql');
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
var config = require('../database/config');
var connection = mysql.createConnection(config);

//creamos un objeto para ir almacenando todo lo que necesitemos
var usuarioModel = {};

//obtenemos los correos de los usuarios
usuarioModel.get_mails = function(callback){
    if (connection){
        connection.query('SELECT DISTINCT correo FROM jumper WHERE correo LIKE "%@%"',function(error, result){
            if(error){
                throw error;
            }
            else{
                callback(null,result);
            }
        });
    }
};

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = usuarioModel;
