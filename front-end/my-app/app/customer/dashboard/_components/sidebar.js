import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
    return (
        <div className="w-64 bg-gray-800 text-white  ">
            <div className="p-4 text-xl font-semi-bold">Customer Dashboard</div>
            <ul>
                <Link href="/customer/orders" className=" block p-4 hover:bg-gray-700 cursor-pointer">Orders</Link>
                <Link href='/customer/profile' className=" block p-4 hover:bg-gray-700 cursor-pointer">Profile</Link>
                <Link href='' className=" block p-4 hover:bg-gray-700 cursor-pointer">Settings</Link>
            </ul>
        </div>
    )
}
