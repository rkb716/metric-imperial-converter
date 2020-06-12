'use strict';
console.log("hello");
var express     = require('express');
var bodyParser  = require('body-parser');
var expect      = require('chai').expect;
var cors        = require('cors');
var helmet = require('helmet');
require('dotenv').config();

var apiRoutes         = require('./routes/api.js');

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet.noSniff());
app.use(helmet.xssFilter());

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    console.log("homepage");
    res.sendFile(process.cwd() + '/views/index.html');
  });

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
});
