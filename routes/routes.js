var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var bcrypt = require('bcrypt-nodejs');
var hash;

function makeHash(the_str){
  
  bcrypt.hash(the_str, null, null, function (err,hash){
    console.log(hash);
  });
}

var personSchema = mongoose.Schema({
  userName: String,
  password: String,
  age: String,
  admin: Boolean,
  email: String,
  q1: String,
  q2: String,
  q3: String
});


var Person = mongoose.model('People_Collection', personSchema);



exports.index = function (req, res) {
  Person.find(function (err, person) {
    if (err) return console.error(err);
    res.render('index', {
      title: 'People List',
      people: person
    });
  });
};

exports.create = function (req, res) {
  res.render('sign-up', {
      title: 'Add Person'
  });
};

exports.createPerson = function (req, res) {
  var person = new Person({
    userName: req.body.userName,
    age: req.body.age,
    password: makeHash(req.body.password),
    email: req.body.email,
    q1: req.body.q1,
    q2: req.body.q2,
    q3: req.body.q3
  });
  person.save(function (err, person) {
    if (err) return console.error(err);
    console.log(req.body.useName + ' added');
  });
  res.redirect('/');
};

exports.edit = function (req, res) {
  Person.findById(req.params.id, function (err, person) {
    if (err) return console.error(err);
    res.render('edit', {
      title: 'Edit Person',
      person: person
    });
  });
};

exports.editPerson = function (req, res) {
  Person.findById(req.params.id, function (err, person) {
    if (err) return console.error(err);
    person.userName = req.body.userName;
    person.age = req.body.age;
    person.email = req.body.email;
    person.password = req.body.password;
    person.q1 = req.body.q1;
    person.q2 = req.body.q2;
    person.q3 = req.body.q3;
    person.save(function (err, person) {
      if (err) return console.error(err);
      console.log(req.body.userName + ' updated');
    });
  });
  res.redirect('/');

};

exports.delete = function (req, res) {
  Person.findByIdAndRemove(req.params.id, function (err, person) {
    if (err) return console.error(err);
    res.redirect('/');
  });
};

exports.details = function (req, res) {
  Person.findById(req.params.id, function (err, person) {
    if (err) return console.error(err);
    res.render('details', {
      title: person.userName + "'s Details",
      person: person
    });
  });
};

exports.login = function (req,res) {
  res.render('login');
};

exports.loginPerson = function(req,res){
  console.log(req.body.username);
  Person.find(req.body.username, function(err, person){
    if (err) return console.error(err);
    bcrypt.compare(req.body.password,person.password,function(err,res){
      console.log(res);
    });
  });
  if (req.body.username == 'user' && req.body.password == 'pass') {
        req.session.user = { isAuthenticated: true, username: req.body.username};
        res.redirect('/');
    } else {
        // logout here so if the user was logged in before, it will log them out if user/pass wrong
        res.redirect('/');
    }
}