import React from "react";

const ExpenseList = (props) => {
  return (
    <div>
      <ul>
        {props.expenses.map((expense) => (
          <li key={expense.id} style={{
            margin: '10px 0',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9'
          }}>
            <div><strong>Amount:</strong> ${expense.Amount}</div>
            <div><strong>Description:</strong> {expense.Description}</div>
            <div><strong>Category:</strong> {expense.Category}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
