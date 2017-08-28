let mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    movie_title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    released_date: {
        type: Date,
        required: true
    },
    admin_name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

let Movie = module.exports = mongoose.model('Movie', movieSchema);