'use client'
import { Heart, SearchIcon, ShoppingBasket, User2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('userAuthToken');
    console.log(token)
    if (token) {
      setIsLoggedIn(true)
    }
    
  }, [isLoggedIn])

  const handleLogout = () => {
    // Remove the token and log the user out
    localStorage.removeItem('userAuthToken');
    setIsLoggedIn(false);
    router.push('/customer/signin'); // Redirect to sign-in page after logging out
  };
  return (
    <div className='py-4 px-8 flex justify-between items-center border-b-2'>
      <div>
        <Image src='/images/logo.jpg' width={70} height={60} alt='logo'/>
      </div>

      <div className='flex items-center space-x-2'>
        <input className='border-2 w-96 outline-none rounded-md focus:border-gray-700' />
        <SearchIcon className='cursor-pointer' />
      </div>
      <div className='flex space-x-2'>
        {isLoggedIn ? (<><Link className='bg-green-500 px-2 py-1 rounded-lg hover:green-300 duration-300 hover:text-white' href='/customer/dashboard'>Dashboard</Link><Link onClick={handleLogout} className='bg-red-500 px-2 py-1 rounded-lg hover:bg-red-300 duration-300 hover:text-white' href=''>Logout</Link></>) :
          (<> <Link href='/customer/signin' className='bg-purple-500 px-2 py-1 rounded-lg hover:purple-300 duration-300 hover:text-white'>SignIn</Link>
            <Link href='/customer/signup' className='bg-green-500 px-2 py-1 rounded-lg hover:green-300 duration-300 hover:text-white'>SignUp</Link></>)}




      </div>

    </div>
  )
}
