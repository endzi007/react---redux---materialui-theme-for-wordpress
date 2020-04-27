import React, { useEffect, useState } from 'react';
import CategoriesWidget from "../widgets/categoryList";
import { makeStyles, Grid } from "@material-ui/core";
import PageWidget from '../widgets/pageList';
import TagWidget from '../widgets/tagList';
import PostWidget from '../widgets/postsWidget';
import { useLocation } from 'react-router-dom';
import { creators as actions } from "../../state/serverData/serverDataDuck";
import { useDispatch } from 'react-redux';
import { sendQueryRequest } from "../../state/fetchingData/queryClient";
import { getPostByTitle } from '../../state/fetchingData/postQueries'

const styles = makeStyles(theme => ({
    root:{
        padding: "20px"
    }
}));

const SinglePost = ()=>{
    const location = useLocation();
    const dispatch = useDispatch();
    const classes = styles();
    const [ postContent, setPostContent ] = useState({content: ""});
    useEffect(()=>{
        console.log(location.pathname.substr(6));
        sendQueryRequest([getPostByTitle("title id featuredImage{sourceUrl} content",`${location.pathname.substr(6)}`)]).then((data)=>{
            console.log(data.data, "data data");
            let obj = {};
            Object.keys(data.data.posts.edges[0].node).map((key)=>{
                obj[key] = data.data.posts.edges[0].node[key];
            })
            setPostContent(obj);
            //dispatch(actions.addDisplayPosts(data.data));
        }).catch((e)=>{console.log(e)})
    }, [location.pathname]);
    return <Grid className={classes.root} container spacing={3}>
        <Grid item xs={12} sm={9}>
            <div dangerouslySetInnerHTML={{__html: postContent.content}}></div>
        </Grid>
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
    </Grid>
}

export default SinglePost;