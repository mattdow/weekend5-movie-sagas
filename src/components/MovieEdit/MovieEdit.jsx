import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';



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
    console.log(id);
    // grab the movie array from Redux 
    const movies = useSelector((store) => store.movies);
    console.log(movies);
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
    console.log('In movie edit for', selection);

    // define a handleSubmit function to submit a new movie to the list
    function handleSubmit(event) {
        event.preventDefault();
        // define the new movie data object using the state variables
        let newMovieData = {
            id: id,
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
        history.push(`/${id}`);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES'}); 
     }, []);

    return (
        <>
        <h1>Edit Page</h1>
        <h2>Movie to Edit: {selection.title}</h2>
        <input type="text" value={newTitle}
               placeholder="New Title"
               onChange={(e) => setNewTitle(e.target.value)} />
        <textarea value={newDescription}
                  placeholder="New Description"
                  onChange={(e) => setNewDescription(e.target.value)} />
        <br/>
        <button onClick={handleSubmit}>SAVE EDITS</button>
        <br />
        <button onClick={() => history.push(`/${id}`)}>CANCEL</button>
        </>
    )
}
export default MovieEdit;