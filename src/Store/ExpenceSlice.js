import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchExpenses = createAsyncThunk('expense/fetchExpenses', async (email) => {
    console.log("Raniya")
    const firebaseUrl = `https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${email}.json`;
    try {
        const response = await axios.get(firebaseUrl);
        if (response.data) {
            return Object.keys(response.data).map((key) => ({
                id: key,
                ...response.data[key],
            }));
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching expenses:', error);
        return [];
    }
});

export const editExpense = createAsyncThunk('expense/editExpense', async ({ id, newExpense, email }) => {
    const firebaseUrl = `https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`;
    try {
        await axios.put(firebaseUrl, newExpense);
        return { id, newExpense };
    } catch (error) {
        console.error('Error editing expense:', error);
        throw new Error('Failed to update expense');
    }
});

export const addExpense = createAsyncThunk('expense/addExpense', async ({ newExpense, email }) => {
    const firebaseUrl = `https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${email}.json`;
    try {
        const response = await axios.post(firebaseUrl, newExpense);
        return { id: response.data.name,...newExpense };
    } catch (error) {
        console.error('Error adding expense:', error);
        throw new Error('Failed to add expense');
    }
});

export const deleteExpense = createAsyncThunk('expense/deleteExpense', async ({ id, email }) => {
    const firebaseUrl = `https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`;
    try {
        await axios.delete(firebaseUrl);
        return id;
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw new Error('Failed to delete expense');
    }
});

const calculateTotal = (expenses) => {
    return expenses.reduce((totalAmount, expense) => {
        const amount = Number(expense.Amount);
        if (amount) {
            return totalAmount + amount;
        }
        return totalAmount; 
    }, 0);
};;


const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        expense: [],
        email: localStorage.getItem('userId') ? localStorage.getItem('userId').replace(/[@.]/g, '') : '',
        premium: false,
        totalAmount: 0,
    },
    reducers: {
        togglePremium: (state) => {
            state.premium = !state.premium;
        },
        resetExpenses: (state) => {
            state.expense = [];
            state.premium = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.expense = action.payload;
                state.totalAmount = calculateTotal(state.expense);
                state.premium = state.totalAmount >= 10000;
                console.log(" Total ",state.totalAmount)
            })
            .addCase(editExpense.fulfilled, (state, action) => {
                state.expense = state.expense.map((expense) =>
                    expense.id === action.payload.id ? { ...expense, ...action.payload.newExpense } : expense
                );
                state.totalAmount = calculateTotal(state.expense);
                state.premium = state.totalAmount >= 10000;
                console.log(" Total ",state.totalAmount)
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.expense.push(action.payload);
                state.totalAmount = calculateTotal(state.expense);
                state.premium = state.totalAmount >= 10000;
                console.log(" Total ",state.totalAmount)
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.expense = state.expense.filter((expense) => expense.id !== action.payload);
                state.totalAmount = calculateTotal(state.expense);
                state.premium = state.totalAmount >= 10000;
                console.log(" Total ",state.totalAmount)
            });
    },
});

export const { togglePremium, resetExpenses } = expenseSlice.actions;

export default expenseSlice.reducer;
