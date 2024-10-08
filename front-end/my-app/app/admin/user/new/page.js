'use client'
import React, { useState } from 'react'

export default function New() {
    const [formData, setFormData] = useState({
        userName:'',
        password:'',
        email:'',
    })
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleInputChange = (e)=>{
        const {name, value} = e.target
        console.log(e.target)
        setFormData({...formData, [name]:value})
        console.log(formData)
    }

    const handleSubmission = async (e)=>{
        e.preventDefault()
        const token = localStorage.getItem('authToken')
        try {
            const response = await fetch('http://localhost:5000/api/admin/register',{
                method:'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,  
                    'Content-Type': 'application/json'  
                  },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
              setSuccess('user registered successfully')
              setError('')
            }
    
        } catch (error) {
            console.error('Error:', error);
            setError('something went wrong')
            setSuccess('')
        }
    }
    return (
        <div>
            {success ? <p className='text-green-500'>{success}</p>:<p className='text-red-500'>{error}</p>}
            <form onSubmit={handleSubmission} className='border-2 md:w-3/4 mx-auto my-8 p-6'>
                <div className='my-4 space-x-2'>
                    <label htmlFor='userName'>Username:</label>
                    <input onChange={handleInputChange} className='border-2 px-2 py-1 rounded-md outline-none' name='userName' value={formData.username}></input>
                </div>
                <div className='my-4 space-x-2'>
                    <label htmlFor='password'>Password:</label>
                    <input onChange={handleInputChange} className='border-2 px-2 py-1 rounded-md outline-none' name='password' value={formData.password}></input>
                </div>
                <div className='my-4 space-x-2'>
                    <label htmlFor='email'>Email:</label>
                    <input onChange={handleInputChange} className='border-2 px-2 py-1 rounded-md outline-none' name='email' value={formData.email}></input>
                </div>

                <div type="submit" className='my-6 text-center'><button className='bg-green-500 hover:bg-green-300 duration-300 text-white px-2 py-1 rounded-md'>submit</button></div>

            </form>
        </div>
    )
}
