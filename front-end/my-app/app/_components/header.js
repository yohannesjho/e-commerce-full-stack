import { Heart, SearchIcon, ShoppingBasket, User2Icon } from 'lucide-react'
import React from 'react'

export default function Header() {
  return (
    <div className='py-4  flex justify-between border-b-2'>
      <div>
        <ul className='flex space-x-4'>
          <li>WOMEN</li>
          <li>MEN</li>
          <li>KIDS</li>
          <li>BRANDS</li>
        </ul>
      </div>
      <div>
        <p>HEAVENLY</p>
      </div>
      <div className='flex items-center space-x-2'>
        <input className='border-2 w-96 outline-none rounded-md focus:border-gray-700' />
        <SearchIcon className='cursor-pointer'/>
      </div>
      <div className='flex space-x-2'>

        <User2Icon />
        <Heart />
        <ShoppingBasket />
      </div>

    </div>
  )
}
