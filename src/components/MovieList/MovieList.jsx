import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import MovieItem from '../MovieItem/MovieItem.jsx';
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';

function MovieList() {
    // set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // set history hook as a variable for use
    const history = useHistory();
    // grab the array of movies from the Redux store
    const movies = useSelector(store => store.movies);
    // call useEffect hook to populate the list with movies
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);
    // render the movie list 
    return (
        <main>
            {/* <button onClick={()=>history.push('/add')}>Add Movie</button> */}
            <Grid container spacing={2} className="movies">
                {movies.map(movie => {
                    return (
                        <Grid item xs={3}>
                            <MovieItem key={movie.id} movie={movie} />
                        </Grid>
                    );
                })}
            </Grid>
        </main>

    );
}

export default MovieList;