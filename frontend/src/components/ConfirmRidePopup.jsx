import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ConfirmRidePopup = ({ setRidePopupPanel, ride, setConfirmRidePopupPanel }) => {

    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const submitHander = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            setConfirmRidePopupPanel(false)
            setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: ride } })
        }


    }


    return (
        <div className='h-full'>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    setConfirmRidePopupPanel(false)
                }}
            ><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm Ride</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='h-30 flex items-center gap-2'>
                    <h3 className='z-1 bg-white rounded-[100%] '><i className="text-7xl ri-account-circle-fill"></i></h3>
                    <h4 className='text-lg font-medium capitalize'>{ride?.user.fullname.firstname + " " + ride?.user.fullname.firstname}</h4>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{ride?.fare} </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash/Cash</p>
                        </div>
                    </div>

                    <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" placeholder='Enter OTP...' className='text-medium font-base bg-[#eee] px-4 mt-5 py-1 w-full rounded-lg' />
                </div>
                <div className='mt-5 w-screen flex gap-2 p-3'>
                    <button onClick={submitHander}
                        className=' bg-green-600 flex justify-center items-center w-1/2 text-white font-semibold p-2 px-10 rounded-lg'>Confirm</button>

                    <button
                        onClick={() => {
                            setConfirmRidePopupPanel(false)
                        }}
                        className='w-1/2 bg-red-600 text-white font-semibold flex justify-center items-center p-2 px-10 rounded-lg'>
                        Cancel
                    </button>


                </div>
            </div>
        </div>
    )
}
