import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { UserDataContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

export const UserSignup = () => {

    const [userData, setuserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const { user, setUser } = useContext(UserDataContext);
    const navigate = useNavigate()


    const handleInputChange = (e) => {
        setuserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: {
                firstname: userData.firstname,
                lastname: userData.lastname,
            },
            email: userData.email,
            password: userData.password
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
            if (response.status === 201) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('token', data.token)
                navigate('/home')
            }
        } catch (err) {
            console.log('error in frontend /users/register post request', err)
        }

        console.log(userData)

        setuserData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        })
    }


    return (
        <div className='p-7 pt-20 flex flex-col justify-between h-screen'>
            <div>
                <form action="" onSubmit={(e) => handleSubmit(e)}>

                    <h3 className='text-base font-medium mb-2'>Whats's your Name</h3>

                    <div className='flex w-full gap-4 mb-2'>

                        <input
                            value={userData.firstname}
                            type="text"
                            name='firstname'
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-base placeholder:text-sm'
                            required
                            placeholder='firstname'
                        />

                        <input
                            value={userData.lastname}
                            type="text"
                            name='lastname'
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                            className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-base placeholder:text-sm'
                            required
                            placeholder='lastname'
                        />

                    </div>


                    <h3 className='text-base font-medium mb-3'>Whats's your email</h3>
                    <input
                        value={userData.email}
                        type="email"
                        name='email'
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                        className='bg-[#eeeeee] rounded px-4 py-2 w-full mb-3 text-base placeholder:text-sm'
                        required
                        placeholder='mail@example.com'
                    />

                    <h3 className='text-base font-medium mb-2'>Enter Password</h3>
                    <input
                        value={userData.password}
                        name='password'
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                        className='bg-[#eeeeee] rounded px-4 py-2 w-full mb-3 text-base placeholder:text-sm'
                        type="password"
                        required
                        placeholder='password'
                    />

                    <button
                        type='submit'
                        className='bg-[#111] text-white font-semibold rounded px-4 py-2 w-full mb-5 text-lg'
                    >
                        Register
                    </button>
                </form>
                <p className='text-center mt-0'>Already have an account?? <Link to='/login' className='text-blue-500'>Sign in here</Link></p>
            </div>

            <div>
                <p className='text-xs text-center'>The site is protecxted by reCAPTCHA and the  <span className='underline font-bold'>Google Privacy Policy</span> and <span className='underline font-bold'>Terms of Service apply</span>.</p>
            </div>
        </div>
    )
}
