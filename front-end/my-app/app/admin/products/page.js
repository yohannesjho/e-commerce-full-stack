'use client'
import { FilterIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function page() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/user/products');
          console.log(response)
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
            const data = await response.json();
            setProducts(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);
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
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                   {products.map(product=>(
                     <tr>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        <td>{product.countInStock}</td>
                        <td><button className='bg-yellow-500 px-2 py-1 rounded-md mr-4 '>Edit</button><button className='bg-red-500 px-2 py-1 rounded-md'>Delete</button></td>
                     </tr>
                   ))}
                </tbody>
            </table>

        </div>
    )
}
