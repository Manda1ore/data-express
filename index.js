var express = require('express'),
  pug = require('pug'),
  path = require('path'),
  route = require('./routes/routes.js'),
  bodyParser = require('body-parser');
var expressSession = require('express-session');

var app = express();
var hash;

var checkAuth = function (req, res, next) {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(expressSession({secret: '5ecretP455c0de', saveUninitialized: true, resave: true}));

app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
  extended: true
})

app.get('/', route.index);
app.get('/login', route.login);
app.get('/create', route.create);
app.get('/edit/:id', route.edit);
app.get('/details', route.details);
app.post('/login',urlencodedParser,route.loginPerson);
app.post('/create', urlencodedParser, route.createPerson);
app.post('/edit/:id', urlencodedParser, route.editPerson);
app.get('/delete/:id', route.delete);

app.listen(3000);
