// 

import { useRef, useState } from "react";
import { Button, FloatingLabel, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import MainNavigation from "../MainNavigation/MainNavigation";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthSlice";

const Login = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current ? confirmPasswordInputRef.current.value : '';

        // Validation checks
        if (!/\S+@\S+\.\S+/.test(enteredEmail)) {
            setError("Please enter a valid email.");
            return;
        }

        if (!isLogin && enteredPassword !== enteredConfirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const url = isLogin
            ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC465zamb1d08zID26EyUI0YPtMg_TO9qw'
            : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC465zamb1d08zID26EyUI0YPtMg_TO9qw";

        // Perform the fetch call
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.ok ? res.json() : res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
        }))
        .then((data) => {
            console.log(data);
            dispatch(authActions.login({
                token: data.idToken,
                userId: enteredEmail
            }));
            setError(null);
            navigate('/verifyEmail');
        })
        .catch((err) => {
            setError(err.message);
        });
    };

    const toggleAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    return (
        <>
            <MainNavigation />
            <div style={{ paddingTop: '2rem', paddingLeft: '20rem', paddingBottom: '5rem', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <section style={{
                    border: '1px solid #ccc',
                    borderRadius: '2px',
                    padding: '2rem',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '350px',
                    textAlign: 'center'
                }}>
                    <h1>{isLogin ? 'Login' : 'SignUp'}</h1>
                    {error && (
                        <Alert variant="danger" onClose={() => setError(null)} dismissible>
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={submitHandler}>
                        <div className="mt-4">
                            <div className="form-floating">
                                <input
                                    className="form-control"
                                    type="email"
                                    id="email"
                                    ref={emailInputRef}
                                    style={{ height: "35px", fontSize: "14px" }}
                                    required
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="form-floating">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    ref={passwordInputRef}
                                    className="form-control"
                                    id="password"
                                    style={{ height: "35px", fontSize: "14px" }}
                                    required
                                />
                                <label htmlFor="password">Password</label>
                                <Button
                                variant="link"
                                type="button"
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '10px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                }}
                                aria-label="Toggle password visibility"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                            </div>
                        </div>
                        {!isLogin && (
                            <div className="mt-2">
                                <div className="form-floating">
                                    <input
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        ref={confirmPasswordInputRef}
                                        id="confirmPassword"
                                        className="form-control"
                                        style={{ height: "35px", fontSize: "14px" }}
                                        required
                                    />
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Button
                                    variant="link"
                                    type="button"
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '10px',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                    }}
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                                </div>
                            </div>
                        )}
                        <div className="mt-4" style={{ display: "flex", flexDirection: "column" }}>
                            <Button 
                            variant="primary" 
                            type="submit" 
                            style={{ borderRadius: "10rem" }}
                            aria-label={isLogin ? "Login" : "Sign Up"} 
                            >
                                {isLogin ? "Login" : "SignUp"}
                            </Button>
                        </div>
                        {isLogin && (
                            <div className="mt-1">
                                <Link to="/forgetpassword">forgot password?</Link>
                            </div>
                        )}
                    </form>
                </section>
                <div className="mt-3" style={{ width: "350px" }}>
                    <Alert
                        variant="success"
                        onClick={toggleAuthModeHandler}
                        style={{
                            cursor: "pointer",
                            padding: "0.5rem 3rem",
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        {isLogin ? "Don't have an Account? Sign Up" : "Have an Account? Login"}
                    </Alert>
                </div>
            </div>
        </>
    );
};

export default Login;
