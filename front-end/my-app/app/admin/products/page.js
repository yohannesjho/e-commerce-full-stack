'use client'
import { FilterIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function page() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('authToken')
      
     
      if (token) {
        try {
          console.log("Token before fetch:", token);

          const response = await fetch('http://localhost:5000/api/admin/products', {
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          });
         
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setProducts(data);
           
        } catch (error) {
          console.log(error)
          console.error('Error fetching products:', error);
        }
      }

    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('authToken')
    try {
        const response = await fetch(`http://localhost:5000/api/admin/product/${id}`, {
            method: 'DELETE',
            headers: { 
              'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete the order');
        }
        
        setProducts(products.filter(product => product._id !== id));
    } catch (error) {
        console.error('Error:', error);
    }
};
  return (
    <div className="p-4">
      <div className='bg-gray-800 text-white'>
        <div className='flex justify-between items-center px-2 h-16'>
          <p>Product List</p>
          <div className='flex gap-4'>
            <p className='border px-4 py-1 rounded-md flex items-center gap-1'><FilterIcon size={15} /> Filter</p>
            <p className='border px-4 py-1 rounded-md'>See all</p>
            <Link href="/admin/products/add" className='border px-4 py-1 rounded-md bg-purple-600 flex items-center gap-1'><PlusIcon size={15} /> Add Product</Link>
          </div>
        </div>
      </div>
      <table className='border w-full text-left'>
        <thead>
          <tr className='bg-gray-100 '>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Product Image</th>
            <th>Action</th>
          </tr>

        </thead>
        <tbody>
          {products.map((product,index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.countInStock}</td>
              <td><img className='border w-28 h-16' src={product.imgUrls[0]}></img></td>
              <td><Link href={{
                pathname:'/admin/products/edit',
                query:{
                  id:product._id,
                  name:product.name,
                  category:product.category,
                  description:product.description,
                  price:product.price,
                  countInStock:product.countInStock
                }
              }} className='bg-yellow-500 px-2 py-1 rounded-md text-white hover:bg-yellow-300 duration-300 mr-4 '>Edit</Link><button onClick={()=>handleDelete(product._id)} className='bg-red-500 px-2 py-1 rounded-md hover:bg-red-300 text-white duration-300'>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}
