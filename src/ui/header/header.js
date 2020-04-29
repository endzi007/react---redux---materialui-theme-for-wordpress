import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Grid } from "@material-ui/core";
import DropdownMenu from "../widgets/dropdownMenu";



const styles = makeStyles(theme =>{
    return ({
        navBar: {
            alignItems: "right"
        }
})})

const Header = ()=>{
    const classes = styles({navSize: "60px", border: "1px solid #474a4d", borderRadius: "8px", speed: "500ms"});
    return <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
            <Grid container>
                <Grid item sm="3">
                    <Grid container>
                        <Typography variant="h5">Logo</Typography>
                    </Grid>
                </Grid>
                <Grid item sm="9">
                    <Grid container className={classes.navBar}>
                        <DropdownMenu />
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
}

export default Header;


