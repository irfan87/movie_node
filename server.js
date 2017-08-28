const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// connect to the database
mongoose.Promise = global.Promise;
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

// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

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

// send the new movie to the database
app.post('/movies/add_new_movie', (req, res) => {
    let movie = new Movie;

    movie.movie_title = req.body.movie_title;
    movie.director = req.body.director;
    movie.released_date = req.body.released_date;
    movie.admin_name = req.body.admin_name;

    movie.save((err) => {
        if(err){
            console.error(err);
        } else {
            res.redirect('/movies/movies_list');
        }
    })

});

app.listen(port, (req, res) => {
    console.log('Server is listening on port ' + port);
});