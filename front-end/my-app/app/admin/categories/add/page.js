'use client'
import React, { useState } from 'react'
import axios from 'axios';


export default function page() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    img: [],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    setFormData({
      ...formData,
      img: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);

      formData.img.forEach((file,index) => {
        data.append("images",file)
      });
      
      console.log(data)

      // Make API request to the backend
      const response = await axios.post('http://localhost:5000/api/user/categories/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',

        },
      });

      if (response.data) {
        setSuccess('Category created successfully!');
      }
    } catch (error) {
      console.log('Error creating category', error);
      setError(` ${error}`);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Category</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="img" className="block text-gray-700">
            Image
          </label>
          <input
            type="file"
            name="img"
            multiple
            onChange={handleFileChange}
            
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Category
        </button>
      </form>
    </div>
  )
}
