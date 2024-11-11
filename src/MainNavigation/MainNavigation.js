import React from 'react';
import { Container, Navbar, NavLink } from 'react-bootstrap';

const MainNavigation=()=>{
    return(
        <Navbar bg="white">
            <Container>
                <NavLink style={{color:'powderblue',fontSize:'2rem' }}>MyWebLink</NavLink>
                <NavLink to='/home' style={{color: 'grey'}}>Home</NavLink>
                <NavLink to='/products' style={{color: 'grey'}}>Products</NavLink>
                <NavLink to='/aboutus' style={{color: 'grey'}}>About Us</NavLink>
            </Container>
        </Navbar>
    )
}

export default MainNavigation;