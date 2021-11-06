import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Create a form to add a new movie to the array
function AddMovie() {

    // set the dispatch hook to a variable for use
    const dispatch = useDispatch();
    // set the history hook to a variable for use
    const history = useHistory();
    // grab the genres from Redux
    const genreList = useSelector(store => store.genres)
    // set a local state for title, poster image url, description, and genre
    let [title, setTitle] = useState('');
    let [posterUrl, setPosterUrl] = useState('');
    let [description, setDescription] = useState('');
    let [genre, setGenre] = useState('');

    // define a handleSubmit function to submit a new movie to the list
    function handleSubmit(event) {
        event.preventDefault();
        let newMovie = {
            title: title,
            poster: posterUrl,
            description: description,
            genre_id: genre
        }

        console.log('CLICKED on submit', newMovie);
        dispatch({
            type: 'ADD_MOVIE',
            payload: newMovie
        })
    }

    // Employ useEffect hook to populate the genre list on load
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    // render form JSX code
    return (
        <div>
            <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title}
                    placeholder="Movie Title"
                    onChange={(e) => setTitle(e.target.value)} />
                <input type="text" value={posterUrl}
                    placeholder="Movie Poster URL"
                    onChange={(e) => setPosterUrl(e.target.value)} />
                    <br/>
                <textarea value={description}
                        placeholder="Movie Description"
                        onChange={(e) => setDescription(e.target.value)} />
                        <br/>
                <select value={genre}
                        onChange={(e) => setGenre(e.target.value)}>
                    <option disabled selected value="">
                        Pick a Genre!
                    </option>
                    {genreList.map((genreChoice) => {
                        return (
                            <option key={genreChoice.id} value={genreChoice.id}>
                                {genreChoice.name}
                            </option>
                        );
                    })};
                </select>
                <input type="submit" />
            </form>     
        </div>
    ) // end of render code
} // end of AddMovie
export default AddMovie;