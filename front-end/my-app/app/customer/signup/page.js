'use client'
import React, { useState } from 'react'

export default function SignUp() {
    const [formData, setFormData] = useState({ userName: '', email: '', password: '' });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmission = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/user/users/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                const data = await response.json(); // Parsing the response body if necessary
                setSuccess('You signed up successfully!');
                setError('');
                setFormData({ userName: '', email: '', password: '' }); // Clear the form
            } else {
                const errorData = await response.json();  
                setError(errorData.message || 'Sign up failed. Please try again.');
                setSuccess('');
            }
        } catch (error) {
            console.error(error);
            setError(`Sign up failed. Please try again.${error}`);
            setSuccess('');
        }
    };

    return (
        <div>
            {success && <p className='text-green-500'>{success}</p>}
            {error && <p className='text-red-500'>{error}</p>}
            <form onSubmit={handleSubmission} className='border sm:w-3/4 sm:mx-auto my-8 rounded-md text-center'>
                <div>
                    <label className='block text-xl font-semibold my-4' htmlFor="userName">User Name</label>
                    <input 
                        className='border outline-none rounded-md px-2 py-1 border-gray-500' 
                        type='text' 
                        name='userName' 
                        value={formData.userName} 
                        onChange={handleInputChange} 
                        required 
                    />
                    
                    <label className='block text-xl font-semibold my-4' htmlFor="email">Email</label>
                    <input 
                        className='border outline-none rounded-md px-2 py-1 border-gray-500' 
                        type='email' 
                        name='email' 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                    />
                    
                    <label className='block text-xl font-semibold my-4' htmlFor="password">Password</label>
                    <input 
                        className='border outline-none rounded-md px-2 py-1 border-gray-500' 
                        type='password' 
                        name='password' 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                
                <button type='submit' className='bg-green-500 w-28 px-2 py-1 rounded-md mx-auto my-8'>
                    Sign Up
                </button>
            </form>
        </div>
    );
}
