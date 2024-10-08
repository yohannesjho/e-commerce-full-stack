// Product Detail Page - Ensure the correct product ID is passed to addToCart
'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../../context/cartContext';

export default function ProductDetail({ params }) {
    const { id } = params;
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/products/${id}`);
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

    const handleAddToCart = (product) => {
        addToCart({
            id: product._id,  // Ensure the unique _id from your backend is used
            name:  product.name,
            price: product.price,
            image: product.imgUrls 
        });
    };

    return (
        <div className="p-8 flex justify-between">
            <div>
                <img src={product.imgUrls} width={400} height={400} alt="product image" />
            </div>
            <div className="border-2 w-96 shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-semi-bold mb-4 uppercase">{product.name}</h1>
                <p className="text-base uppercase">Price: ${product.price}</p>
                <p className="text-base uppercase">Category: {product.category}</p>
                <p className="text-base uppercase">Brand: {product.brand}</p>
                <p className="text-base uppercase">Description: {product.description}</p>
                <button onClick={() => handleAddToCart(product)} className="bg-purple-500 px-2 py-1 rounded-md hover:bg-purple-400 hover:text-white duration-300 w-full my-6">
                    Add to cart
                </button>
            </div>
        </div>
    );
}
