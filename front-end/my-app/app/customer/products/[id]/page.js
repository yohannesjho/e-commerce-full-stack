// app/products/[id]/page.js
'use client'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { CartContext } from '../../../context/cartContext'
import Cart from '../../../cart/page'


export default function ProductDetail({ params }) {
    const [showModal, setShowModal] = useState(false)
    const { cartItems, addToCart } = useContext(CartContext)
    const { id } = params;
    const [product, setProduct] = useState(null);

    const toggle = () => {
        setShowModal(!showModal)
    }



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/products/${id}`); // Fetch product by ID
                const data = await response.json();
                setProduct(data);
                console.log(data)
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
        <div className="p-8 flex justify-between">
           
            <div>
                <Image src='/images/logo.jpg' width={400} height={400} alt="product image" />
            </div>
            <div className='border-2 w-96 shadow-md rounded-lg p-8'>
                <h1 className="text-2xl font-semi-bold mb-4 uppercase">{product.name}</h1>
                <p className='text-base uppercase'>Price: ${product.price} </p>
                <p className='text-base uppercase'>Category:  {product.category} </p>
                <p className='text-base uppercase'>Brand:  {product.brand} </p>
                <p className='text-base uppercase'>Description:{product.description}</p>
                <button onClick={() => addToCart(product)} className='bg-purple-500 px-2 py-1 rounded-md  hover:bg-purple-400 hover:text-white duration-300 w-full my-6'>Add to cart</button>
            </div>
            
        </div>


    );
}
