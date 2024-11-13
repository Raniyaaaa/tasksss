import { useContext, useState, useRef } from "react";
import { Navbar, Alert,Button, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainContext from "../Store/MainContext";
import ExpenseList from "../components/ExpenseList";

const Home = () => {

  const mainContext=useContext(MainContext)
  const navigate=useNavigate();
  const [formVisibility,setFormVisibility]=useState(false);
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const [expenses,setExpenses]=useState([])
  const logoutHandler=()=>{
    mainContext.logout();
    navigate('/')
  }
  const toggleFormVisibility=()=>{
    setFormVisibility(prevState=>!prevState)
  }
  const submitHandler=(event)=>{
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const selectedCategory = event.target.category.value;
    setExpenses(prev => [
      ...prev,
      {
        Amount: enteredAmount,
        Description: enteredDescription,
        Category: selectedCategory,
        id: Math.random()
      }
    ]);
    toggleFormVisibility()
  }
  
  return (
    <>
      <Navbar style={{ border: '1px solid black', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem', padding: '0 1rem' }}>
        <Navbar.Brand>Welcome to Expense Tracker!!!</Navbar.Brand>
        <Button variant="danger" onClick={logoutHandler}>LOG OUT</Button>
        <Alert variant="danger" style={{ display: 'flex', alignItems: 'center', margin: 0, padding: '0.5rem 1rem' }}>
          <span style={{ marginRight: '0.5rem' }}>Your profile is incomplete.</span>
          <Link to='/profile' style={{ color: '#0d6efd', fontWeight: 'bold' }}>Complete now</Link>
        </Alert>
      </Navbar>
      <div  style={{ display: 'flex', justifyContent: 'center',marginTop:'4rem',marginBottom:'4rem' }}>
        <section style={{
                border:'1px solid #ccc',
                borderRadius:'2px',
                padding:'2rem',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                width:'350px',
                textAlign:'center'
                }}>
          {!formVisibility && (<Button variant="outline-danger" type='button' onClick={toggleFormVisibility} >Add Expenses</Button>)}
          {formVisibility && (<form onSubmit={submitHandler}>
            <div className="mt-4">
              <FloatingLabel label="Enter Amount" controlId="amount">
                <input
                  className="form-control"
                  type="number"
                  ref={amountInputRef}
                  style={{ height: "35px", fontSize: "14px" }}
                  required
                  />
                </FloatingLabel>
              </div>
              <div className="mt-4">
                <FloatingLabel label="Description" controlId="description">
                  <input
                    className="form-control"
                    type="text"
                    ref={descriptionInputRef}
                    style={{ height: "35px", fontSize: "14px" }}
                    required
                  />
                </FloatingLabel>
              </div>
              <div  className="mt-4">
                < FloatingLabel label="Category" controlId="category">
                  <select className="form-select" name="category" required>
                    <option value="" disabled selected hidden>
                    </option>
                    <option>Food</option>
                    <option>Petrol</option>
                    <option>Salary</option>
                  </select>
                </FloatingLabel>
              </div>
              <div className="mt-4" style={{display:'flex',justifyContent:'center'}}>
                <Button variant="danger" type="submit" className="mt-3" style={{marginRight:'4rem'}}>
                  Submit Expense
                </Button>
                <Button variant="outline-danger" type="button" className="mt-3" onClick={()=>{toggleFormVisibility()}}>
                  Close
                </Button>
              </div>
          </form>)}
        </section>
      </div>
      <div style={{paddingRight:'6rem',paddingLeft:'6rem'}}>
        <section>
          {expenses.length>0 && <h2>Expenses...</h2>}
          <ExpenseList expenses={expenses}/>
        </section>
      </div>
    </>
  );
}

export default Home;
