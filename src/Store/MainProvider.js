import { useState } from "react"
import MainContext from "./MainContext";

const MainProvider=(props)=>{

    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
        console.log("Token inside MainProvider:", token); // Check the value of the token
    };
    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token')
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return(
        <MainContext.Provider value={contextValue}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainProvider;