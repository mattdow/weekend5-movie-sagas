import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetail from '../MovieDetail/MovieDetail';
import AddMovie from '../AddMovie/AddMovie';
import MovieEdit from '../MovieEdit/MovieEdit';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar.jsx'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES'}); 
 }, []);
  return (
    <div className="App">
      <Router> 
        <Navbar />       
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route exact path="/add">
          <AddMovie />
        </Route>
        <Switch>
          <Route exact path="/details/:id" children={<MovieDetail />} />
        </Switch>
        <Switch>
          <Route exact path="/edit/:id" children={<MovieEdit />} /> 
        </Switch>
      </Router>
    </div>
  );
}


export default App;
