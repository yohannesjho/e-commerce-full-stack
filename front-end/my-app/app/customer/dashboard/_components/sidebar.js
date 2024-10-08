import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Sidebar() {
    const [clicked, setClicked] = useState(false)
    const router = useRouter();


    const handleLogout = () => {
        localStorage.removeItem('userAuthToken');
        localStorage.removeItem('cartItems');
        router.push('/customer');  
      };
     

    return (
        <div className="w-64 bg-gray-800 text-white hidden md:block ">
            <div className="p-4 text-xl font-semi-bold">Customer Dashboard</div>
            <ul>
                <Link href="/" className=" block p-4 hover:bg-gray-700 cursor-pointer duration-300">Home</Link>
                <Link href="/customer/orders" className=" block p-4 hover:bg-gray-700 cursor-pointer duration-300">Orders</Link>
                <Link href='/customer/profile' className=" block p-4 hover:bg-gray-700 cursor-pointer duration-300">Profile</Link>
                <Link onClick={() => setClicked(!clicked)} href='' className=" block p-4 hover:bg-gray-700 cursor-pointer duration-300">Settings</Link>
                <button
                    onClick={handleLogout}
                    className={`${clicked ? 'block' : 'hidden'}  ml-12`}

                >
                    Logout
                </button>
            </ul>
        </div>
    )
}
