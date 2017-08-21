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
    savePassword(hash);
  });
}
function savePassword(str){
  hash = str;
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

var checkAuth = function (req, res, next) {
  console.log(req.session.user);
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

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
  makeHash(req.body.password)
  console.log(req.body.q1)
  //console.log(hash);
  setTimeout(function(){
    var person = new Person({
      userName: req.body.userName,
      age: req.body.age,
      password: hash,
      admin: false,
      email: req.body.email,
      q1: req.body.polution,
      q2: req.body.food,
      q3: req.body.favPet
    });
    person.save(function (err, person) {
    if (err) return console.error(err);
    console.log(req.body.userName + ' added');
  });
  res.redirect('/');
  },1000);
  
  
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
  makeHash(req.body.password);
  setTimeout(function(){
  Person.findById(req.params.id, function (err, person) {
    if (err) return console.error(err);
    person.userName = req.body.userName;
    person.age = req.body.age;
    person.email = req.body.email;
    person.password = hash;
    person.q1 = req.body.polution;
    person.q2 = req.body.food;
    person.q3 = req.body.favPet;
    person.save(function (err, person) {
      if (err) return console.error(err);
      console.log(req.body.userName + ' updated');
    });
  });
  res.redirect('/');
  },1000);

};

exports.delete = function (req, res) {
  Person.findByIdAndRemove(req.params.id, function (err, person) {
    if (err) return console.error(err);
    res.redirect('/');
  });
};

exports.details = function (req, res) {
  checkAuth()
  console.log("details" + req.session.user);
  Person.find(function (err, person) {
    if (err) return console.error(err);
    res.render('details', {
      title: 'People List',
      people: person
    });
  });
};

exports.login = function (req,res) {
  res.render('login');
};

exports.loginPerson = function(req,res){
  setTimeout(function(){
  Person.find({userName : req.body.userName}, function(err, person){
    if (err) return console.error(err);
    bcrypt.compare(req.body.password,person[0].password,function(err,res){
      console.log(res);
//      console.log(person.password);
      if (res) {
        console.log("success login")
        req.session.user = { isAuthenticated: true, username: req.body.userName, isAdmin: person[0].admin};
      } 
      console.log(req.session.user);
    });
    
      res.redirect('/');
  });
  },1000);
}