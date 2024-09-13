import React from 'react'
import Sidebar from './_components/Sidebar'
import Navbar from './_components/Navbar'

const layout = ({ children }) => {
    return (
        <div className='flex'>
            <Sidebar/>
           
            <div className='flex-grow'>
            <Navbar />
            {children}
            </div>
            
        </div>
    )
}

export default layout