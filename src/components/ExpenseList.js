import React from "react";
import { Button,Col,Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const ExpenseList = (props) => {
const dispatch=useDispatch();
const darkMode =useSelector(state=> state.theme.darkMode)

  const editHandler=(expense)=>{

    props.onEditExpense(expense);

  }

  const deleteHandler=(id)=>{

    props.onDeleteExpense(id);

  }
  
  return (
    <div style={{padding:'2rem'}}>
      <ul>
        {console.log(props.expenses)}
        {props.expenses.map((expense) => (
          <li key={expense.id} style={{
            textDecoration:'none',
            margin: '10px 0',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: darkMode ? '#333' : 'white',
            color: darkMode ? 'white' : 'black',
          }}>
            <Row>
            <Col>
            <div><strong>Amount:</strong> { expense.Amount}</div>
            <div><strong>Description:</strong> { expense.Description}</div>
            <div><strong>Category:</strong> { expense.Category}</div>
            </Col>
            <Col>
            <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="outline-danger" type="button" className="mt-3" style={{ marginRight: '1rem' }} onClick={()=>editHandler(expense)}>
                Edit
              </Button>
              <Button variant="danger" type="button" className="mt-3" onClick={()=>deleteHandler(expense.id)}>
                Delete
              </Button>
            </div>
            </Col>
            </Row>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
