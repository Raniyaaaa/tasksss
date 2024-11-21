import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Store/ThemeSlice";
import { BsToggle2Off} from "react-icons/bs";
import { Button } from "react-bootstrap";

const ThemeToggleButton =()=>{
    const dispatch=useDispatch();
    const darkMode = useSelector(state => state.theme.darkMode)

    const toggleHandler=()=>{
        dispatch(toggleTheme())
    }
    
    return(
        <Button variant={darkMode? 'light':'dark'} onClick={toggleHandler}><BsToggle2Off/></Button>
    )
}

export default ThemeToggleButton;