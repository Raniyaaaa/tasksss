import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./Home.module.css"

const Home = () => {
  const navigate = useNavigate();
  const darkMode=useSelector(state => state.theme.darkMode)
  const gotoEmailVerifcation=()=>{
    navigate("/verifyEmail")
  }

  // const gotoProductsPage=()=>{
  //   navigate('/products')
  // }

  return (
    <div className={darkMode ? classes.darkMode : classes.lightMode}>
      <Navbar
        style={{
          border: '1px solid',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4rem',
          padding: '0 1rem',
        }}
      >
        <Navbar.Brand style={{color: darkMode ? 'white' : 'black',}}>Welcome to Expense Tracker!!!</Navbar.Brand>
      </Navbar>
      <div style={{display:'flex',justifyContent:'center',padding:'15rem',}}>
        <Button variant="outline-danger" onClick={gotoEmailVerifcation} type="button">Verfify Email</Button>
        {/* <Button variant="danger" onClick={gotoProductsPage} type="button"> Go to Expenses</Button> */}
      </div>
    </div>
  )
}

export default Home;