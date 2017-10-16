const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// CRUD
// create read update delete (destroy)

// Get all students
app.get('/users', function(req, res) {
  knex('users').then((result) => {

    res.render('users', {users: result})
  })
  .catch((err) => {
    console.error(err)
  });
});

app.get('/user/:id', function(req, res){
  knex('users')
    .where('id', req.params.id)
    .then((result)=>{

      res.render('profile', {user: result[0]});
    })
    .catch((err) => {
      console.error(err)
    });
});

app.post('/users', function(req, res){

  knex('users')
    .insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      age: req.body.age
    }, "*")
    .then((result)=>{
      console.log(result);
      res.redirect("/users")
    })
    .catch((err) => {
      console.error(err)
    });

});

app.get('/delete/:id', function(req, res){

  knex('users')
    .del()
    .where('id', req.params.id)
    .then(()=>{

      res.redirect('/users');
    })
    .catch((err) => {
      console.error(err)
    });
});

app.get('/edit/:id', function(req, res){
  knex('users')
    .where('id', req.params.id)
    .then((result)=>{

      res.render('edit', {user: result[0]})
    })
    .catch((err) => {
      console.error(err)
    });
});

app.post('/update/:id', function(req, res){
  knex('users')
    .update(req.body)
    .where('id', req.params.id)
    .then(()=>{

      res.redirect('/user/'+req.params.id);
    })
    .catch((err) => {
      console.error(err)
    });
})

app.listen(port, function() {
  console.log('Listening on', port);
});
