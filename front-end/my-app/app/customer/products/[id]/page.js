// app/products/[id]/page.js
'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ProductDetail({ params }) {
  const { id } = params; // Get the product ID from the dynamic route
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/products/${id}`); // Fetch product by ID
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8">
      <Image src='/images/logo.jpg' width={400} height={400} alt="product image" />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Brand: {product.brand}</p>
      <p>Description: {product.description}</p>
    </div>
  );
}
