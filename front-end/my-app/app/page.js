import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div>
            <header className="bg-green-500 w-full py-6 text-center shadow-lg">
                <h1 className="text-4xl text-white font-bold">
                    Welcome to Johnova E-commerce Platform
                </h1>
            </header>

            <div className="flex flex-col items-center mt-10 space-y-8">
                <p className="text-lg text-gray-700">
                    Explore a variety of products and enjoy a seamless shopping experience!
                </p>

                <div className="flex space-x-6">
                    <Link href="/customer" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
                      
                            Shop Now
 
                    </Link>

                   
                </div>
            </div>
        </div>
    )
}

export default page

