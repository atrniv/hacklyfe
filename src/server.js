var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var Playlyfe = require('playlyfe').Playlyfe;
var PlaylyfeException = require('playlyfe').PlaylyfeException;

var pl = new Playlyfe({
    type: 'client',
    version: 'v2',
    client_id: "",
    client_secret: ""
});

var app = express();

app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
  secret: 'hacklyfe',
  domain: '.localhost'
}));

// attach playlyfe client to request
app.use(function (req, res, next) {
  req.pl = pl;
  next();
});

var admin_router = express.Router();
var user_router = express.Router();

require('./routes/admin')(admin_router);
require('./routes/user')(user_router);

app.use('/admin', admin_router);
app.use('/user', user_router);

app.use('/', express.static( __dirname + "/public"));


app.listen(3000)
