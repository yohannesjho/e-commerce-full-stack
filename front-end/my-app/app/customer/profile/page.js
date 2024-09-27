'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function page() {
    const [profile, setProfile] = useState([])
    const [toggle,setToggle]=useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('userAuthToken');
            if (token) {
                console.log(token)
                try {
                    const response = await fetch('http://localhost:5000/api/user/users/profile/', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    console.log(response)
                    if (response.ok) {
                        const data = await response.json();
                        setProfile(data); // Set profile data
                        console.log(profile)
                    } else {
                        console.error('Failed to fetch profile:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            } else {
                console.error('No token found');
            }
        };

        fetchProfile();
    }, []); // Empty dependency array for `useEffect`

    if (!profile) {
        return <p>Loading...</p>; // Show loading or fallback UI while data is being fetched
    }
    const handleProfileUpdate = async () => {
        const token = localStorage.getItem('userAuthToken')
        const response = await fetch('http://5000/api/user/users/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileData),
        })
    }
    return (
        <div>
            <div className='border-2 border-purple-500 md:w-3/4 md:mx-auto mt-16 py-8 px-4 rounded-lg flex justify-around'>
                <div>
                    <h1 className="text-2xl font-bold">Profile</h1>
                    <p><span className='text-lg mx-2 font-semi-bold'>Your Name:</span> {profile.name}</p>
                    <p><span className='text-lg mx-2 font-semi-bold'>YOur Email:</span> {profile.email}</p>
                    <p><span className='text-lg mx-2 font-semi-bold'>YOur Shipping Address:</span></p>
                    <button  href='/customer' onClick={()=>setToggle(!toggle)} className='bg-yellow-500 px-2 py-1 rounded-md hover:bg-yellow-300 duration-300 hover:text-white my-4'>Edit</button>
                </div>
                <form className={toggle?`block`:`hidden`}>
                    <div className='mb-4'>
                        <label htmlFor='name'>Name:</label>
                        <input className='border-2 mx-2 px-2 py-1 outline-none ' type='text' name='name' />
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input className='border-2 mx-2 px-2 py-1 outline-none ' type='text' name='email' />
                    </div>
                    <div>
                        <p>Shipping Address:</p>
                        <div className='ml-24 space-y-4'>
                            <div>
                                <label htmlFor='street'>Street</label>
                                <input className='border-2 mx-2 px-2 py-1 outline-none ' type='text' name='street' />
                            </div>
                            <div>
                                <label htmlFor='city'>City</label>
                                <input className='border-2 mx-2 px-2 py-1 outline-none ' type='text' name='city' />
                            </div>

                            <div>
                                <label htmlFor='postalcode'>Postal code</label>
                                <input className='border-2 mx-2 px-2 py-1 outline-none ' type='text' name='postalcode' />
                            </div>
                        </div>
                    </div>
                    <button className='bg-green-500 px-2 py-1 rounded-md hover:bg-green-300 hover:text-white'>Submit</button>
                </form>
            </div>
        </div>
    )
}
