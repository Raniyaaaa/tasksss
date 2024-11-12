import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import AboutUs from "./Pages/AboutUs";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import VerifyEmailPage from "./Pages/EmailVerification";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";

function App() {
return(
  <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/verifyEmail' element={<VerifyEmailPage/>}/>
    </Routes>
  </Router>
)
}

export default App;
