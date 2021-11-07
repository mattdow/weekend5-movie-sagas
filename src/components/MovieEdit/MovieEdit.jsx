import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Typography, TextField, Button, Card, Grid, Paper, MenuItem} from '@mui/material';


function MovieEdit () {
    // set dispatch as a variable for use
    const dispatch = useDispatch();
    // set the history hook to a variable for use
    const history = useHistory();
    // set a local state for the new title and description
    let [newTitle, setNewTitle] = useState('');
    let [newDescription, setNewDescription] = useState('');
    // grab the movie ID number from the react router params
    let { id } = useParams();
    // grab the movie array from Redux 
    const movies = useSelector((store) => store.movies);
    // Using the ID from params, I'll search through the movie array to pick out the correct selection for display
    let selection = {};
    function selectedMovie()  {
        // console.log('ID is ', id);
        for (let movie of movies) {
            if (movie.id === Number(id)) {
                selection = movie;
            } 
        } // end of for loop
    }
    selectedMovie();
    // console.log('In movie edit for', selection);

    // define a handleSubmit function to submit a new movie to the list
    function handleSubmit(event) {
        event.preventDefault();
        // define the new movie data object using the state variables
        let newMovieData = {
            id: Number(id),
            title: newTitle,
            description: newDescription,
        }
        console.log('CLICKED on submit', newMovieData);
        // dispatch to the edit movie Saga
        dispatch({
            type: 'EDIT_MOVIE',
            payload: newMovieData
        })
        // re-route to the details page
        history.push(`/details/${id}`);
    }

    // useEffect(() => {
    //     dispatch({ type: 'FETCH_MOVIES'}); 
    //  }, []);

    return (
        <section className="add-page">
            <Paper sx={{ m:2, justifyContent: "center"}}>
            <Typography sx={{ mt:2}} variant="h4">Editing: {selection.title}</Typography>
                <TextField
                    sx={{ m:2, maxWidth:"90%"}}
                    id="standard-required"
                    required
                    fullWidth
                    label="New Movie Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <TextField 
                    sx={{ m:2, maxWidth:"90%"}}
                    fullWidth
                    required
                    multiline
                    id="outlined-multiline-static"
                    rows={4}
                    value={newDescription}
                    label="New Movie Description"
                    onChange={(e) => setNewDescription(e.target.value)} />
                        
                <br />
                <Button variant="contained" color="success" sx={{m:2}} onClick={handleSubmit}>SAVE CHANGES</Button>
                
                <Button variant="contained" color="error" sx={{m:2}}onClick={() => history.push(`/details/${id}`)}>CANCEL</Button>
        </Paper>
        </section>
    )
}
export default MovieEdit;