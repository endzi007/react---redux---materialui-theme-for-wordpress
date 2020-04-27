import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { makeStyles, Typography, Grid, Card, CardContent, Button } from "@material-ui/core";
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
        transform: "translateY(62px)",
        minWidth: "150px",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.7s linear",
        "&:hover":{
            cursor: "pointer"
        }
    },
    menuitem: {
        display: "flex",
        padding: theme.spacing(1)
    },
    dropdownitem: {
        display: "flex"
    }
}))
//reducer


export default (props)=>{
    let menuItems = useSelector((store)=>{
        return store.serverData.primaryMenu
    });
    const menuReducer = (state, action)=>{
        let newState = {...state};
        switch (action.type) {
            case "DISPLAY_MENU":
                newState.displayMenu = action.payload;
                break;
            case "DROPDOWN_CATEGORY":
                newState.dropdownCategory = action.payload;    
                break;
            case "SHOW_DROPDOWN":
                newState.showDropdown = !newState.showDropdown;
                break;
            default:
                return newState;
        }
        return newState;
    }
    const [ state, dispatch ] = useReducer( menuReducer, {
        displayMenu: [],
        dropdownCategory: "",
        showDropdown: false,
    });

    useEffect(()=>{
        let temp = menuItems.map((item)=>{
            let icon = ""
            if(item.parent === null){
                if("childItems" in item){
                    if(item.childItems.nodes !== undefined && item.childItems.nodes.length > 0){
                        icon = <ExpandMore/>;
                    }
                }
                return <MenuItem key={item.id} label={item.label} url={item.url} icon={icon} state={state} dispatch={dispatch}></MenuItem>
            }
        })
        dispatch({type: "DISPLAY_MENU", payload: temp});
    }, [menuItems])

return <MenuBar> {state.displayMenu}{<DropDown state={state} dispatch={dispatch.bind(this)} show={state.showDropdown} category={state.dropdownCategory}/>}</MenuBar>
}


const MenuBar = (props)=>{
    const classes = styles();
    return <Grid item className={classes.menuBar}>{props.children}</Grid>
}

const DropDown = (props)=>{
    const classes = styles();
    const [ dropdownItems, setDropdownItems ] = useState([[]]);
    const menuItems = useSelector((state)=> state.serverData.primaryMenu)
    const handleBackClick = (e)=>{
        let temp = [...dropdownItems];
        temp.pop();
        setDropdownItems(temp);
    }
    useEffect(()=>{
        if(props.show){
            let temp = [];
            menuItems.forEach((item)=>{
                let icon = false; 
                if("childItems" in item && item.childItems.nodes !== undefined){
                    if(item.childItems.nodes.length >= 0){
                        icon = true
                    }
                } else {
                    icon = false
                }
                if(item.parent === props.category){
                    temp.push(<DropDownItem  
                        key={item.id} 
                        label={item.label} 
                        url={item.url} 
                        dispatch={props.dispatch}
                        state={props.state}
                        icon={icon}></DropDownItem>)
                }
            })
            setDropdownItems([...dropdownItems, temp]);
        } else {
            setDropdownItems(dropdownItems.slice(0,2))
        }
    }, [props.category])
    return (
        <Card className={classes.dropdown} style={{display: props.show? "flex": "none"}}>
            <CardContent>
                <Button disabled={dropdownItems.length <= 2? true: false} onClick={handleBackClick}>Go back</Button>
                {dropdownItems[dropdownItems.length-1]}
            </CardContent>
       </Card>
    )
}

const MenuItem = (props)=>{
    const classes = styles();
    return <div className={classes.menuitem}><Typography onClick={(e)=>{
        props.dispatch({type: "SHOW_DROPDOWN", payload: "" })
        props.dispatch({type: "DROPDOWN_CATEGORY", payload: e.currentTarget.innerText })
    }} variant="body1">{props.label}</Typography>{props.icon}</div>
}

const DropDownItem = (props)=>{
    const classes = styles();
    return <div className={classes.dropdownitem}><Typography variant="body1">{props.label}</Typography>{props.icon? <ArrowRightAlt onClick = {()=>{
        props.dispatch({type: "DROPDOWN_CATEGORY", payload: props.label});
    }} />: ""}</div>
}