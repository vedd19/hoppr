import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainDataContext';



export const CaptainSignup = () => {

    const { captain, setCaptain } = useContext(CaptainDataContext);

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [userData, setuserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        vehicleColor: "",
        vehiclePlate: "",
        vehicleCapacity: "",
        vehicleType: "",
    });


    const handleInputChange = (e) => {
        setuserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            fullname: {
                firstname: userData.firstname,
                lastname: userData.lastname,
            },
            email: userData.email,
            password: userData.password,
            vehicle: {
                color: userData.vehicleColor,
                plate: userData.vehiclePlate,
                capacity: userData.vehicleCapacity,
                vehicleType: userData.vehicleType,
            }
        }

        try {
            console.log('payload', payload)
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, { ...payload })

            if (response.status === 201) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                setCaptain(response.data.captain);
                enqueueSnackbar('Captain account created successfully', { variant: 'success' });
                navigate('/captain-home');
            } else {
                enqueueSnackbar(response.data.message, { variant: 'warning' });
            }

        } catch (err) {
            console.log(err)
        }
        console.log(userData)

        setuserData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            vehicleColor: "",
            vehiclePlate: "",
            vehicleCapacity: "",
            vehicleType: "",
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

                    <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                    <div className='flex gap-4 mb-4'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="text"
                            name='vehicleColor'
                            placeholder='Vehicle Color'
                            value={userData.vehicleColor}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        />
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="text"
                            name='vehiclePlate'
                            placeholder='Vehicle Plate'
                            value={userData.vehiclePlate}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        />
                    </div>
                    <div className='flex gap-4 mb-4'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="number"
                            name='vehicleCapacity'
                            placeholder='Vehicle Capacity'
                            value={userData.vehicleCapacity}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        />
                        <select
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            value={userData.vehicleType}
                            name='vehicleType'
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        >
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value="car">car</option>
                            <option value="auto">auto</option>
                            <option value="motorcycle">motorcycle</option>
                        </select>
                    </div>


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
                        Create Captain Account
                    </button>
                </form>
                <p className='text-center mt-0'>Already have a captain account?? <Link to='/captain-login' className='text-blue-500'>Sign in here</Link></p>
            </div>

            <div>
                <p className='text-xs text-center'>The site is protecxted by reCAPTCHA and the  <span className='underline font-bold'>Google Privacy Policy</span> and <span className='underline font-bold'>Terms of Service apply</span>.</p>
            </div>
        </div>
    )
}
