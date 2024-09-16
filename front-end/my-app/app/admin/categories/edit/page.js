'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';

export default function page() {
    const searchParams = useSearchParams();

    const [categoryData, setCategoryData] = useState({ name: "", description: "", img: [] })


    useEffect(() => {

        const name = searchParams.get('name');
        const description = searchParams.get('description');
        const img = searchParams.get('img');
        if ( name && description && img) {

            setCategoryData({ name, description, img });
        }
    }, [searchParams])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCategoryData({ ...categoryData, [name]: value })
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setCategoryData({ ...categoryData, img: files })
    }

    return (
        <div>
            <form className='md:w-3/4 md:mx-auto my-8 border border-gray-500 rounded-md'>
                <div className='my-8 mx-4 text-center'>
                    <label className='block mb-4 text-xl font-bold' htmlFor="name">Category Name</label>
                    <input onChange={handleInputChange} className='border-2 border-gray-500 w-1/2 mx-auto rounded-md outline-none' type='text' name='name' value={categoryData.name} required />

                </div>

                <div className='mb-8 mx-4 text-center'>
                    <label className='block mb-4 text-xl font-bold' htmlFor="description"> Category Description</label>
                    <textarea
                        name="description"
                        value={categoryData.description}
                        onChange={handleInputChange}
                        className="border-2 border-gray-500 w-1/2 mx-auto rounded-md outline-none"
                        required
                    />
                </div>

                <div className='mb-8 mx-4 text-center'>
                    <label className='block mb-4 text-xl font-bold' htmlFor="images">Images</label>
                    <input onChange={handleFileChange} className='w-1/4  mx-auto rounded-md outline-none' type='file' name='images' multiple />
                </div>

            </form>
        </div>
    )
}
