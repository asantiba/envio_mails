var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mysql = require('mysql'); //Usa librerias o modulos

var app = express();

var server = require('http').Server(app);

// view engine setup
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Importar rutas
require('./routes/index.js')(app);
app.use(express.static(path.join(__dirname, 'public')));//Siempre debajo de las rutas,argumento muestra el directorio estatico, donde estan los archivos

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Start server
server.listen(app.get('port'), function(){
  console.log('The server starts on port ' + app.get('port'));
});
