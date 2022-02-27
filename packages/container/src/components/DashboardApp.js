import {mount} from "dashboard/DashboardApp";
import React, {useRef, useEffect} from "react";

export default () => {
    const ref = useRef(null);

    useEffect(()=>{
        console.log('inside dashboard');
        mount(ref.current); 
    },[]);

    return(
        <div ref={ref}/>
    );
};