import React, { useEffect } from 'react';
import CategoriesWidget from "../widgets/categoryList";
import { makeStyles, Grid } from "@material-ui/core";
import PageWidget from '../widgets/pageList';
import TagWidget from '../widgets/tagList';
import PostWidget from '../widgets/postsWidget';
import { useLocation } from 'react-router-dom';


const styles = makeStyles(theme => ({
    root:{
        padding: "20px"
    }
}));

const LeftSidebar = ()=>{
    const location = useLocation();
    const classes = styles();
    useEffect(()=>{
        
    }, []);
    return <Grid className={classes.root} container spacing={3}>
        <Grid item xs={12} sm={3}>
            <Grid container>
                <CategoriesWidget /> 
            </Grid>
            <Grid container>
                <PageWidget />
            </Grid>
            <Grid container>
                <TagWidget />
            </Grid>
        </Grid>
        <Grid item xs={12} sm={9}>
            <PostWidget displayCategory="latestPosts" />
        </Grid>

    </Grid>
}

export default LeftSidebar;