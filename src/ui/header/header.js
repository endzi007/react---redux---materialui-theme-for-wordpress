import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Grid } from "@material-ui/core";
import HeaderNavBar from "../widgets/headerMenu";



const styles = makeStyles(theme =>{
    return ({
    toolbar:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        "& ul":{
            listStyle: "none",
            margin: 0,
            padding: 0
        },
        "& a":{
            textDecoration: "none",
            color: "inherit"
        }
    },
    navbar: (props)=>({
        height: props.navSize,
        padding: "0 1rem",
        border: props.border,
        width: "100%",
        alignItems: "flex-end",
    }),
    navbarNav:{
        height: "100%",
        display: "flex",
        justifyContent: "flex-end"
    },
    navItem: props =>({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative"
    }),
    iconButton: props =>({
        "--button-size": `calc(${props.navSize}) * 0.5`,
        width: "var(--button-size)",
        height: "var(--button-size)",
        borderRadius: "50%",
        padding: "5px",
        margin: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }),
    dropdown: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "58px",
        backgroundColor: theme.palette.primary.main,
        padding: "1rem",
        minWidth: "100%"
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
                    <Grid container>
                        <HeaderNavBar />
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
}

export default Header;


