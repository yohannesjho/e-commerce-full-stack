import { ArrowDown, Bell, MenuIcon, SearchIcon } from 'lucide-react'
import React from 'react'

export default function navbar() {
  return (
    <div className='flex justify-between items-center border h-16 px-2 text-sm md:text-base'> 
         <MenuIcon className='block md:hidden'/>
        <div>Home</div>
        <div className='flex gap-2 items-center'>
            <SearchIcon className='cursor-pointer' size={20}/>
            <Bell className='cursor-pointer' size={20}/>
            <ArrowDown className='cursor-pointer' size={20}/>
        </div>
    </div>
  )
}
