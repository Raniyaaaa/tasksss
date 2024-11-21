import { createSlice } from "@reduxjs/toolkit";

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
        premium: false,
        totalAmount: 0,
    },
    reducers: {
        togglePremium: (state) => {
            state.premium = !state.premium;
        },
        resetExpenses: (state, action) => {
            state.expense = action.payload;
            state.totalAmount = calculateTotal(state.expense);
            state.premium = state.totalAmount >= 10000;
        },
    },
});

export const fetchExpenses = () =>{
    const email = localStorage.getItem('userId') ? localStorage.getItem('userId').replace(/[@.]/g, '') : '';
    return async dispatch => {
        const fetchData = async ()=>{
            const response= await fetch(`https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${email}.json`)
            console.log(`https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${email}.json`)
        if(!response.ok){
            throw new Error("Could not fetch Data !")
        }
        const data=await response.json();
        return data
        }
        try{
            const expenseData= await fetchData();
            console.log(expenseData)
            const formattedData = Object.keys(expenseData).map((key) => ({
                id: key,
                ...expenseData[key],
            }));
            console.log('Formatted Data:', formattedData);
            dispatch(resetExpenses(formattedData))
        }catch(error){
            alert(error.message)
        }
    }
}

export const editExpense = ({ id, newExpense }) => {
    const email = localStorage.getItem('userId') ? localStorage.getItem('userId').replace(/[@.]/g, '') : '';
    return async dispatch => {
        const updateData = async () => {
            const firebaseUrl = `https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`;
            const response = await fetch(firebaseUrl, {
                method: 'PUT',
                body: JSON.stringify(newExpense),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to update expense');
            }
        };
        try {
            await updateData();
            console.log('Expense updated successfully');
            dispatch(fetchExpenses());
        } catch (error) {
            alert(error.message);
        }
    };
};

export const addExpense = ({ newExpense }) => {
    const email = localStorage.getItem('userId')?.replace(/[@.]/g, '') || '';
    return async (dispatch) => {
        try {
            const firebaseUrl = `https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${email}.json`;
            const response = await fetch(firebaseUrl, {
                method: 'POST',
                body: JSON.stringify(newExpense),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error('Failed to add expense');
            }
            dispatch(fetchExpenses());
        } catch (error) {
            alert(error.message);
        }
    };
};

export const deleteExpense = ({ id }) => {
    const email = localStorage.getItem('userId')?.replace(/[@.]/g, '') || '';
    return async (dispatch) => {
        try {
            const firebaseUrl = `https://tasksss-b2cac-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`;
            const response = await fetch(firebaseUrl, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete expense');
            }
            dispatch(fetchExpenses());
        } catch (error) {
            alert(error.message);
        }
    };
};

export const { togglePremium, resetExpenses } = expenseSlice.actions;

export default expenseSlice.reducer;
