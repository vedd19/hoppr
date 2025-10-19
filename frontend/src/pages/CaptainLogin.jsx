import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const CaptainLogin = () => {


    const [captainData, setCaptainData] = useState({
        email: "",
        password: "",
    });


    const handleInputChange = (e) => {
        setCaptainData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(captainData)

        setCaptainData({
            email: "",
            password: "",
        })
    }


    return (
        <div className='p-7 pt-20 flex flex-col justify-between h-screen'>
            <div>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <h3 className='text-lg font-medium mb-2'>Whats's your email</h3>
                    <input
                        value={captainData.email}
                        type="email"
                        name='email'
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                        className='bg-[#eeeeee] rounded px-4 py-2 w-full mb-7 text-lg placeholder:text-base'
                        required
                        placeholder='mail@example.com'
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        value={captainData.password}
                        name='password'
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                        className='bg-[#eeeeee] rounded px-4 py-2 w-full mb-7 text-lg placeholder:text-base'
                        type="password"
                        required
                        placeholder='password'
                    />

                    <button
                        type='submit'
                        className='bg-[#111] text-white font-semibold rounded px-4 py-2 w-full mb-7 text-lg placeholder:text-base'
                    >
                        Login
                    </button>
                </form>
                <p className='text-center mt-0'>want to serve users? <Link to='/captain-signup' className='text-blue-500'>create a Captain account here</Link></p>
            </div>

            <div>
                <Link to='/login' className='flex items-center justify-center w-full text-white font-medium py-3 rounded mt-4 bg-[#f5e05b]'>Sign in as User</Link>
            </div>
        </div>
    )
}
