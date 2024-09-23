'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [users,setUsers] = useState([])
    useEffect(()=>{
    const fetchUsers = async ()=>{
        try {
            const response = await fetch('http://localhost:5000/api/admin/users')
            const data = await response.json()
            console.log(data)
            setUsers(data)    
        } catch (error) {
            console.log(error)
        }
    }
    fetchUsers()
    },[])

    const handleDelete = async (id)=>{
        try {
            const response = await fetch(`http://localhost:5000/api/admin/user/${id}`,{
                method:'DELETE'
            })
            if(response.ok){
                console.log('user deleted successfully!')
                setUsers(users.filter(user=>user._id !== id))
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <div className='text-right my-4'>
            <Link href='/admin/user/new' className='bg-green-500 px-2 py-1 rounded-md text-white hover:bg-green-300 duration-300 my-8'>
              Create new user
            </Link>
        </div>
         <table className='w-full mx-8 my-4 border-2'>
            <thead >
              <tr className='text-left'>
                <th>Name</th>
                <th>Email</th>
                <th>Shipping Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user=>(
                <tr>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.shippingAddress ? <><p>{user.shippingAddress.street}</p><p>{user.shippingAddress.city}</p></>:''}</td>
                    <td><button onClick={()=>handleDelete(user._id)} className='bg-red-500 hover:red-300 duration-300 px-2 py-1 rounded-md text-white'>Delete</button></td>
                </tr>
              ))}
            </tbody>
         </table>
    </div>
  )
}
