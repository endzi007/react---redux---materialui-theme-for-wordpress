import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, TextField} from "@material-ui/core";
import { searchQuery } from "../../state/fetchingData/postQueries";
import { sendQueryRequest } from "../../state/fetchingData/queryClient";
import { creators as actions } from "../../state/serverData/serverDataDuck";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
const SearchWidget = ()=>{
    const [ searchTerm, setSearchTerm ] = useState("");
    const handleChange = (e)=>{
        setSearchTerm(e.target.value);
    }
    const history = useHistory();
    const mouseUpHandler = (e)=>{
        if(e.keyCode === 13){
           history.push(`/search?s=${searchTerm}`)
        }
    }



    return <Grid item>
        <Typography variant="h6">Search: </Typography>
        <TextField id="standard-basic" onKeyUp={mouseUpHandler} label="Standard" value={searchTerm} onChange={handleChange}/>
    </Grid>
}

export default SearchWidget;