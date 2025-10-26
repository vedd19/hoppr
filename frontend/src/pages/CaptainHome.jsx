import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
// import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useEffect, useContext } from 'react'
// import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainDataContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { CaptainDetails } from '../components/CaptainDetails'
import { RidePopup } from '../components/RidePopup'
import { ConfirmRidePopup } from '../components/ConfirmRidePopup'

import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'


export const CaptainHome = () => {
    const navigate = useNavigate();
    const [ridePopupPanel, setRidePopupPanel] = useState(false)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
    const [ride, setRide] = useState(null)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext);


    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        // return () => clearInterval(locationInterval)
    }, [])



    socket.on('new-ride', (data) => {

        setRide(data)
        setRidePopupPanel(true)

    })

    async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)

    }

    const handleCaptainLogout = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (res.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-end w-screen'>

                <Link to='/captain-home' className=' h-10 w-10 bg-white shadow-lg flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
                <LiveTracking />

            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails
                    captain={captain}
                />
            </div>

            <div className={` ${ridePopupPanel ? 'translate-y-0' : 'translate-y-full'} fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt 12`}>

                <RidePopup
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>

            <div className={` ${confirmRidePopupPanel ? 'translate-y-0' : 'translate-y-full'} h-screen fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt 12`}>

                <ConfirmRidePopup setRidePopupPanel={setRidePopupPanel} ride={ride} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />

            </div>



        </div>
    )
}
