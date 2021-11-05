// creating a component to display the movie details
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// show the selected movie data from Redux
function MovieDetail() {
    // grab the movie object from Redux
    const selectedMovie = useSelector((store) => store.selectedMovie);

    useEffect(() => {

    });

    // grab the movie genres from Redux
 

    return (
        <section>
            <h1>Selected Movie</h1>
            {
                selectedMovie.title ? (
                    <div  >
                        <h3>{selectedMovie.title}</h3>
                        <img src={selectedMovie.poster} alt={selectedMovie.title}/>
                        <br />
                    </div>
                ) : (
                    <h3>No movie selected.</h3>
                )
            }
        </section>
    );
} // end of MovieDetail

export default MovieDetail;