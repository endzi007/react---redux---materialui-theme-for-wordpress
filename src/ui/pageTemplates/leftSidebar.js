import React, { useEffect, useState } from 'react';
import CategoriesWidget from "../widgets/categoryList";
import { makeStyles, Grid } from "@material-ui/core";
import PageWidget from '../widgets/pageList';
import TagWidget from '../widgets/tagList';
import PostWidget from '../widgets/postsWidget';
import { useLocation } from 'react-router-dom';
import { sendQueryRequest } from "../../state/fetchingData/queryClient";
import { getPostsByCategoryName, getAllPosts } from "../../state/fetchingData/postQueries";
import { creators as actions } from "../../state/serverData/serverDataDuck";
import { useDispatch } from 'react-redux';

const styles = makeStyles(theme => ({
    root:{
        padding: "20px"
    }
}));

const LeftSidebar = ()=>{
    const location = useLocation();
    const dispatch = useDispatch();
    const classes = styles();
    const [ postDisplay, setPostDisplay ] = useState("displayPosts");
    useEffect(()=>{
        sendQueryRequest([getPostsByCategoryName("title id excerpt featuredImage{sourceUrl}",`${location.pathname.substr(10, 100)}`)]).then((data)=>{
            dispatch(actions.addDisplayPosts(data.data));
        }).catch((e)=>{console.log(e)})
    }, [location.pathname]);
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
            <PostWidget displayCategory={postDisplay} />
        </Grid>

    </Grid>
}

export default LeftSidebar;