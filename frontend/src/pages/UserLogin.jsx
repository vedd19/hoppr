import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export const UserLogin = () => {

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext)

    const [userData, setuserData] = useState({
        email: "",
        password: "",
    });


    const handleInputChange = (e) => {
        setuserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
            if (response.status === 200) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('token', data.token);
                navigate('/home');
            }
        } catch (err) {
            console.log(err)
        }

        console.log(userData)

        setuserData({
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
                        value={userData.email}
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
                        value={userData.password}
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
                <p className='text-center mt-0'>new user? <Link to='/signup' className='text-blue-500'>create a user account here</Link></p>
            </div>

            <div>
                <Link to='/captain-login' className='flex items-center justify-center w-full text-white font-medium py-3 rounded mt-4 bg-[#00997a]'>Sign in as Captain</Link>
            </div>
        </div>
    )
}
