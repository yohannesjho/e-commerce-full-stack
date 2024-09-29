import { Heart, SearchIcon, ShoppingBasket, User2Icon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <div className='py-4 px-8 flex justify-between items-center border-b-2'>
      <div>
         <Image src='/images/logo.jpg' width={70} height={60}/>
      </div>
      
      <div className='flex items-center space-x-2'>
        <input className='border-2 w-96 outline-none rounded-md focus:border-gray-700' />
        <SearchIcon className='cursor-pointer' />
      </div>
      <div className='flex space-x-2'>

        <User2Icon />
        <Heart />
        <ShoppingBasket />
      </div>

    </div>
  )
}
