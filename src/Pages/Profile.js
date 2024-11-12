import { Navbar, Alert,Button } from "react-bootstrap";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Profile = () => {
    const navigate = useNavigate();
    const [percentage,setPercentage]=useState('64')
    const [fullName,setFullName]=useState("")
    const [photoURL,setPhotoURL]=useState("")

    useEffect(()=>{
      const idToken=localStorage.getItem('token');
      if(idToken){
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC465zamb1d08zID26EyUI0YPtMg_TO9qw',{
          method:'POST',
          headers:{ 'Content-Type': 'application/json'},
          body:JSON.stringify({idToken})
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          if (data.users && data.users.length > 0) {
            setFullName(data.users[0].displayName || '');
            setPhotoURL(data.users[0].photoUrl || '');
            setPercentage('100')
          }
        })
        .catch(error => console.log('Error fetching data',error))
      }
    },[])

    const profileSubmitHandler=(event)=>{
        event.preventDefault();

        const url='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC465zamb1d08zID26EyUI0YPtMg_TO9qw'

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              idToken: localStorage.getItem('token'),
              displayName: fullName,
              photoUrl: photoURL,
              returnSecureToken: true,
            }),
          })
          .then((response) => response.json())
    .then((data) => {
      alert('Profile updated successfully!');
      console.log('Profile updated successfully!')

      navigate('/home');
    })
    .catch((error) => {
      alert('Failed to update profile: ' + error.message);
    });
  };

  return (
    <>
      <Navbar style={{ border: '1px solid black', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem', padding: '0 1rem' }}>
        <Navbar.Brand>Winners never quite, Quitters never win.</Navbar.Brand>
        
        <Alert variant="danger" style={{ display: 'flex', alignItems: 'center', margin: 0, padding: '0.5rem 1rem' }}>
          <span style={{ marginRight: '0.5rem' }}>Your profile is <strong>{percentage}%</strong> completed. A complete Profile has higher chances of landing a job.</span>
          {percentage!=='100'&&(<Link style={{ color: '#0d6efd', fontWeight: 'bold' }}>Complete now</Link>)}
        </Alert>
      </Navbar>
      <div>
        <section style={{paddingRight:'15rem',paddingLeft:'15rem'}}>
            <div style={{paddingTop:'4rem',display:'flex',justifyContent: 'space-between'}}>
                <h2>Contact Details</h2>
                <Button variant="outline-danger"> Cancel</Button>
            </div>
            <form onSubmit={profileSubmitHandler} style={{marginTop:'1rem',display:'flex',justifyContent:'space-between'}}>
                <label style={{marginRight:'1rem'}}><FaGithub/> Full Name 
                    <input 
                    type='text' 
                    required 
                    value={fullName}
                    onChange={(e)=> setFullName(e.target.value)}
                    ></input>
                </label>
                <label><FaGlobe/> Profile URL 
                    <input 
                    type='text' 
                    required 
                    value={photoURL}
                    onChange={(e)=> setPhotoURL(e.target.value)}
                    ></input>
                </label>
                <div style={{marginTop:'1rem',flexDirection:'column'}}>
                    <Button variant="danger" type="submit">Update</Button>
                </div>
            </form>
        </section>
      </div>
    </>
  );
}

export default Profile;
