'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Edit() {
  const searchParams = useSearchParams();
  const [product,setProduct] = useState({
    id:'',
    name:'',
    category:'',
    description:'',
    price:0,
    countInStock:0,
    imgUrls:[{}]

  })
  const [success,setSuccess]= useState('')
  const [error,setError]= useState('')

  useEffect(()=>{
       const id = searchParams.get('id')
       const name = searchParams.get('name')
       const category = searchParams.get('category')
       const description = searchParams.get('description')
       const price = parseFloat(searchParams.get('price'));
       const countInStock = parseInt(searchParams.get('countInStock'));
       
       if (name && category && description && price && countInStock) {
        setProduct({ name, category, description, price, countInStock, id });
      }

       

  },[searchParams])

  const handleInputChange = (e)=>{
 const {name,value} = e.target
 setProduct({...product,[name]:value})
 
  }

  const handleFileInputChange = (e)=>{
    const files = Array.from(e.target.files)
    setProduct({...product, imgUrls:files})
    console.log(product.imgUrls)
    
  }

  const handleSubmission = async (e)=>{
    e.preventDefault()
    const token = localStorage.getItem('authToken')
    const formData = new FormData();
    formData.append('id', product.id);
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('countInStock', product.countInStock);

    product.imgUrls.forEach((file, index) => {
      formData.append('imgUrls',file);
    });
     
    try {
      const response = await fetch(`http://localhost:5000/api/admin/product/${product.id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if(response.ok){
        const data = await response.json();
      console.log(data);
      setSuccess('Product updated successfully');
      }
    } catch (error) {
      console.log(error);
      setError(`${error}`);
    }
  }
  return (
    <div>
      {success?<p className='text-green-500'>{success}</p>:<p className='text-red-500'>{error}</p>}
      <form onSubmit={handleSubmission} className='border-2 rounded-md md:w-3/4 md:mx-auto mx-4 sm:mx-8 p-8 my-8 '  >
        <h2 className='text-2xl mb-2'>Product Edition page</h2>
        <p className='text-gray-400 mb-12'>please Edit the following information about your product</p>
        <div className='flex space-x-4 mb-6'>
          <div className='w-1/2 space-y-4'>
            <h2 className="text-gray-400">Product Name</h2>
            <input className='border-2  w-full border-gray-700 rounded-md px-2 py-1 outline-none' type='text' name='name' value={product.name} onChange={handleInputChange} required />
          </div>

          <div className='w-1/2 space-y-4'>
            <h2 className="text-gray-400">Category</h2>
            <input className='border-2  w-full border-gray-700 rounded-md px-2 py-1 outline-none' type='text' name='category' value={product.category} onChange={handleInputChange} required />
          </div>

        </div>
        <div className='flex flex-col justify-center mb-6 '>
          <h2 className="text-gray-400 mb-4">Product description</h2>
          <textarea className='border-2 w-full border-gray-700 rounded-md px-2 py-1 outline-none' type='text' name='description' value={product.description} onChange={handleInputChange} required />
        </div>
        <div className='flex space-x-4 mb-6'>
          <div>
            <h2 className="text-gray-400  ">Product Price</h2>
            <input className='border-2 w-full border-gray-700 rounded-md px-2 py-1 outline-none' type='number' name='price' value={product.price} onChange={handleInputChange} required />
          </div>

          <div>
            <h2 className="text-gray-400  ">count in stock</h2>
            <input className='border-2 w-full border-gray-700 rounded-md px-2 py-1 outline-none' type='number' name='countInStock' value={product.countInStock} onChange={handleInputChange} required />
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
