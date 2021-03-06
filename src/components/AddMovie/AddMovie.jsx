import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography, TextField, Button, Card, Grid, Paper, MenuItem} from '@mui/material';
import './AddMovie.css';

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
        // define my new movie object using the state variables
        let newMovie = {
            title: title,
            poster: posterUrl,
            description: description,
            genre_id: genre
        }
        console.log('CLICKED on submit', newMovie);
        // dispatch the new movie to the appropriate Saga
        dispatch({
            type: 'ADD_MOVIE',
            payload: newMovie
        })
        history.push('/');
    }

    // Employ useEffect hook to populate the genre list on load
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    // render form JSX code
    return (
        <section className="add-page">
            <Paper sx={{ m:2, justifyContent: "center"}}>
            <Typography sx={{ mt:2}} variant="h4">Add Movie</Typography>
                <TextField
                    sx={{ m:2, maxWidth:"90%"}}
                    id="standard-required"
                    required
                    fullWidth
                    label="New Movie Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <TextField
                    sx={{ m:2, maxWidth:"90%"}}
                    id="standard-required"
                    required
                    fullWidth
                    margin="normal"  
                    value={posterUrl}
                    label="Movie Poster URL"
                    onChange={(e) => setPosterUrl(e.target.value)} />
                    <br/>
                <TextField 
                    sx={{ m:2, maxWidth:"90%"}}
                    fullWidth
                    required
                    multiline
                    id="outlined-multiline-static"
                    rows={4}
                    value={description}
                    label="Movie Description"
                    onChange={(e) => setDescription(e.target.value)} />
                        <br/>
                <div>
                <TextField value={genre}
                    sx={{ m:2, maxWidth:"50%"}}
                    select
                    fullWidth
                    label="Pick a Genre"
                    onChange={(e) => setGenre(e.target.value)}>
                    <option disabled selected value="">
                        Pick a Genre!
                    </option>
                    {genreList.map((genreChoice) => {
                        return (
                            <MenuItem key={genreChoice.id} value={genreChoice.id}>
                                {genreChoice.name}
                            </MenuItem>
                        );
                    })};
                </TextField>
                </div>
                <br />
                <Button variant="contained" color="success" sx={{m:2}} onClick={handleSubmit}>SAVE MOVIE</Button>
                
                <Button variant="contained" color="error" sx={{m:2}}onClick={() => history.push('/')}>CANCEL</Button>
        </Paper>
        </section>
        
    ) // end of render code
} // end of AddMovie
export default AddMovie;