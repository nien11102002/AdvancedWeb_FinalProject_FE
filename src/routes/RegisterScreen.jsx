import React from 'react';
import { Button, Form,Image } from 'react-bootstrap';
import logo from '../assets/Logo.png';
import '../css/RegisterScreen.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function RegisterScreen() {
    const RegisterHandle = () => {

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
                <div className='register-container'>
                    <h1>Register</h1>
                    <div>
                        <span>Already have an account?  </span>
                        <a href='/login' style={{color:'#EAC696'}}>Sign in</a>
                    </div>
                    <Form>
                        <Form.Group className='register-form'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Email'></Form.Control>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password'></Form.Control>
                            <Button variant='color' 
                                    className='register-button'
                                    onClick={RegisterHandle}>Register</Button>
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

export default RegisterScreen;