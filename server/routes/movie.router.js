const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET router for the full list of movie objects
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

// create a PUT router to edit the title and description of an existing movie object
router.put('/:id', (req, res) => {
  console.log('In movie PUT router w/ movie ID', req.params.id);
  // define the parameters for the query
  const editID = req.params.id;
  const newTitle = req.body.title;
  const newDescription = req.body.description;
  const values = [editID, newTitle, newDescription];
  // define the SQL query that will alter the selected fields
  const editQuery = `UPDATE movies
                    SET title = $2,
                    description = $3
                    WHERE movies.id = $1;
                    `;
  // make a query to the DB pool with the defined query and params above
  pool.query(editQuery, values)
    .then((response) => {
      console.log('PUT server response is', response);
      res.sendStatus(201);      
    })
    // catch for the edit query
    .catch((err) => {
      console.log('Error making PUT request to DB', err);
      res.sendStatus(500);
    });
}); // end of movies put route

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