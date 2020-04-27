import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LeftSidebar from "../pageTemplates/leftSidebar";

const Content = (props)=>{
    const [ typeOfPage, setTypeOfPage ] = useState(props.type);
    const location = useLocation()
    useEffect(()=>{
        console.log(location, "changed")
    }, [location]);
    return <React.Fragment>
        <LeftSidebar />
    </React.Fragment>
}

export default Content;

