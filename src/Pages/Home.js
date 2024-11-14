import { useContext, useState, useEffect,useRef } from "react";
import { Navbar, Alert, Button, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainContext from "../Store/MainContext";
import ExpenseList from "../components/ExpenseList";
import axios from "axios";

const Home = () => {
  const mainContext = useContext(MainContext);
  const navigate = useNavigate();
  const [formVisibility, setFormVisibility] = useState(false);
  const amountInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  const [expenses, setExpenses] = useState([]);
  const [editingExpense,setEditingExpense]=useState(null);

  const logoutHandler = () => {
    mainContext.logout();
    navigate('/');
  };

  const toggleFormVisibility = () => {
    setFormVisibility((prevState) => !prevState);
    setEditingExpense(null)

  };
  const cleanedEmail = mainContext.userId ? mainContext.userId.replace(/[@.]/g, '') : '';
  useEffect(() => {
    if (mainContext.userId) {
      fetchExpenses(cleanedEmail);
    }
  }, [mainContext.userId]);


  const fetchExpenses = async () => {
    const firebaseUrl = `https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${cleanedEmail}.json`;

    try {
      const response = await axios.get(firebaseUrl);

      if (response.data) {
        const expensesList = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));
        setExpenses(expensesList);
      } else {
        setExpenses([]);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const selectedCategory = categoryInputRef.current.value;
  
    const newExpense = {
      Amount: enteredAmount,
      Description: enteredDescription,
      Category: selectedCategory,
    };
  
    const firebaseUrl = `https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${cleanedEmail}`;
  
    try {
      if (editingExpense) {
        console.log(editingExpense)
        console.log(editingExpense.id);
        await axios.put(`${firebaseUrl}/${editingExpense.id}.json`, newExpense);
        setExpenses((prev) =>
          prev.map((expense) =>
            expense.id === editingExpense.id ? { id: expense.id, ...newExpense } : expense
          )
        );
        alert('Expense successfully updated!');
      } else {
        const response = await axios.post(`${firebaseUrl}.json`, newExpense);
        console.log('Expense added:', response.data);
        setExpenses((prev) => [
          ...prev,
          { id: response.data.name, ...newExpense },
        ]);
        alert('Expense added successfully!');
      }
      setEditingExpense(null);
      toggleFormVisibility();
    } catch (error) {
      console.error('Error adding expense:', error.response ? error.response.data : error.message);
      alert('Error occurred while adding the expense.');
    }
  };
  

  const deleteExpenseHandler=async(id)=>{
    
    const firebaseUrl = `https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${cleanedEmail}/${id}.json`;

    try {
      await axios.delete(firebaseUrl);
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      console.log("Expense successfuly deleted :", id);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }
  
  const editExpenseHandler = (expense) => {
    setEditingExpense(expense);
    setFormVisibility(true);
    if (amountInputRef.current) {
      amountInputRef.current.value = expense.Amount;
    }
  
    if (descriptionInputRef.current) {
      descriptionInputRef.current.value = expense.Description;
    }
  
    if (categoryInputRef.current) {
      categoryInputRef.current.value = expense.Category; // Set category using ref
    }
    
  };

  useEffect(() => {
    if (!formVisibility) {
      if (amountInputRef.current) amountInputRef.current.value = '';
      if (descriptionInputRef.current) descriptionInputRef.current.value = '';
      if (categoryInputRef.current) categoryInputRef.current.value = '';
    }
  }, [formVisibility]);

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
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem', marginBottom: '4rem' }}>
        <section style={{
          border: '1px solid #ccc',
          borderRadius: '2px',
          padding: '2rem',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: '350px',
          textAlign: 'center'
        }}>
          {!formVisibility && (<Button variant="outline-danger" type='button' onClick={toggleFormVisibility}>Add Expenses</Button>)}
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
            <div className="mt-4">
            <FloatingLabel label="Category" controlId="category">
              <select ref={categoryInputRef} required defaultValue="">
                <option value="" disabled hidden>Select Category</option>
                <option>Food</option>
                <option>Petrol</option>
                <option>Salary</option>
              </select>
            </FloatingLabel>
            </div>
            <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="danger" type="submit" className="mt-3" style={{ marginRight: '4rem' }}>
                Submit Expense
              </Button>
              <Button variant="outline-danger" type="button" className="mt-3" onClick={toggleFormVisibility}>
                Close
              </Button>
            </div>
          </form>)}
        </section>
      </div>
      <div style={{ paddingRight: '6rem', paddingLeft: '6rem' }}>
        <section>
          {expenses.length > 0 && <h2>Expenses...</h2>}
          <ExpenseList expenses={expenses} setExpenses={setExpenses} onDeleteExpense={deleteExpenseHandler} onEditExpense={editExpenseHandler}/>
        </section>
      </div>
    </>
  );
};

export default Home;
