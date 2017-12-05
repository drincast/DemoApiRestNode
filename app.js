var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();

// Middlewares - mediadores para enterder las peticiones
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //tipo de parceo de datos
//implementar y personalizar métodos HTTP
app.use(methodOverride());

// Importar modelos y controladores
var models = require('./models/client')(app, mongoose);
var ClientCtrl = require('./controllers/clients');

var router = express.Router();

// Index
router.get('/', function(req, res) {
  res.send("mensaje de prueba con metodo get");
});

app.use(router);

// API routes
var api = express.Router();

api.route('/clients')
  .get(ClientCtrl.findAll)
  .post(ClientCtrl.add);

api.route('/clients/:id')
  .get(ClientCtrl.findById)
  .put(ClientCtrl.update)
  .delete(ClientCtrl.delete);

app.use('/api', api);

//conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/clients', function(err, res) {
  console.log('iniciando conexión a mongoDB ...');
 if(err){
   console.log('Error de conexión' + err);
 } //throw err;
 console.log('Connected to Database');


});

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
