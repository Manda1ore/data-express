var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

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
    password: req.body.password,
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
    person.name = req.body.name;
    person.age = req.body.age;
    person.species = req.body.species;
    person.description = req.body.description;
    person.gender = req.body.gender;
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
