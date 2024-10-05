'use client';
import { SearchIcon, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/cartContext';
 

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems } = useCart();
  const [searchInput,setSearchInput] = useState('')
  
  const checkLoginStatus = () => {
    const token = localStorage.getItem('userAuthToken');
    setIsLoggedIn(!!token);  
  };

   
  useEffect(() => {
    checkLoginStatus();  
     
    const handleStorageChange = (event) => {
      if (event.key === 'userAuthToken') {
        checkLoginStatus(); 
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);  
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
};

  return (
    <div className='py-4 px-8 flex justify-between items-center border-b-2 space-x-4'>
      <div className='hidden md:block'>
        <Image src='/images/logo.jpg' className='rounded-2xl' width={70} height={60} alt='logo' />
      </div>
      <div className='flex items-center space-x-2 w-8 sm:w-16 md:w-48 lg:w-72'>
        <input onChange={(e)=>handleInputChange(e)} value={searchInput} className='border-2 w-96 outline-none rounded-md focus:border-gray-700' />
        <SearchIcon className='cursor-pointer' />
      </div>
      <div className='flex space-x-2 text-xs sm:text-sm md:text-base lg:text-lg'>
        {isLoggedIn ? (
          <>
            <Link
              className='bg-green-500 px-2 py-1 rounded-lg hover:bg-green-300 duration-300'
              href='/customer/dashboard'
            >
              Dashboard
            </Link>
           <></>
          </>
        ) : (
          <>
            <Link
              href='/customer/signin'
              className='bg-purple-500 px-2 py-1 rounded-lg hover:bg-purple-300 duration-300 hover:text-white'
            >
              SignIn
            </Link>
            <Link
              href='/customer/signup'
              className='bg-green-500 px-2 py-1 rounded-lg hover:bg-green-300 duration-300 hover:text-white'
            >
              SignUp
            </Link>
          </>
        )}
        <nav>
          <Link href='/cart' className='mr-4 flex gap-2'>
            <ShoppingCart /> ({cartItems.length})
          </Link>
        </nav>
      </div>
    </div>
  );
}
