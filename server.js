const express = require('express');
const path = require('path');

// initialized app and port
const app = express();
const port = process.env.PORT || 3000;

// set PUG engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set the home route
app.get('/', (req, res) => {
    res.render('index');
});

// populate all the movies in here
app.get('/movies/movies_list', (req, res) => {
    let movies = [{
        title: 'Movie 1',
        directed_by: 'Director 1',
        released_date: Date.now(),
        created_at: Date.now(),
        admin_name: 'Admin 1'
    },{
        title: 'Movie 2',
        directed_by: 'Director 3',
        released_date: Date.now(),
        created_at: Date.now(),
        admin_name: 'Admin 1'
    },{
        title: 'Movie 3',
        directed_by: 'Director 2',
        released_date: Date.now(),
        created_at: Date.now(),
        admin_name: 'Admin 2'
    },{
        title: 'Movie 4',
        directed_by: 'Director 2',
        released_date: Date.now(),
        created_at: Date.now(),
        admin_name: 'Admin 2'
    }];

    res.render('movie_list', {
        title: "Movies List",
        movies: movies
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