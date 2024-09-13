import { ArrowDown, Bell, MenuIcon, SearchIcon } from 'lucide-react'
import React from 'react'

export default function navbar() {
  return (
    <div className='flex justify-between items-center border h-16 px-2 text-sm md:text-base'> 
         <MenuIcon className='block md:hidden'/>
        <div>Products</div>
        <div className='flex gap-2 items-center'>
            <SearchIcon size={20}/>
            <Bell size={20}/>
            <ArrowDown size={20}/>
        </div>
    </div>
  )
}
