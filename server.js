const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// set PUG engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, (req, res) => {
    console.log('Server is listening on port ' + port);
});