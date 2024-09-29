'use client'

import React, { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/api/user/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className='px-8'>
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 shadow-md">
            <h2 className="font-bold">{product.name}</h2>
            <div><img src={product.imgUrl} alt={product.name}/></div>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
