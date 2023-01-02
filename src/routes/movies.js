const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const movies = require('../example.json')

router.get('/', (req, res) => {  
    res.json(movies);
});

router.get('/:id', (req, res) => {  
    const { id } = req.params;
    _.each(movies, (movie, i) => {
        if (movie.id == id) return res.json(movies[i]);
    });

    if( id > movies.length || id < 0 ) {
        throw new Error(res.status(500).json(`movie ${id} does not exist`));
    }
});

router.post('/', (req, res) => { 
    console.log(req.body); 
    const { title, director, year, starts } = req.body;

    if ( title && director && year && starts ) {
        const id = (movies.length+1).toString();
        const movie = { id , ...req.body };
        movies.push(movie);
        return res.json(`new movie created: ${req.body.title}`);
    } else {
        throw new Error(res.status(500).json(`all the params are needed`));
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(movies, (movie, i) => {
        if (movie.id == id) {
            movies.splice(i, 1);
        }
   });
   res.send(`movie ${id}  deleted`);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, starts } = req.body;
    if ( title && director && year && starts ) {
        _.each(movies, (movie, i) => {
            if (movie.id == id) {
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.starts = starts;
            }
       });
       return res.json(movies);
    } else {
        throw new Error(res.status(500).json(`all the params are needed`));
    }
});

module.exports = router;