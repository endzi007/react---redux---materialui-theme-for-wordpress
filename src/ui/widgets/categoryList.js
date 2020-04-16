import React, { useState } from 'react';
import { Grid, Typography } from "@material-ui/core";
import { TreeView, TreeItem } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const CategoriesWidget = ()=>{
    const categories = useSelector(store => store.serverData.categories);
    let categoriesThree = buildCatTree(categories);
    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);
    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
        console.log(nodeIds, event.target);
    };    

    return <Grid item>
        <Typography variant="h6">Categories</Typography>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
               {
                    categoriesThree
               }
            </TreeView>
    </Grid>
}

export default CategoriesWidget;

function buildCatTree(catArr){
    let arr = catArr.map((cat, i)=>{
        let children = [];
        if(cat.children !== undefined){
             children.push(buildCatTree(cat.children))
        } 
        return <TreeItem key={cat.id} nodeId={`${cat.id}_${i}`} label={cat.name}>{children}</TreeItem>
    });
    return arr;
}