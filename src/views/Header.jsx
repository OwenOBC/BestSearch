import React from "react";
import { AppBar,Toolbar,Typography } from "@mui/material";

const Header = ()=>{
    const toHome = ()=>{
        window.location.href='/home'
    }
    return (
        <AppBar>
          <Toolbar>
            <Typography variant="h5" component="div" onClick={toHome} style={{cursor:'pointer'}}>
              <strong>Best</strong>search
            </Typography>
          </Toolbar>
        </AppBar>
    )
}

export default Header;