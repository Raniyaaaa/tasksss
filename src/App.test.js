
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { configureStore as toolkitConfigureStore } from '@reduxjs/toolkit';
import Login from './Pages/Login';
import Home from './Pages/Home';

import authReducer from './Store/AuthSlice'
import expenseReducer from './Store/ExpenceSlice';
import themeReducer from './Store/ThemeSlice';



const mockStore = configureStore([]);
const loginStore = mockStore({
  auth: { isLoggedIn: false },
});

global.fetch = jest.fn();

const homeStore = toolkitConfigureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    theme: themeReducer,
  },
  preloadedState: {
    auth: {
      userId: '123',
    },
    expense: {
      expense: [],
      email: 'test@example.com',
      premium: false,
    },
    theme: {
      darkMode: true,
    },
  },
});

describe('Login Component Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('Default Login Mode Render', () => {
    render(
      <Provider store={loginStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
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
    const toggleButton = screen.getByRole('button', { name: /Toggle password visibility/i });
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

  test('Password Mismatch in SignUp Mode', () => {
    render(
      <Provider store={loginStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );


const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/password/i);

fireEvent.change(passwordInput, { target: { value: 'password123' } });
fireEvent.change(confirmPasswordInput, { target: { value: 'differentPassword' } });
fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });
});

describe('Home Component Tests', () => {
  test('renders home form correctly', () => {
    render(
      <Provider store={homeStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Welcome to Expense Tracker!!!')).toBeInTheDocument();
    expect(screen.getByText('Your profile is incomplete.')).toBeInTheDocument();
    expect(screen.getByText('Complete now')).toBeInTheDocument();
  });

  test('should toggle form visibility on button click', async () => {
    render(
      <Provider store={homeStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const toggleButton = screen.getByText('Add Expenses');

    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(screen.getByLabelText('Enter Amount')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Close'));
    await waitFor(() => {
      expect(screen.queryByLabelText('Enter Amount')).not.toBeInTheDocument();
    });
  });

  test('should submit form and call the addExpense action', async () => {
    render(
      <Provider store={homeStore}>
        <BrowserRouter>
          <Home />
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

    await waitFor(() => {
      expect(screen.queryByLabelText('Enter Amount')).not.toBeInTheDocument();
    });
  });

  test('should display expenses after they are fetched', async () => {
    render(
      <Provider store={homeStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Expenses...')).toBeInTheDocument();
    });
  });

  test('should handle logout button click', async () => {
    render(
      <Provider store={homeStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const logoutButton = screen.getByText('LOG OUT');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByText('Welcome to Expense Tracker!!!')).toBeInTheDocument();
    });
  });
});
