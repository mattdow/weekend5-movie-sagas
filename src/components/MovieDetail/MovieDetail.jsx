// creating a component to display the movie details
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';


// show the selected movie data from Redux
function MovieDetail() {
    // set dispatch as a variable for use
    const dispatch = useDispatch();
    // set history as a variable for use
    const history =  useHistory();
    // grab the movie ID number from the react router params
    let { id } = useParams();
    console.log('Movie ID is ', id);
    // grab the movie object from Redux
    const selectedMovie = useSelector((store) => store.selectedMovie);
    // grab the genres for the selected movie from Redux
    const selectedGenres = useSelector((store) => store.selectedGenres);
    useEffect(() => {
       dispatch({ type: 'FETCH_SELECTED_GENRES', payload: selectedMovie.id}) 
    }, []);

    // grab the movie genres from Redux
 
    console.log('In Movie Detail', selectedGenres);
    return (
        <section>
            <h1>Selected Movie</h1>
            {
                selectedMovie.title ? (
                    <div  >
                        <h3>{selectedMovie.title}</h3>
                        <img src={selectedMovie.poster} alt={selectedMovie.title}/>
                        <br />
                        {selectedGenres.map((genre) => (
                            <h4>{genre.name}</h4>
                        ))}
                    </div>
                ) : (
                    <h3>No movie selected.</h3>
                )
            }
            <button onClick={() => history.push('/')}>Back To Movie List</button>
        </section>
    );
} // end of MovieDetail

export default MovieDetail;