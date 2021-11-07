import React from 'react';
import { Button } from '@mui/material';
import { Typography, Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    const history = useHistory();
    return (
        <Grid className="nav-bar" container justifyContent="space-evenly" alignItems="center">
            <Typography 
                sx = {{m:2, display: 'inline-block', fontStyle: 'oblique', fontWeight: 'bold',}}
                variant='h4'>THE MOVIES SAGA</Typography>
            <Button
                sx = { {m:2, display:'inline-block'} }
                size = "large"
                onClick={(event) => {history.push('/')}}
            >HOME</Button>
            <Button
                sx = { {m:2, display:'inline-block'} }
                size = "large"
                
                onClick={(event) => {
                    console.log(history);
                    history.push('/add')}}
            >ADD Movie</Button>
        </Grid>
    )
} 
export default Navbar;