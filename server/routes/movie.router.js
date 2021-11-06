const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
    const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});

// create a GET router for the genre list of the selected movie
router.get('/:id', (req, res) => {
  console.log('In genre GET router with the movie ID', req.params.id);
  // assign the search parameter to the id parameter from fetchSelectedGenres
  const values = [req.params.id];
  // query the database to list the genres of the selected movie ID
  const genreQuery = `SELECT genres.name FROM movies_genres
                JOIN genres ON movies_genres.genre_id=genres.id
                WHERE movies_genres.movie_id = $1; 
                `;
  pool.query(genreQuery, values)
    .then(response => {
      // this will return an array of objects for the genres
      res.send(response.rows)
    }).catch(err => {
      console.log('Error on genre GET', err);
      res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;