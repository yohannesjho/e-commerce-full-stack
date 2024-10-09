'use client'

import { ChartBarStacked, LayoutDashboardIcon, ListOrderedIcon, ShoppingCart, ShoppingCartIcon, User } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
 

export default function sidebar() {
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
    const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);

    return (
        <div className='w-64 min-h-screen text-white bg-gray-800 pt-24 px-6  hidden md:block'>
            <ul>
                <li className='mb-4'>
                    <button
                        onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                        className="flex justify-between w-full py-2 px-4 hover:bg-gray-700"
                    >
                        <div className='flex gap-2'><ShoppingCart /> <p>Products</p></div>
                        <span>{isProductDropdownOpen ? '▲' : '▼'}</span>
                    </button>
                    {isProductDropdownOpen && (
                        <ul className="pl-16 text-sm mt-2">
                            <li className="mb-2">
                                <Link href="/admin/products">
                                     Product List
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/products/add">
                                   Add Product
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li className='mb-4'>
                    <button
                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                        className="flex justify-between w-full py-2 px-4 hover:bg-gray-700"
                    >
                        <div className='flex gap-2'><ChartBarStacked /> <p>Categories</p></div>
                        <span>{isCategoryDropdownOpen ? '▲' : '▼'}</span>
                    </button>
                    {isCategoryDropdownOpen && (
                        <ul className="pl-16 text-sm mt-2">
                            <li className="mb-2">
                                <Link href="/admin/categories">
                                     Category List
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/categories/add">
                                   Add Category
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li className='mb-4'>
                    <button
                        onClick={() => setIsOrderDropdownOpen(!isOrderDropdownOpen)}
                        className="flex justify-between w-full py-2 px-4 hover:bg-gray-700"
                    >
                        <div className='flex gap-2'><ListOrderedIcon /> <p>Orders</p></div>
                        <span>{isOrderDropdownOpen ? '▲' : '▼'}</span>
                    </button>
                    {isOrderDropdownOpen && (
                        <ul className="pl-16 text-sm mt-2 ">
                            <li className="mb-2">
                                <Link href="/admin/order">
                                     Order List
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                   Add Order
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
                 
                <li className='mb-4'>
                    <button
                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        className="flex justify-between w-full py-2 px-4 hover:bg-gray-700"
                    >
                        <div className='flex gap-2'><User /> <p>Users</p></div>
                        <span>{isUserDropdownOpen ? '▲' : '▼'}</span>
                    </button>
                    {isUserDropdownOpen && (
                        <ul className="pl-16 text-sm mt-2 ">
                            <li className="mb-2">
                                <Link href="/admin/user">
                                     User List
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/user/new">
                                   Add User
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    )
}
