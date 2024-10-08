'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
 

export default function page() {
    const searchParams = useSearchParams();

    const [categoryData, setCategoryData] = useState({ id: "", name: "", description: "", img: [] });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState('');

    useEffect(() => {
        const id = searchParams.get('id');
        const name = searchParams.get('name');
        const description = searchParams.get('description');
        

        if (id && name && description ) {
            setCategoryData({ id, name, description });
        }
    }, [searchParams]);

    const handleInputChange = (e) => {
         
        const { name, value } = e.target;
        
        setCategoryData({ ...categoryData, [name]: value });
        console.log(categoryData)
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setCategoryData({ ...categoryData, img: files });
        console.log(categoryData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken')
        try {
            const data = new FormData();
            data.append('id', categoryData.id);
            data.append('name', categoryData.name);
            data.append('description', categoryData.description);
           

            
            categoryData.img.forEach((file,index) => {
                data.append('images', file);
            });
           
             
            const response = await fetch(`http://localhost:5000/api/admin/category/${categoryData.id}`, {
                method: 'PUT',
                headers: { 
                  'Authorization': `Bearer ${token}`
                },
                body: data
            });
             
            if (response.data) {
                setSuccess("Category edited successfully!");
                setError('')
            }
        } catch (error) {
            setError(`something went wrong`);
            setSuccess('')
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
