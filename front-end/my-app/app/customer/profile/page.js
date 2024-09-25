'use client'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [profile,setProfile] = useState([])

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
  return (
    <div>
        <h1 className="text-2xl font-bold">Profile</h1>
            <p><span className='text-lg mx-2 font-semi-bold'>Name:</span> {profile.name}</p>
            <p><span className='text-lg mx-2 font-semi-bold'>Email:</span> {profile.email}</p>
            <p><span className='text-lg mx-2 font-semi-bold'>Shipping Address:</span></p>
    </div>
  )
}
