import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles, Typography, Grid, Card, CardContent, List, ListItem, ListItemText } from "@material-ui/core";
import { ExpandMore, ArrowRightAlt } from "@material-ui/icons";

const styles = makeStyles(theme =>({
    menuBar: {
        minWidth: "150px",
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "stretch",
        width: "100%",
        paddingTop: "10px"
    },
    dropdown: {
        flexDirection: "column",
        position: "absolute",
        right: "8px",
        top: 0,
        transform: "translateY(calc(100% - 8px))",
        minWidth: "150px",
        justifyContent: "center",
        alignItems: "center"
    },
    menuitem: {
        display: "flex",
        padding: theme.spacing(1),
        alignSelf: "stretch"
    },
    dropdownitem: {
        display: "flex",
        padding: theme.spacing(1),
        alignSelf: "stretch"
    }
}))

export default (props)=>{
    const [ displayMenu, setDisplayMenu ] = useState([])
    let menuItems = useSelector((store)=>{
        return store.serverData.primaryMenu
    });

    useEffect(()=>{
        let temp = menuItems.map((item)=>{
            let icon = ""
            if(item.parent === null){
                if("childItems" in item){
                    console.log(item, "item")
                    if(item.childItems.nodes !== undefined && item.childItems.nodes.length > 0){
                        icon = <ExpandMore/>;
                    }
                }
                return <MenuItem key={item.id} label={item.label} url={item.url} icon={icon}></MenuItem>
            }
        })
        setDisplayMenu([...temp]);
    }, [menuItems])

    return <MenuBar> {displayMenu} </MenuBar>
}


const MenuBar = (props)=>{
    const classes = styles();
    return <Grid item className={classes.menuBar}>{props.children}</Grid>
}

const DropDown = (props)=>{
    const classes = styles();
    const showItems = useSelector((store)=> store.serverData.primaryMenu);
    return (
        <Card className={classes.dropdown} style={{display: props.show? "flex": "none"}}>
            <CardContent>
                {
                    showItems.map((item)=>{
                        if(item.parent === props.category){
                        return <DropDownItem  key={item.id} label={item.label} url={item.url} icon={<ArrowRightAlt/>}></DropDownItem>
                        }
                    })
                }

            </CardContent>
       </Card>
    )
}

const MenuItem = (props)=>{
    const classes = styles();
    const [showDropdown, setShowDropdown ] = useState(false);
    const [ catToShow, setCatToShow ] = useState("");
    return <div className={classes.menuitem}><Typography onClick={(e)=>{
        setShowDropdown(!showDropdown)
        setCatToShow(e.currentTarget.innerText);
    }}variant="body1">{props.label}</Typography>{props.icon}<DropDown show={showDropdown} category={catToShow}/></div>
}

const DropDownItem = (props)=>{
    const classes = styles();
    const [showDropdown, setShowDropdown ] = useState(false);
    const [ catToShow, setCatToShow ] = useState("");
    return <div className={classes.dropdownitem}><Typography onClick={(e)=>{
        setCatToShow(e.currentTarget.innerText);
    }} variant="body1">{props.label}</Typography>{props.icon}<DropDown show={showDropdown} category={catToShow}/></div>
}