import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// creating a component for each individual movie item for ease of selecting and styling
function MovieItem({ movie }) {
    // create a variable for the dispatch hook
    const dispatch = useDispatch();
    // create a variable for the router hook
    const history = useHistory();
    // define a function to list actions that will run when a movie item is clicked
    const handleMovie = (movie) => {
        // store selected movie object in Redux via dispatch
        dispatch({ type: 'SET_SELECTED_MOVIE', payload: movie })
        // go to the details view
        history.push('/details');
    } // end of handleMovie

    return (
        <div  >
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title}/>
        </div>
    )
} // end of MovieItem

export default MovieItem;