'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function CategoryList() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('authToken')
            if (token) {
                try {
                    const response = await fetch('http://localhost:5000/api/user/categories/', {
                        method: 'GET',
                        headers: {
                          'Authorization': `Bearer ${token}`   
                        }
                      })
                    const data = await response.json()
                    console.log(data)
                    setCategories(data)
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }

        }

        fetchCategories()
    }, [])


    return (
        <div>
            <table className='border w-full text-left m-8'>
                <thead>
                    <tr className='bg-gray-100 '>
                        <th>Category Name</th>
                        <th>Category description</th>
                        <th>Category Image</th>
                        <th>Actions</th>

                    </tr>

                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td className=''><img className='border w-28 h-16' src={category.img[0]}></img></td>
                            <td><Link href={{
                                pathname: "categories/edit",
                                query: {
                                    id: category._id,
                                    name: category.name,
                                    description: category.description,
                                    img: category.img
                                }
                            }} className='bg-yellow-500 px-2 py-1 rounded-md mr-4 '>Edit</Link><Link href="admin/categories/edit" className='bg-red-500 px-2 py-1 rounded-md'>Delete</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table></div>
    )
}
