import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/UserProfile.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile(props) {
    const navigate=useNavigate()
    const [email,setEmail]=useState(localStorage.getItem('email'))
    const EditHandle=event=>{
        event.preventDefault();
        
    }

    const BackHandle=()=>{
        let path='/home';
        navigate(path)
    }
    return ( 
        <div className='user-profile-screen'>
            <h1>Edit User Profile</h1>
            <Form className='edit-profile-form mx-auto'>
                <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Email' value={email} onChange={event => setEmail(event.target.value)}></Form.Control>
                    <Button variant='color' 
                            className='register-button'
                            onClick={EditHandle}>Edit</Button>
                    <Button variant='color' 
                            className='register-button'
                            onClick={BackHandle}>Back</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default UserProfile;