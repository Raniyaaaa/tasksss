import { createSlice,configureStore } from "@reduxjs/toolkit";
import { useState } from "react";
import axios from "axios";

const initialExpenseState={
    expense: [],

}

const expenseSlice = createSlice({
    name:'expense',
    initialState: initialExpenseState,
    reducers: {
        async fetchExpenses(state,action){
            const firebaseUrl = `https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${action.payload.email}.json`;
            try {
                const response = await axios.get(firebaseUrl);
                if (response.data) {
                    const expensesList = Object.keys(response.data).map((key) => ({
                        id: key,
                        ...response.data[key],
                    }));
                state.expense(expensesList);
                } else {
                    state.expense([]);
                }
            } catch (error) {
            console.error('Error fetching expenses:', error);
            }
        },
        async editExpense(state,action){
            const firebaseUrl = `https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${action.payload.email}`;
            await axios.put(`${firebaseUrl}/${action.payload.expense.id}.json`, action.payload.expense.id);
            state.expense((prev) =>
                prev.map((expense) =>
                    expense.id === action.payload.expense.id ? { id: expense.id, ...action.payload.expense.id } : expense
                )
            );
            alert('Expense successfully updated!');
        },
        async addExpense(state,action){
            const firebaseUrl = `https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${action.payload.email}`;
            const response = await axios.post(`${firebaseUrl}.json`, action.payload.newExpense);
            state.expense((prev) => [
                ...prev,
                { id: response.data.name, ...action.payload.newExpense },
            ]);
            alert('Expense added successfully!');
        }
    }
})

export const expenseActions = expenseSlice.actions;

const store = configureStore({
    reducer: { expense: expenseSlice.reducer },
});

export default store;