import React from "react";

const MainContext = React.createContext({
  token: '',
  userId: '',
  isLoggedIn: false,
  login: (token, userId) => {},
  logout: () => {},
  settingUserId:()=>{}
});

export default MainContext;
