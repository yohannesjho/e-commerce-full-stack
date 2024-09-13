import { ChartBarStacked, LayoutDashboardIcon, ListOrderedIcon, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import sidebarData from '../(data)/data'

export default function sidebar() {
     
    return (
        <div className='w-64 min-h-screen text-white bg-gray-800 pt-24 px-6  hidden md:block'>
            <Link href="../admin" className='flex gap-2 '>
                <LayoutDashboardIcon />
                <span>Dashboard</span>
            </Link>
            <div className='my-12'>
                {sidebarData.map(data => (
                    <Link href="../admin" key={data.key} className='flex gap-2 mb-4'>
                        {data.icon}
                        <span>{data.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
