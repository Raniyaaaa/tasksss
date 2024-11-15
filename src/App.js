import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import AboutUs from "./Pages/AboutUs";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import VerifyEmailPage from "./Pages/EmailVerification";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import { useSelector } from "react-redux";

function App() {

  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={isLoggedIn ? <Products /> : <Navigate to="/" />} />
        <Route path="/aboutus" element={isLoggedIn ? <AboutUs /> : <Navigate to="/" />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
        <Route path="/verifyEmail" element={isLoggedIn ? <VerifyEmailPage /> : <Navigate to="/" />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
