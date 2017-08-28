const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/movie_node', {useMongoClient: true});
let db = mongoose.connection;

// check for db error
db.on('error', (err) => {
    console.log(err);
});

// check connection
db.once('open', () => {
    console.log('The app is connected to the mongodb');
});

// initialized app and port
const app = express();
const port = process.env.PORT || 3000;

// bring the movies model
let Movie = require('./models/movie');

// set PUG engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set the home route
app.get('/', (req, res) => {
    res.render('index');
});

// populate all the movies in here
app.get('/movies/movies_list', (req, res) => {
    Movie.find({}, (err, movies) => {
        if(err){
            console.log(err);
        } else {
            res.render('movie_list', {
                title: "Movies List",
                movies: movies
            });
        }
    });
});

// add routes
app.get('/movies/add_new_movie', (req, res) => {
    res.render('add_movie', {
        title: 'Add movie'
    })
});

app.listen(port, (req, res) => {
    console.log('Server is listening on port ' + port);
});