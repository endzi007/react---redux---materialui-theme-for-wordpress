import React from 'react';
import { Grid,Typography} from "@material-ui/core";
import { useSelector } from 'react-redux';

const TagWidget = ()=>{
    const tags = useSelector(store => store.serverData.tags);

    return <Grid item>
        <Typography variant="h6">Tags</Typography>
        {tags.map((tag)=>{
            return <Grid item xs={12}>{tag.name}</Grid>
        })}
    </Grid>
}

export default TagWidget;