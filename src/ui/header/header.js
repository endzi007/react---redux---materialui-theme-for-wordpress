import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Grid } from "@material-ui/core";
import DropdownMenu from "../widgets/dropdownMenu";
import { useHistory } from 'react-router-dom';



const styles = makeStyles(theme =>{
    return ({
        logoWrapper: {
            "&:hover":{
                cursor: "pointer"
            }
        }
})})

const Header = ()=>{
    const history = useHistory()
    const classes = styles({navSize: "60px", border: "1px solid #474a4d", borderRadius: "8px", speed: "500ms"});
    return <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
            <Grid container>
                <Grid item sm="3">
                    <Grid container className={classes.logoWrapper} onClick={()=>{history.push("/")}} >
                        <Typography variant="h5">Logo</Typography>
                    </Grid>
                </Grid>
                <Grid item sm="9">
                    <Grid container>
                        <DropdownMenu />
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
}

export default Header;


