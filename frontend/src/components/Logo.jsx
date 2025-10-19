import React from 'react'
import logo from '../assets/logoHoppr.png'
export const Logo = () => {
    return (
        <>
            <img style={{ position: 'absolute', zIndex: 10 }}
                className='w-20 ml-7 mt-3' src={logo} alt="logo" />
        </>
    )
}
