import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

const ButtonAppBar = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Wolfie Night Life
            </Typography>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Signup</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  

const Home = () => {
    return (
        <div className="App">
            <ButtonAppBar />
            <Grid container spacing={3}>
                <Grid item xs={12} style={{height: '200px'}} />
                <Grid item xs={2} />
                <Grid item xs={8}>
                    <Typography variant="h4" style={{fontWeight: 'bold'}}>Welcome to the Bar Owner Portal.</Typography>
                    <Typography variant="h5" style={{fontWeight: '300', marginTop: '20px'}} color="primary">Keep track of everything related to your bar, control your customers, and give yourself the ability to operate your bar from anywhere in the world.</Typography>
                </Grid>
                <Grid item xs={2} />

                <Grid item xs={12} style={{height: '100px'}} />

                <Grid item xs={2} />
                <Grid item xs={8}>
                    <Link style={{textDecoration: 'none', color: '#ffffff', backgroundColor: '#1976d2', padding: '20px', borderRadius: '10px', fontFamily: 'Sans-Serif'}} to={"/dashboard"}>Get Started</Link>
                </Grid>
                <Grid item xs={2} />
            </Grid>
        </div>
    );
}

export default Home;
