import React from 'react'

import landingImg from '../assets/hopprLanding.png'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div className='bg-cover bg-center h-screen  pt-5 w-full flex justify-end flex-col' style={{ backgroundImage: `url(${landingImg})`, position: 'relative' }}>
            <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-3xl font-bold'>
                    Get Started with Uber
                </h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>
            </div>

        </div>
    )
}
