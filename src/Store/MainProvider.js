// // import { useState } from "react"
// // import MainContext from "./MainContext";

// // const MainProvider=(props)=>{

// //     const initialToken = localStorage.getItem('token');
// //     const [token, setToken] = useState(initialToken);

// //     const userIsLoggedIn = !!token;

// //     const loginHandler = (token) => {
// //         setToken(token);
// //         localStorage.setItem("token", token);
// //         console.log("Token inside MainProvider:", token); // Check the value of the token
// //     };
// //     const logoutHandler=()=>{
// //         setToken(null);
// //         localStorage.removeItem('token')
// //     }

// //     const contextValue = {
// //         token: token,
// //         isLoggedIn: userIsLoggedIn,
// //         login: loginHandler,
// //         logout: logoutHandler
// //     };

// //     return(
// //         <MainContext.Provider value={contextValue}>
// //             {props.children}
// //         </MainContext.Provider>
// //     )
// // }

// // export default MainProvider;

// import { useState } from "react"
// import MainContext from "./MainContext";

// const MainProvider = (props) => {
//     const initialToken = localStorage.getItem('token');
//     const initialId = localStorage.getItem('userId');
//     const [token, setToken] = useState(initialToken);
//     const [userId, setUserId] = useState(initialId);
  
//     const userIsLoggedIn = !!token;
  
//     const loginHandler = (token, userId) => {
//       setToken(token);
//       setUserId(userId);  // Store userId when logging in
//       localStorage.setItem("token", token);
//       localStorage.setItem("userId", userId);  // Store userId in localStorage as well
//       console.log("Token inside MainProvider:", token); 
//     };
  
//     const logoutHandler = () => {
//       setToken(null);
//       setUserId(null);
//       localStorage.removeItem('token');
//       localStorage.removeItem('userId');
//     };
  
//     const settingUserId=(id)=>{
//         setUserId(id)
//     }
    
//     const contextValue = {
//             token: token,
//             userId: userId,  // Use userId directly in context
//             isLoggedIn: userIsLoggedIn,
//             login: loginHandler,
//             logout: logoutHandler
//     };
  
//     return (
//       <MainContext.Provider value={contextValue}>
//         {props.children}
//       </MainContext.Provider>
//     );
//   };
  
//   export default MainProvider;
  
import { useState } from "react";
import MainContext from "./MainContext";

const MainProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialId = localStorage.getItem('userId');
  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialId);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, userId) => {
    setToken(token);
    setUserId(userId);  // Store userId when logging in
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);  // Store userId in localStorage as well
    console.log("Token inside MainProvider:", token);
  };

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  const settingUserId = (id) => {
    setUserId(id);
  };

  const contextValue = {
    token: token,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    settingUserId: settingUserId,
  };

  return (
    <MainContext.Provider value={contextValue}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainProvider;
