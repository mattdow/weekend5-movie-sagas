import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetail from '../MovieDetail/MovieDetail';
import AddMovie from '../AddMovie/AddMovie';
import MovieEdit from '../MovieEdit/MovieEdit';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/add">
          <AddMovie />
        </Route>
        <Switch>
          <Route exact path="/:id" children={<MovieDetail />} />
        </Switch>
        <Switch>
          <Route exact path="/edit/:id" children={<MovieEdit />} /> 
        </Switch>
      </Router>
    </div>
  );
}


export default App;
