import { useRef } from "react"
import { Button, FloatingLabel } from "react-bootstrap"
import { Link,useNavigate } from "react-router-dom";


const ForgetPasswordPage=()=>{
    const navigate=useNavigate();
    const emailRef=useRef();

    const submitHandler=(event)=>{
        event.preventDefault();
        const enteredEmail=emailRef.current.value || " ";

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC465zamb1d08zID26EyUI0YPtMg_TO9qw",{

            method: "POST",
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:enteredEmail,
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data) => {
            if (data.error) {
                throw new Error(data.error.message);
            }
            alert('Password Reset email has been sent!');
            navigate('/');

        })
        .catch((err) => {
            alert("Failed to send password reset email: " + err.message);
        });

    }
    
    return(
        <div style={{padding:'10rem',display:'flex',justifyContent:'center'}}>
            <section style={{
                border:'1px solid #ccc',
                borderRadius:'2px',
                padding:'2rem',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                width:'500px',
                textAlign:'center'
            }}>
                <p style={{marginBottom:'1rem'}}>Enter the email with which you have registered</p>
                <form onSubmit={submitHandler}>
                    <FloatingLabel label="Email">
                    <input type='email' ref={emailRef} required style={{marginBottom:'1rem'}} className="form-control"></input>
                    <div>
                    <Button variant="danger" type="submit" style={{marginBottom:'1rem',width:'70%'}}>Send Link</Button>
                    </div>
                    <Link to='/' style={{textDecoration:'none',color:'black',marginBottom:'1rem'}} >Already a user? Login</Link>
                    </FloatingLabel>
                </form>
            </section>
        </div>
    )
}

export default ForgetPasswordPage;