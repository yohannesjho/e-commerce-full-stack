// app/customer/dashboard/page.js
'use client';

import Link from 'next/link';
import React from 'react';
import Sidebar from './_components/sidebar';

export default function Dashboard() {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-8">
                <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
                <p className='text-xl font-semibold'>Manage your profile, view your orders, and update your settings.</p>
            </div>
        </div>
    );
}
