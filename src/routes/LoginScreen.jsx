import React from 'react';
import { Button, Form,Image } from 'react-bootstrap';
import logo from '../assets/Logo.png';
import '../css/LoginScreen.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginScreen() {
    const LoginHandle = () => {

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
                            <Form.Control type='email' placeholder='Email'></Form.Control>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password'></Form.Control>
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