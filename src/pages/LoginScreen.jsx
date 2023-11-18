import React, { useState } from 'react';
import { Button, Form,Image } from 'react-bootstrap';
import logo from '../assets/Logo.png';
import '../css/LoginScreen.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
    const navigate = useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false)
    );
    
    const LoginHandle = event => {
        event.preventDefault();
        const userAccount = {
            createdAt:'',
            email:email,
            hash:password,
            hashRT:'',
        }
        const URL='https://advancedweb-finalproject-be.onrender.com/auth/local/signin'
    fetch(URL,{
      method:'POST',
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(userAccount),
    })
    .then(res =>res.json())
    .then(data => {
        if (data) {
            localStorage.setItem("authenticated", true);
            localStorage.setItem("email",email);
            navigate("/home");
        }
        else {
            setEmail('')
            setPassword('')
            console.error('Wrong Password or Email!');
        }
    })

    }
    return (
        <div className='d-flex flex-row'>
            <div className='left-div w-50 h-100'>
                <div className='brand-container d-flex flex-row'>
                    <a href='/'>
                    <div className='logo-container d-flex align-items-center justify-content-center'>
                        <Image src={logo} className='myLogo'></Image>
                    </div>
                    </a>
                    <a href='/home' className='d-flex align-items-center brand-name'>EduCat</a>
                </div>
                <div className='login-container'>
                    <h1>Login</h1>
                    <div>
                        <span>Don't have an account?  </span>
                        <a href='/register' style={{color:'#EAC696'}}>Create now</a>
                    </div>
                    <Form>
                        <Form.Group className='login-form'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Email' value={email} onChange={event => setEmail(event.target.value)}></Form.Control>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)}></Form.Control>
                            <div className='d-flex justify-content-between'>
                            <Form.Check 
                                type='checkbox'
                                id='default-checkbox'
                                label='Save account'/>
                            <a href='/' style={{color:'#EAC696'}}>Forgot Password?</a>
                            </div>
                            <Button variant='color' 
                                    className='login-button'
                                    onClick={LoginHandle}>Login</Button>
                        </Form.Group>
                    </Form>
                </div>
                
            </div>
            <div className='right-div flex-grow-1 d-flex align-items-center justify-content-center mx-auto w-50'>
                <Image src={logo} className='myImage'></Image>
            </div>
        </div>
    );
}

export default LoginScreen;