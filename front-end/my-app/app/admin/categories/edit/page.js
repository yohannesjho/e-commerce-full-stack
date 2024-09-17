'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import axios from 'axios'

export default function page() {
    const searchParams = useSearchParams();

    const [categoryData, setCategoryData] = useState({ id: "", name: "", description: "", img: [] });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState([]);

    useEffect(() => {
        const id = searchParams.get('id');
        const name = searchParams.get('name');
        const description = searchParams.get('description');
        const img = searchParams.get('img');

        if (id && name && description && img) {
            setCategoryData({ id, name, description, img });
        }
    }, [searchParams]);

    const handleInputChange = (e) => {
         
        const { name, value } = e.target;
        
        setCategoryData({ ...categoryData, [name]: value });
    };

    const handleFileChange = (e) => {
      
        const files = Array.from(e.target.files);
         
        setCategoryData({ ...categoryData, img: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('id', categoryData.id);
            data.append('name', categoryData.name);
            data.append('description', categoryData.description);
           

            // Append each image file
            categoryData.img.forEach((file) => {
                data.append('images', file);
            });
           
            // Make the API call to update the category
            const response = await axios.put(`http://localhost:5000/api/user/categories/update/${categoryData.id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response)
            if (response.data) {
                setSuccess("Category edited successfully!");
            }
        } catch (error) {
            console.log(error);
            setError(`something went wrong`);
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit} className='md:w-3/4 md:mx-auto my-8 border border-gray-500 rounded-md'>
                <div className='my-8 mx-4 text-center'>
                    <label className='block mb-4 text-xl font-bold' htmlFor="name">Category Name</label>
                    <input onChange={handleInputChange} className='border-2 border-gray-500 w-1/2 mx-auto rounded-md outline-none' type='text' name='name' value={categoryData.name} required />
                </div>

                <div className='mb-8 mx-4 text-center'>
                    <label className='block mb-4 text-xl font-bold' htmlFor="description">Category Description</label>
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
                    <input onChange={handleFileChange} className='w-1/4 mx-auto rounded-md outline-none' type='file' name='images' multiple />
                </div>

                <div className='my-8 text-center w-28 mx-auto'>
                    <button type='submit' className='bg-yellow-500 px-2 py-1 rounded-md border outline-none w-full'>Edit</button>
                </div>
            </form>
        </div>
    );
}
