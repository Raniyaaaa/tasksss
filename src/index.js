import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/react-bootstrap/dist/react-bootstrap"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Store/AuthSlice'; 
import expenseReducer from "./Store/ExpenceSlice"; 
import themeReducer from './Store/ThemeSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        expense: expenseReducer,
        theme: themeReducer,
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();
