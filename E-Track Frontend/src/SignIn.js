import React, { useEffect, useState } from "react";
import { signInWithPopup} from "firebase/auth";
import {auth,provider} from './config';
import  Dashboard from "./pages/Dashboard";
import { Navigate, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/SignUp.css';
import axios from "./components/axios";

import { handleSubmitSignup } from './service/api';
function SignIn() {

    const navigate = useNavigate();

    //usestates for details of user
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");

    //using local storage to initial authentication check and current user 
    // localStorage.setItem("isAuthenticated", "false");
    // localStorage.setItem('user', "");

    const from = { pathname: '/dashboard' };
    const [value,setValue] = useState('');
    var xyz ;
    const handleClick =() => { 
        signInWithPopup(auth,provider).then((data)=>{
          xyz = data.user;
          console.log(data.user);
            setValue(data.user.email);
            localStorage.setItem("email",data.user.email);
        })
        // Navigate('/dashboard');

    }
    console.log("a");
    const hehe = () => {
         navigate(from);
            window.location.reload();
    }
    
    useEffect(()=>{
        setValue(localStorage.getItem('email'));
    },[])

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const data = await axios.post("/customer/signup", {
              name,
              contact,
              password
            });
            // await handleSubmitSignup({name, contact, password});
            if(data.status === 201){
              localStorage.setItem("isAuthenticated", "true");
              localStorage.setItem('user', data.data.name);
              navigate("/", {state:{user: {name}}});
            }
        } catch (error) {
            console.log("done");
            alert("Username already taken!")
            navigate("/");
     
   }       
    }
    
    return (
        <div>
            <Container >
        <div className='Signin_name'>
        <h1>Welcome to <span className="hawkerspot">E-Track.</span></h1>
            <p>Track all you finances in one place</p>
            <h2>Sign Up</h2>
            <p className='para'>Sign in with your data that you entered during your registration</p>
        </div>
        <Form className='rounded p-4 p-sm-3'>
       <Form.Group className="mb-3" controlId="formBasicNamw">
        <Form.Label>Name</Form.Label>
        <Form.Control type="Name" placeholder="Name" required="true" onChange={e => setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Contact Number</Form.Label>
        <Form.Control type="number" placeholder="Enter Contact Number" required="true" onChange={e => setContact(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required="true" onChange={e => setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
        Sign In
      </Button>
    </Form>
    <div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ flex: 1, backgroundColor: "#000000", height: "1px" }} />
 
    <p style={{ margin: "0 10px" }}>Or Sign Up with</p>
 
    <div style={{ flex: 1, backgroundColor: "#000000", height: "1px" }} />
</div>
    </Container>
            {value ? hehe(): 
            <button type="button" class="login-with-google-btn" onClick={handleClick}>
            Sign Up with Google
          </button>
      }
        </div>
    );
}
export default SignIn;