// app/customer/dashboard/page.js
'use client';

import Link from 'next/link';
import React from 'react';
import Sidebar from './_components/sidebar';
import { MenuIcon } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex justify-between bg-gray-100 p-8">
                <div>
                    <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-4">Welcome to Your Dashboard</h1>
                    <p className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold'>Manage your profile, view your orders, and update your settings.</p>
                </div>
                <MenuIcon className='cursor-pointer   md:hidden' />
            </div>

        </div>
    );
}
