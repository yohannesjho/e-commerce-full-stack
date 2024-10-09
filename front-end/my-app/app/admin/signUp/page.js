'use client'
import React, { useState } from 'react'
import axios from 'axios'

export default function SignUp() {
    const [formData, setFormData] = useState({ userName: '', email: '', password: '' })
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmission = async (e) => {
        e.preventDefault()
        try {
            // Directly sending form data as JSON
            const response = await axios.post('http://localhost:5000/api/admin/signup', formData, {
                headers: {
                    "Content-Type": "application/json" // Specify content type as JSON
                }
            })
            
            if (response.data) {
                setSuccess('Admin signed up successfully!')
                setError('') // Clear error on success
            }
        } catch (error) {
            console.error(error)
            setError('Sign-up failed. Please try again.')
            setSuccess('') // Clear success message on error
        }
    }

    return (
        <div>
            {success && <p className='text-green-500'>{success}</p>}
            {error && <p className='text-red-500'>{error}</p>}
            <form onSubmit={handleSubmission} className='border sm:w-3/4 sm:mx-auto my-8 rounded-md text-center'>
                <div>
                    <label className='block text-xl font-semibold my-4' htmlFor="userName">User Name</label>
                    <input className='border outline-none rounded-md px-2 py-1 border-gray-500' 
                        type='text' 
                        name='userName' 
                        value={formData.userName} 
                        onChange={handleInputChange} 
                        required 
                    />
                    
                    <label className='block text-xl font-semibold my-4' htmlFor="email">Email</label>
                    <input className='border outline-none rounded-md px-2 py-1 border-gray-500' 
                        type='email' 
                        name='email' 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                    />
                    
                    <label className='block text-xl font-semibold my-4' htmlFor="password">Password</label>
                    <input className='border outline-none rounded-md px-2 py-1 border-gray-500' 
                        type='password' 
                        name='password' 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                
                <button type='submit' className='bg-green-500 w-28 px-2 py-1 rounded-md mx-auto my-8'>Sign Up</button>
            </form>
        </div>
    )
}
