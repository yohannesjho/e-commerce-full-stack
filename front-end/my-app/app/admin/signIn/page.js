'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });  
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  }

  const handleSubmission = async (e) => {
    e.preventDefault();
  

    try {
      const response = await axios.post('http://localhost:5000/api/admin/signin', formData, {
        headers: {
          "Content-Type": "application/json"  
        }
      });

      if (response.data) {
        const token = response.data.token;  
        localStorage.setItem("adminToken", token);
        

        setSuccess('You signed in successfully!');
        router.push('/admin');
         
      }
    } catch (error) {
      console.log(error);
      setError('Invalid credentials. Please try again.');  
      setSuccess('');
    }
  }

  return (
    <div>
      {success && <p className='text-green-500'>{success}</p>}
      {error && <p className='text-red-500'>{error}</p>}
      <form onSubmit={handleSubmission} className='border border-gray-700 rounded-md sm:w-3/4 mx-auto my-8'>
        <div className='w-1/2 mx-auto my-4'>
          <label>Email:</label>
          <input 
            onChange={handleInputChange} 
            className='border-2 ml-2 border-gray-600 rounded-md outline-none' 
            name='email' 
            value={formData.email}  
          />
        </div>
        <div className='w-1/2 mx-auto my-4'>
          <label>Password:</label>
          <input 
            onChange={handleInputChange} 
            className='border-2 ml-2 border-gray-600 rounded-md outline-none' 
            name='password' 
            type='password'  
            value={formData.password}  
          />
        </div>
        <div className='w-1/2 mx-auto my-4'>
          <button className='bg-green-500 hover:bg-green-300 duration-300 px-2 py-1 rounded-md'>Submit</button>
        </div>
      </form>
    </div>
  )
}
