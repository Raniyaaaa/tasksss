import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import AboutUs from "./Pages/AboutUs";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";

function App() {
return(
  <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}></Route>
    </Routes>
  </Router>
)
}

export default App;
