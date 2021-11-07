import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieItem.css';
import { Card, CardHeader, CardMedia } from '@mui/material';

// creating a component for each individual movie item for ease of selecting and styling
function MovieItem({ movie }) {
    // create a variable for the dispatch hook
    const dispatch = useDispatch();
    // create a variable for the router hook
    const history = useHistory();
    // define a function to list actions that will run when a movie item is clicked
    const handleMovie = (movie) => {
        console.log('In handleMovie for', movie);
        // store selected movie object in Redux via dispatch. In base, I dispatched the entire movie object. For stretch goal, I'm only dispatching the ID.
        dispatch({ type: 'SET_SELECTED_MOVIE', payload: movie.id })
        // go to the details view, with the ID reference
        history.push(`details/${movie.id}`);
    } // end of handleMovie

    return (
        // <div className="movie-card" onClick={() => handleMovie(movie)}>
        //     <h3>{movie.title}</h3>
        //     <img className="poster" src={movie.poster} alt={movie.title}/>
        // </div>
        <Card variant="outlined"
              onClick={() => handleMovie(movie)}>
            <CardHeader title={movie.title}/>
                <CardMedia
                  component="img"
                //   height="150"
                //   width="150"
                  image={movie.poster}>
                </CardMedia>
        </Card>
    )
} // end of MovieItem

export default MovieItem;