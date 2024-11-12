import { Navbar, Alert,Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  
  return (
    <>
      <Navbar style={{ border: '1px solid black', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem', padding: '0 1rem' }}>
        <Navbar.Brand>Welcome to Expense Tracker!!!</Navbar.Brand>
        
        <Alert variant="danger" style={{ display: 'flex', alignItems: 'center', margin: 0, padding: '0.5rem 1rem' }}>
          <span style={{ marginRight: '0.5rem' }}>Your profile is incomplete.</span>
          <Link to='/profile' style={{ color: '#0d6efd', fontWeight: 'bold' }}>Complete now</Link>
        </Alert>
      </Navbar>
    </>
  );
}

export default Home;
