import react, { useRef, useState } from "react"
import { Button } from "react-bootstrap";

const Login=()=>{
    const [isLogin,setIsLogin]=useState(false)
    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    const confirmPasswordInputRef=useRef();

    const submitHandler=(event)=>{
        event.preventDefault();
        const enteredEmail=emailInputRef.current.value;
        const enteredPassword=passwordInputRef.current.value;
        const enteredConfirmPassword=confirmPasswordInputRef.current.value;
        if (passwordInputRef.current.value !== confirmPasswordInputRef.current.value) {
            alert("Passwords do not match!");
            return;
        }
        
        let url;
        if(isLogin){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=REPLACEMENT'
        }else{
            url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=REPLACEMENT"
        }

        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                confirmPassword:enteredConfirmPassword,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            } else{
                return res.json().then((data)=>{
                    let errorMessage="Authentication failed!"
                    if(data && data.error && data.error.message){
                        errorMessage=data.error.message;
                    }
                    throw new Error(errorMessage)
                })
            }
        })
        .then((data)=>{
            console.log("User has successfully signed up")
        })
        .catch((err)=>{
            alert(err)
        })
    }
    return(
        <>
        <div style={{paddingTop:'10rem',paddingRight:'5rem',paddingLeft:'40rem'}}>
            <section>
                <h1>{isLogin? 'Login':'SignUp'}</h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="email">
                            <input 
                            type='email' 
                            id='email' 
                            ref={emailInputRef}
                            placeholder="Email"
                            required></input>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="Password">
                            <input 
                            type='Password' 
                            id='Password' 
                            ref={passwordInputRef}
                            placeholder="Password"
                            required></input>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="ConfirmPassword">
                            <input 
                            type='Password' 
                            id='ConfirmPassword' 
                            ref={confirmPasswordInputRef}
                            placeholder="Confirm Password"
                            required></input>
                        </label>
                    </div>
                    <div>
                        <Button variant="primary" type="submit">{isLogin? 'Login':'SignUp'}</Button>
                    </div>
                </form>
            </section>
            <section>
            <button type='button' >{isLogin? 'Create New Account': 'Have an Account? Login'}</button>
            </section>
        </div>
        </>
    )

}
export default Login;