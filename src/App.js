import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './App.css';
import Header from "./ui/header/header";
import Footer from "./ui/footer/footer";
import Content from "./ui/content/content";
import { makeStyles, CssBaseline } from '@material-ui/core';
import { sendQueryRequest } from "./state/fetchingData/queryClient";
import { getAllCategories } from "./state/fetchingData/categoryQueries";
import { getAllPages } from "./state/fetchingData/pageQueries";
import { getAllTags } from "./state/fetchingData/tagQueries";
import { getAllPosts } from "./state/fetchingData/postQueries";
import { creators as serverDataActions } from "./state/serverData/serverDataDuck";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";


const styles = makeStyles(theme=>({
    root: {
      width: "80vw",
      margin: "0 auto",
      minHeight: "100vh",
      position: "relative"
    }
}))
function App() {
  const text = useSelector(store=>store.text)
  const dispatch = useDispatch();
  const classes = styles();
  useEffect(()=>{

  sendQueryRequest([getAllCategories("name id")]).then((data)=>{
      dispatch(serverDataActions.addCategories(data.data.categories));
  }) 
   sendQueryRequest([getAllPages("title content id"), getAllPosts("title id excerpt featuredImage{sourceUrl}"), getAllTags("name")]).then((data)=>{
      dispatch(serverDataActions.addPages(data.data.pages));
      dispatch(serverDataActions.addLatestPosts(data.data.posts));
      dispatch(serverDataActions.addTags(data.data.tags));
 })

    }, []);
  return (
      <div className={classes.root}>
        <Router>
          <CssBaseline />
          <Header />
            <Switch>
                <Route exact path="/"> <Content /></Route>
                <Route exact path="/category:id"></Route>
                <Route exact path="/post:id"></Route>
            </Switch>
          <Footer />
        </Router>
      </div>
  );
}

export default App;
