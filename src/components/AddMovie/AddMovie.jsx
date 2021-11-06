import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Create a form to add a new movie to the array
function AddMovie() {

    // set the dispatch hook to a variable for use
    const dispatch = useDispatch();
    // set the history hook to a variable for use
    const history = useHistory();
    // grab the genres from Redux
    const genres = useSelector(store => store.genres)
    // set a local state for title, poster image url, description, and genre
    let [title, setTitle] = useState('');
    let [posterUrl, setPosterUrl] = useState('');
    let [description, setDescription] = useState('');


    // render form JSX code
    return (
        <div>
            <h2>Add Movie</h2>
            <input type="text" value={title}
                   onChange={(e) => setTitle(e.target.value)} />




        </div>
    )
} // end of AddMovie
export default AddMovie;