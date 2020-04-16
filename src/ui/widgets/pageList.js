import React from 'react';
import { Grid,Typography} from "@material-ui/core";
import { useSelector } from 'react-redux';

const PageWidget = ()=>{
    const pages = useSelector(store => store.serverData.pages);

    return <Grid item>
        <Typography variant="h6">Pages</Typography>
        {pages.map((page)=>{
            return <Grid item  key={page.id} xs={12}>{page.title}</Grid>
        })}
    </Grid>
}

export default PageWidget;