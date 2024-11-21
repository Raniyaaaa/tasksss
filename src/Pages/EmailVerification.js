import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerification = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            checkEmailVerification(token);
        }
    }, [navigate]);

    const checkEmailVerification = (token) => {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC465zamb1d08zID26EyUI0YPtMg_TO9qw';
        
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                idToken: token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if (data && data.users && data.users[0].emailVerified) {
                setIsVerified(true);
                // navigate('/products');
            } else {
                setIsVerified(false);
            }
        })
        .catch((err) => {
            setError("Failed to check email verification status.",err);
        });
    };

    const resendVerificationEmail = () => {
        const token = localStorage.getItem('token');
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC465zamb1d08zID26EyUI0YPtMg_TO9qw';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                requestType: 'VERIFY_EMAIL',
                idToken: token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                throw new Error(data.error.message);
            }
            alert('Verification email has been sent!');
        })
        .catch((err) => {
            alert("Failed to resend verification email: " + err.message);
        });
    };

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isVerified ? (
                <div>
                    <h2>Your email is verified!</h2>
                    <button onClick={() => navigate('/products')}>Go to Home</button>
                </div>
            ) : (
                <div>
                    <h2>Email Verification Pending</h2>
                    <p>Please check your inbox for a verification email.</p>
                    <button onClick={resendVerificationEmail}>Resend Verification Email</button>
                </div>
            )}
        </div>
    );
};

export default EmailVerification;
