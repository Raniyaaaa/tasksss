
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { configureStore as toolkitConfigureStore } from '@reduxjs/toolkit';
import Login from './Pages/Login';
import Products from './Pages/Products';

import authReducer from './Store/AuthSlice'
import expenseReducer from './Store/ExpenceSlice';
import themeReducer from './Store/ThemeSlice';

const mockStore = configureStore([]);
const loginStore = mockStore({
  auth: { isLoggedIn: false },
});

global.fetch = jest.fn();

const productStore = toolkitConfigureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    theme: themeReducer,
  },
  
});

describe('Login Component Tests', () => {
  test('Default Login Mode Render', () => {
    render(
      <Provider store={loginStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  test('Default Login Mode Render', () => {
    render(
      <Provider store={loginStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('Default Login Mode Render', () => {
    render(
      <Provider store={loginStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByLabelText('Confirm Password')).not.toBeInTheDocument();
  });


  test('Switch to SignUp Mode', () => {
    render(
      <Provider store={loginStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Don't have an Account? Sign Up"));
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });


  test('Password Visibility Toggle', () => {
    render(
      <Provider store={loginStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const passwordField = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button', { name: 'Toggle password visibility'});
    expect(passwordField).toHaveAttribute('type', 'password');
    expect(toggleButton).toBeInTheDocument();
    

  });

	test('renders "MyWebLink" in the header', () => {
    render(
      <Provider store={loginStore}>
        <BrowserRouter>
          <Login/>
        </BrowserRouter>
      </Provider>  
    );
    const headerElement =screen.getByText("MyWebLink",{exact:true})
    expect(headerElement).toBeInTheDocument();
  })

  test('renders "Home" in the header', () => {
    render(
      <Provider store={loginStore}>
        <BrowserRouter>
          <Login/>
        </BrowserRouter>
      </Provider>
    );
    const HomeElement =screen.getByText("Home",{exact:true})
    expect(HomeElement).toBeInTheDocument();
  })

  test('renders "Products" in the header', () => {
    render(
      <Provider store={loginStore}>
        <BrowserRouter>
          <Login/>
        </BrowserRouter>
      </Provider>
    );
    const productElement =screen.getByText("Products",{exact:true})
    expect(productElement).toBeInTheDocument();
  })

  test('renders "About Us" in the header', () => {
    render(
      <Provider store={loginStore}>
        <BrowserRouter>
          <Login/>
        </BrowserRouter>
      </Provider>
    );
    const aboutusElement =screen.getByText("About Us",{exact:false})
    expect(aboutusElement).toBeInTheDocument();
  })
});

describe('Product Component Tests', () => {
  test('renders Welcome to Expense Tracker in products correctly', () => {
    render(
      <Provider store={productStore}>
        <BrowserRouter>
          <Products />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Welcome to Expense Tracker!!!')).toBeInTheDocument();
  });

  test('renders Your profile is incomplete in products correctly', () => {
    render(
      <Provider store={productStore}>
        <BrowserRouter>
          <Products />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Your profile is incomplete.')).toBeInTheDocument();
  });

  test('renders Complete now in product correctly', () => {
    render(
      <Provider store={productStore}>
        <BrowserRouter>
          <Products />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Complete now')).toBeInTheDocument();
  });

  test('should toggle form visibility on Add Expense button click', () => {
    render(
      <Provider store={productStore}>
        <BrowserRouter>
          <Products/>
        </BrowserRouter>
      </Provider>
    );

    const toggleButton = screen.getByText('Add Expenses');
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText('Enter Amount')).toBeInTheDocument();
  });

  test('should toggle form visibility on Close button click', () => {
    render(
      <Provider store={productStore}>
        <BrowserRouter>
          <Products/>
        </BrowserRouter>
      </Provider>
    );

    const toggleButton = screen.getByText('Add Expenses');
    fireEvent.click(toggleButton);

    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByLabelText('Enter Amount')).not.toBeInTheDocument();

  });

  test('should submit form and call the addExpense action', () => {
    render(
      <Provider store={productStore}>
        <BrowserRouter>
          <Products/>
        </BrowserRouter>
      </Provider>
    );

    const toggleButton = screen.getByText('Add Expenses');
    fireEvent.click(toggleButton);

    fireEvent.change(screen.getByLabelText('Enter Amount'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Expense' } });
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Food' } });

    const submitButton = screen.getByText('Submit Expense');
    fireEvent.click(submitButton);

    expect(screen.queryByLabelText('Enter Amount')).not.toBeInTheDocument();

  });

  test('should display Expenses... on the screen', () => {
    render(
      <Provider store={productStore}>
        <BrowserRouter>
          <Products/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Expenses...')).toBeInTheDocument();

  });
});
