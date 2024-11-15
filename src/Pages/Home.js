import { useState, useEffect } from "react";
import { Navbar, Alert, Button, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ExpenseList from "../components/ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthSlice";
import { addExpense, editExpense, fetchExpenses, deleteExpense } from "../Store/ExpenceSlice";
import ThemeToggleButton from "../components/ThemeToggleButton";
import classes from "./Home.module.css"
import { toggleTheme } from "../Store/ThemeSlice";
import DownloadExpensesButton from "../components/DownloadExpenseButton";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Exdispatch =useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const Expense =useSelector((state) => state.expense.expense);
  const email=useSelector(state => state.expense.email);
  const isPremium = useSelector((state) => state.expense.premium);
console.log('Is Premium:', isPremium);
  const [formVisibility, setFormVisibility] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const darkMode =useSelector(state=> state.theme.darkMode)
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prevState) => !prevState);
    setEditingExpense(null);
    resetForm();
  };
  

  useEffect(() => {
    if (userId) {
      Exdispatch(fetchExpenses(email));
    }
  }, [userId]);

  
  const resetForm = () => {
    setAmount('');
    setDescription('');
    setCategory('');
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const newExpense = {
      Amount: amount,
      Description: description,
      Category: category,
    };


    try {
      if (editingExpense) {
        Exdispatch(editExpense({ id:editingExpense.id, newExpense, email }));
      } else {
        Exdispatch(addExpense({ newExpense, email }));

      }
      setEditingExpense(null);
      toggleFormVisibility();
    } catch (error) {
      console.error(
        'Error adding expense:',
        error.response ? error.response.data : error.message
      );
      alert('Error occurred while adding the expense.');
    }
  };

  const deleteExpenseHandler = async (id) => {
    Exdispatch(deleteExpense({ id, email }));
  };

  const editExpenseHandler = (expense) => {
    setEditingExpense(expense);
    setFormVisibility(true);
    setAmount(expense.Amount);
    setDescription(expense.Description);
    setCategory(expense.Category);
  };
  const PremiumHandler=()=>{
    dispatch(toggleTheme())
  }

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
        {console.log(isPremium)}
        <Button variant="danger" onClick={logoutHandler}>
          LOG OUT
        </Button>
        {isPremium && <ThemeToggleButton/>}
        <Alert
          variant={'danger'}
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: 0,
            padding: '0.5rem 1rem',
            
          }}
        >
          <span style={{ marginRight: '0.5rem' }}>Your profile is incomplete.</span>
          <Link to="/profile" style={{ color: '#0d6efd', fontWeight: 'bold' }}>
            Complete now
          </Link>
        </Alert>
      </Navbar>
      <div style={{ display: 'flex', justifyContent:'center',paddingTop:'2rem' }}>
        {isPremium && (
          <Button  
            style={{color:'white',marginRight:'2rem'}}
            variant="warning"
            onClick={PremiumHandler}
          >
            Activate Premium
          </Button>
        )}
        {isPremium && (
            < DownloadExpensesButton/>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem', marginBottom: '4rem' }}>
        <section
          style={{
            border: darkMode ? '1px solid white' : '1px solid #ccc',
            borderRadius: '2px',
            padding: '2rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            width: '350px',
            textAlign: 'center',
            backgroundColor: darkMode ? '#1e1e1e' : 'white',
          }}
        >
          {!formVisibility && (
            <Button variant="outline-danger" type="button" onClick={toggleFormVisibility}>
              Add Expenses
            </Button>
          )}
          {formVisibility && (
            <form onSubmit={submitHandler}>
              <div className="mt-4">
                <FloatingLabel label="Enter Amount" controlId="amount">
                  <input
                    className="form-control"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ height: '35px', fontSize: '14px',backgroundColor: darkMode ? '#333' : 'white',
                      color: darkMode ? 'white' : 'black', }}
                    required
                  />
                </FloatingLabel>
              </div>
              <div className="mt-4">
                <FloatingLabel label="Description" controlId="description">
                  <input
                    className="form-control"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ height: '35px', fontSize: '14px',backgroundColor: darkMode ? '#333' : 'white',
                      color: darkMode ? 'white' : 'black', }}
                    required
                  />
                </FloatingLabel>
              </div>
              <div className="mt-4">
                <FloatingLabel label="Category" controlId="category">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control"
                    style={{backgroundColor: darkMode ? '#333' : 'white',
                      color: darkMode ? 'white' : 'black',}}
                    required
                  >
                    <option value="" disabled hidden>
                      Select Category
                    </option>
                    <option>Food</option>
                    <option>Petrol</option>
                    <option>Salary</option>
                  </select>
                </FloatingLabel>
              </div>
              <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="danger"
                  type="submit"
                  className="mt-3"
                  style={{ marginRight: '4rem' }}
                >
                  Submit Expense
                </Button>
                <Button
                  variant="outline-danger"
                  type="button"
                  className="mt-3"
                  onClick={toggleFormVisibility}
                >
                  Close
                </Button>
              </div>
            </form>
          )}
        </section>
      </div>

      <div style={{ paddingRight: '6rem', paddingLeft: '6rem' }}>
        <section>
          {Expense.length > 0 && <h2>Expenses...</h2>}
          <ExpenseList
            expenses={Expense}
            onDeleteExpense={deleteExpenseHandler}
            onEditExpense={editExpenseHandler}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
