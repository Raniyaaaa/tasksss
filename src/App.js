import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import AboutUs from "./Pages/AboutUs";
import MainNavigation from "./MainNavigation/MainNavigation";
import Home from "./Pages/Home";

function App() {
return(
  <Router>
    <MainNavigation/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
  </Router>
)
}

export default App;
