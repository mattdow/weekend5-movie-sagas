import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { action } from 'commander';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_SELECTED_GENRES', fetchSelectedGenres);
    yield takeEvery('FETCH_GENRES', fetchGenres)
}
// create a generator function to grab all movies
function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }    
} // end of fetchAllMovies
// create a generator function to grab the genres from DB
function* fetchGenres() {
    try {
        // define a variable with the response from the DB.
        let genreResponse = yield axios.get('api/genre');
        // send the genre list to the reducer
        yield put({type: 'SET_GENRES', payload: genreResponse.data})
    }
    catch(err) {
        console.log('Error in fetchGenres', err);        
    }
} // end of fetchGenres

// create a generator function for the genres associated with the selected movie
function* fetchSelectedGenres(action) {
    // put the axios request for the movie in a try block
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/movie/${action.payload}`,
        })
        yield put({ type: 'SET_SELECTED_GENRES', payload: response.data });
    } // end of try block
    catch (err) {
        console.log('Error on genres GET', err);
        yield put({ type: 'GET_GENRE_ERROR'});
    } // end of catch block
} // end of fetchSelectedGenres


    // get the genres 
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create reducer used to store the selected movie
// We want the state to be an empty object upon initialization, 
// and when a movie item is clicked, state changes to that movie object
const selectedMovie = (state = {}, action ) => {
    // use a switch statement to listen for multiple possible action types
    switch (action.type) {
        case 'SET_SELECTED_MOVIE':
            // return the action payload alone, which is the selected movie object
            return action.payload;
        // if no anticipated action comes, return the previous state, which will likely be an empty object
        default:
            return state;
    } // end of switch statement
} // end of selectedMovie reducer

// Create reducer to store the selected movie genres. State should be an empty array prior to any dispatches.
const selectedGenres = (state = [], action) => {
    // use a switch statement to listen for multiple possible action types
    switch (action.type) {
        case 'SET_SELECTED_GENRES':
            // return the list of genres 
            return action.payload;
        default:
            return state;
    }
}
    
// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovie,
        selectedGenres
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
