// import logo from './logo.svg';
import './App.css';
import React from 'react'
import "./index.css";
// import Main from './views/Main';
import { Route, BrowserRouter as Router, Switch, Redirect,Link } from 'react-router-dom';
import Home from './views/Home'
import Search from './views/Search'

// import "./index.css";
import { AppBar, Container, Toolbar,Typography,CssBaseline,Box } from '@mui/material';

const App = ()=> {

  return (
    <>
      {/* <CssBaseline />
        <Header/>
      <Toolbar /> */}
      {/* <Container>
        <Box sx={{ my: 2 }}> */}
        <Router>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/Search/:id" component={Search} />
            <Redirect to='/home'></Redirect>
          </Switch>
        </Router>
        {/* </Box>
      </Container> */}
    </>
  );
}

export default App;
