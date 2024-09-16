'use client'
import React, { useState } from 'react'

export default function page() {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imgUrl: '',
    category: '',
    countInStock: '',
  })

  const handleOnSubmit = async () => {
    const formDataToSend =new FormData()

    formDataToSend.append('name',formData.name)
    formDataToSend.append('description',formData.description)
    formDataToSend.append('price',formData.price)
    formDataToSend.append('category',formData.category)
    formDataToSend.append('countInStock',formData.countInStock)

    images.forEach((image, index) => {
      formDataToSend.append('imgUrl', image); // Append each image with the name 'images'
    });
    try {
        const response = await fetch('http://localhost:5000/api/user/products/new', {
        method: 'POST',
        body: formDataToSend, // No need to set Content-Type for FormData, browser does it automatically
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log('Product and images saved successfully', result);
      } else {
        console.error('Error saving product', result.message);
      }
     
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (files) => {
    const selectedFiles = Array.from(files);

    if (selectedFiles.length + images.length > 5) {
      alert('You can only upload up to 5 images.');
      return;
    }

    const imageFiles = selectedFiles.slice(0, 5); // Limit to 5 files
    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file)); // Create preview URLs

    setImages((prevImages) => [...prevImages, ...imageFiles]);
    setPreviews((prevPreviews) => [...prevPreviews, ...imagePreviews]);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length) {
      handleFileChange(files);
    }
  };

  // Drag-and-Drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileChange(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow dropping by preventing default behavior
  };
  return (
    <div>
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

        <div
          className="border-2 border-dashed border-gray-300 p-5 text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p>Drag & drop up to 5 images here, or click to select</p>

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            multiple // Allow selecting multiple files
            onChange={handleFileInputChange}
            className="hidden"
            id="fileInput"
          />

          {/* Label to trigger file input */}
          <label htmlFor="fileInput" className="cursor-pointer">
            <p>Click to select images</p>
          </label>
        </div>

        {/* Display image previews */}
        {previews.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="w-32 h-32">
                <img src={preview} alt={`Preview ${index + 1}`} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        )}
        {/* {submit the data} */}
        <div className='text-center mt-5'>
          <button type='submit' className=' bg-green-500 px-8 py-1 rounded-md text-white'>Submit</button>
        </div>

      </form>
    </div>
  )
}
