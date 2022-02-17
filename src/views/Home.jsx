import React, { useEffect } from "react";
// import { styled } from '@mui/material/styles';
import { Box,Grid,AppBar,Typography,IconButton,Input,CssBaseline,Toolbar,Container } from "@mui/material";
import Search from '@mui/icons-material/Search'

import { connect } from 'react-redux'
//  import Home from '../components/home'
import {inputAction} from '../actions/index.js'

const Home =(props)=>{  
    const toHome = ()=>{
        window.location.href='/home'
    }
    const onKeyDownchange = (e)=>{
        if(e.keyCode===13){
            search();   
        }
    } 
    const search = ()=>{  
        if(props.State.keyWord==""){
            return;
        }
        props.history.push({
            pathname:'/Search/'+props.State.keyWord,
        })     
    }
    const valChange = (e)=>{
        var val = e.target.value;
        val = val.replaceAll(" ", "+");
        props.inputChange(val);
    }
    return (
        <>
        <Box>
            <CssBaseline />
            <AppBar position="static" color="transparent">
            <Toolbar>
                <Typography variant="h5" component="div" onClick={toHome} style={{cursor:'pointer'}}>
                <strong>Best</strong>search
                </Typography>
            </Toolbar>
            </AppBar>
            <Toolbar /> 
            </Box>
            <div style={{marginTop:'40px'}}>
                <Typography variant="h5" component="div" align='center' mt={2}>
                    Search Trends
                </Typography>
            </div>
            <Container>
                <Box sx={{ my: 2 }}>
                <Grid container>
                    <Grid item xs={10}>
                        <Input id="search-key" defaultValue={props.State.keyWord} onChange={e=>valChange(e)}  fullWidth autoFocus onKeyDown={e=>onKeyDownchange(e)} placeholder="Search for new products in 961K stores" variant="outlined" ></Input>
                    </Grid>
                    <Grid item xs={2}>
                    <IconButton aria-label="search" onClick={search}>
                        <Search />
                    </IconButton>
                    </Grid>
                </Grid>
                </Box>
            </Container>
        
        </>
    )
}

 function mapStateToProps(state) {
     return {
        State: state.State
     }
 }
 function mapDispatchToProps(dispatch) {
     return {
        inputChange:(e)=>dispatch(inputAction(e))
     }
 }


 let HomePage =  connect(
     mapStateToProps, mapDispatchToProps
 )(Home)
 
 export default HomePage
 