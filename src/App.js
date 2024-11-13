import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import MainContext from "./Store/MainContext";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import AboutUs from "./Pages/AboutUs";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import VerifyEmailPage from "./Pages/EmailVerification";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";

function App() {
  const mainContext = useContext(MainContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={mainContext.isLoggedIn ? <Products /> : <Navigate to="/" />} />
        <Route path="/aboutus" element={mainContext.isLoggedIn ? <AboutUs /> : <Navigate to="/" />} />
        <Route path="/home" element={mainContext.isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/profile" element={mainContext.isLoggedIn ? <Profile /> : <Navigate to="/" />} />
        <Route path="/verifyEmail" element={mainContext.isLoggedIn ? <VerifyEmailPage /> : <Navigate to="/" />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
