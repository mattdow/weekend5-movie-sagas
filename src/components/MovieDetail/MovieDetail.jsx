// creating a component to display the movie details
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardHeader, CardMedia, Typography, Button, CardActionArea } from '@mui/material';
import './MovieDetail.css';


// show the selected movie data from Redux
function MovieDetail() {
    // set dispatch as a variable for use
    const dispatch = useDispatch();
    // set history as a variable for use
    const history =  useHistory();
    // grab the movie ID number from the react router params
    let { id } = useParams();
    console.log(id);
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
    console.log('In movie details for', selection);

    // grab the genres for the selected movie from Redux
    const selectedGenres = useSelector((store) => store.selectedGenres);
    
    useEffect(() => {
       dispatch({ type: 'FETCH_MOVIES'});
       dispatch({ type: 'FETCH_SELECTED_GENRES', payload: id}); 
    }, []);

    // grab the movie genres from Redux
 
    console.log('In Movie Detail', selectedGenres);
    return (
        <section className="detail-page">
            
            {
                selection.title ? (
                    <Card  sx={{m:4, maxWidth: '50%'}}>
                        
                            <Typography variant="h5"
                                        fontWeight="bold"
                                        sx={{m:2}}>{selection.title}</Typography>
                       
                        <CardMedia 
                            sx={{mb:2}}
                            component="img"
                            src={selection.poster} 
                            alt={selection.title}/>
                        {selectedGenres.map((genre) => (
                            <Typography sx={{m:2}} variant="body">{genre.name}</Typography>
                        ))}
                        <CardActionArea>
                            <Button size='large' variant="outlined" sx={{m:2}}
                            color="secondary" onClick={() => history.push('/')}>Back To Movie List</Button>
                            <Button size='large' variant="outlined" sx={{m:2}}
                            color="success"onClick={() => history.push(`/edit/${id}`)}>Edit Movie</Button>
                        </CardActionArea>
                    </Card>
                ) : (
                    <Typography gutterBottom variant="h4">No movie selected.</Typography>
                )
            }
            
        </section>
    );
} // end of MovieDetail

export default MovieDetail;