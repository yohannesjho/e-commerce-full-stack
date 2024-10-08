'use client'
import React, { useState } from 'react'

export default function page() {


  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imgUrls: [],
    category: '',
    brand: '',
    countInStock: '',
  })
  const [success, setSuccess] = useState("");
  const [error, setError] = useState('');
  const [message, setMessage] = useState('')

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    const token = localStorage.getItem('authToken');

    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('countInStock', formData.countInStock);

    formData.imgUrls.forEach((image) => {
      formDataToSend.append('images', image);
    });
   console.log(formDataToSend)
    try {
      const response = await fetch('http://localhost:5000/api/admin/product/new', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess('Product created successfully');
        setError('');
        setMessage(''); // Optionally clear any other states
      } else {
        const errorMessage = await response.text();
        setError(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error submitting the form', error);
      setError('Something went wrong');
    }
  };




  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
  }


  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, imgUrls: files })
   
  };

  return (
    <div>
      {success && <p className='text-green-500'>{success}</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {message ? <p className='text-red-500'>{message}</p> : ''}
      <form className='border-2 rounded-md md:w-3/4 md:mx-auto mx-4 sm:mx-8 p-8 my-8 ' onSubmit={handleOnSubmit}>
        <h2 className='text-2xl mb-2'>Product Information page</h2>
        <p className='text-gray-400 mb-12'>please provide the following information about your product</p>
        <div className='flex space-x-4 mb-6'>
          <div className='w-1/2 space-y-4'>
            <h2 className="text-gray-400">Product Name</h2>
            <input className='border-2  w-full border-gray-700 rounded-md px-2 py-1 outline-none' type='text' name='name' value={formData.name} onChange={handleInputChange} required />
          </div>

          <div className='w-1/2 space-y-4'>
            <h2 className="text-gray-400">Category</h2>
            <input className='border-2  w-full border-gray-700 rounded-md px-2 py-1 outline-none' type='text' name='category' value={formData.category} onChange={handleInputChange} required />
          </div>
          <div className='w-1/2 space-y-4'>
            <h2 className="text-gray-400">Brand</h2>
            <input className='border-2  w-full border-gray-700 rounded-md px-2 py-1 outline-none' type='text' name='brand' value={formData.brand} onChange={handleInputChange} required />
          </div>
        </div>
        <div className='flex flex-col justify-center mb-6 '>
          <h2 className="text-gray-400 mb-4">Product description</h2>
          <textarea className='border-2 w-full border-gray-700 rounded-md px-2 py-1 outline-none' type='text' name='description' value={formData.description} onChange={handleInputChange} required />
        </div>
        <div className='flex space-x-4 mb-6'>
          <div>
            <h2 className="text-gray-400  ">Product Price</h2>
            <input className='border-2 w-full border-gray-700 rounded-md px-2 py-1 outline-none' type='number' name='price' value={formData.price} onChange={handleInputChange} required />
          </div>

          <div>
            <h2 className="text-gray-400  ">count in stock</h2>
            <input className='border-2 w-full border-gray-700 rounded-md px-2 py-1 outline-none' type='number' name='countInStock' value={formData.countInStock} onChange={handleInputChange} required />
          </div>
        </div>


        <div className='text-center'>
          <label htmlFor='imgUrls'> Upload Images</label>
          <input
            type="file"
            name='imgUrls'
            multiple
            onChange={handleFileInputChange}
            className=" p-2 border rounded"

          />
        </div>
        {/* {submit the data} */}
        <div className='text-center mt-5'>
          <button type='submit' className=' bg-green-500 px-8 py-1 rounded-md text-white'>Submit</button>
        </div>

      </form>
    </div>
  )
}
