import React from 'react';
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
    root: {
        bottom: 0,
        top: "auto",
    }
}))

const Footer = ()=>{
    const classes = styles();
    return <React.Fragment> 
            <AppBar className={classes.root} position="relative">
                <Toolbar>
                    Footer
                </Toolbar>
            </AppBar>
    </React.Fragment> 
}

export default Footer;