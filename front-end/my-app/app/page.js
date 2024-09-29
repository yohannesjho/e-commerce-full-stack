'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const fetchProducts = async () => {
    try {
      const categoryQuery = selectedCategory ? `category=${selectedCategory}` : '';
      const brandQuery = selectedBrand ? `brand=${selectedBrand}` : '';
      const query = [categoryQuery, brandQuery].filter(Boolean).join('&');

      const url = query ? `http://localhost:5000/api/user/products?${query}` : 'http://localhost:5000/api/user/products'

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand]);


  return (
    <div className="px-8">
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
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 shadow-md">
            <Image src='/images/logo.jpg' width={300} height={50} alt="product image"/>
            <h2 className="font-bold">{product.name}</h2>
            <p>${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
          </div>
        ))}
      </div>


    </div>
  )
}
