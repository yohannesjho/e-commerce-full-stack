'use client'
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/cartContext'
import { SearchIcon } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchInput, setSearchInput] = useState('')

  const fetchProducts = async () => {
    try {
      const categoryQuery = selectedCategory ? `category=${selectedCategory}` : '';
      const brandQuery = selectedBrand ? `brand=${selectedBrand}` : '';
      const searchQuery = searchInput ? `search=${searchInput}`:''
      const query = [categoryQuery, brandQuery, searchQuery].filter(Boolean).join('&');

      const url = query ? `http://localhost:5000/api/user/products?${query}` : 'http://localhost:5000/api/user/products'

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
      console.log(products)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand,searchInput]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  
  };
  return (
    <div className="px-8">
      <div className="flex justify-center">
        <div className='flex justify-center  space-x-2 my-8  w-8 sm:w-16 md:w-48 lg:w-72'>
          <input onChange={(e) => handleInputChange(e)} value={searchInput} className='border-2 w-96 outline-none rounded-md focus:border-gray-700' />
          <SearchIcon className='cursor-pointer' />
        </div>

      </div>
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="my-4 flex space-x-2">
        <button className="bg-green-500 hover:bg-green-300 px-2 py-1 rounded-md duration-300 hover:text-white" onClick={() => setSelectedCategory('women')}  >Women</button>
        <button className="bg-green-500 hover:bg-green-300 px-2 py-1 rounded-md duration-300 hover:text-white" onClick={() => setSelectedCategory('men')}  >Men</button>
        <button className="bg-green-500 hover:bg-green-300 px-2 py-1 rounded-md duration-300 hover:text-white" onClick={() => setSelectedCategory('kids')}  >Kids</button>
        <button className="bg-green-500 hover:bg-green-300 px-2 py-1 rounded-md duration-300 hover:text-white" onClick={() => setSelectedBrand('Nike')}  >Nike</button>
        <button className="bg-green-500 hover:bg-green-300 px-2 py-1 rounded-md duration-300 hover:text-white" onClick={() => setSelectedBrand('Adidas')}  >Adidas</button>
        <button className="bg-green-500 hover:bg-green-300 px-2 py-1 rounded-md duration-300 hover:text-white" onClick={() => {

          setSelectedCategory(''); // Clear category
          setSelectedBrand(''); // Clear brand

        }}>All</button>
      </div>

      {/* Display Products */}
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link href={`/customer/products/${product._id}`} key={product._id} className="bg-white p-4 shadow-md">
            <img src={product.imgUrls[0]} width={300} height={50} alt="product image" />
            <h2 className="font-bold">{product.name}</h2>
            <p>${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
          </Link>
        ))}
      </div>


    </div>
  )
}
