// creating a component to display the movie details
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


// show the selected movie data from Redux
function MovieDetail() {
    // set dispatch as a variable for use
    const dispatch = useDispatch();
    // grab the movie object from Redux
    const selectedMovie = useSelector((store) => store.selectedMovie);
    const selectedGenres = useSelector((store) => store.selectedGenres);
    useEffect(() => {
       dispatch({ type: 'FETCH_SELECTED_GENRES', payload: selectedMovie.id}) 
    });

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
        </section>
    );
} // end of MovieDetail

export default MovieDetail;