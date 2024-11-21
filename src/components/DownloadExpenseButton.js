import React from 'react';
import { Button } from 'react-bootstrap';
import { CgDarkMode } from 'react-icons/cg';
import { useSelector } from 'react-redux';

const DownloadExpensesButton = () => {
    const expenses = useSelector(state => state.expense.expense);
    const darkMode =useSelector(state => state.theme.darkMode)
    console.log(expenses)
    const downloadCSV = () => {
        const header = ['Amount', 'Description', 'Catagory'];
        const rows = expenses.map(expense => [
            expense.Amount,
            expense.Description,
            expense.Category,
        ]);

        const csvContent = [
            header.join(','),
            ...rows.map(row => row.join(',')),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'expenses.csv';
        link.click();
    };

    return (
        <Button variant={darkMode? 'light':"dark"} onClick={downloadCSV}>
            Download Expense
        </Button>
    );
};

export default DownloadExpensesButton;
