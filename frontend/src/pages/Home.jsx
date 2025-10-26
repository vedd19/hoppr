import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import backgroundImage from '../assets/background2.png';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css'
import { LocationSearchPanel } from '../components/LocationSearchPanel';
import { SelectDrive } from '../components/SelectDrive';
import { SelectedVehicleType } from '../components/SelectedVehicleType';
import { DriverWaiting } from '../components/DriverWaiting';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainDataContext';
import LiveTracking from '../components/LiveTracking';



export const Home = () => {
    const navigate = useNavigate();
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const { isLogo, setIsLogo } = useContext(UserDataContext);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [vehicleSelected, setVehicleSelected] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [driverMatched, setDriverMatched] = useState(false);
    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null);
    const [vehicleType, setVehicleType] = useState(null)
    const [fare, setFare] = useState({})
    const [ride, setRide] = useState(null)

    const { user } = useContext(UserDataContext);
    // const { captain } = useContext(CaptainDataContext)
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.emit("join", { userId: user._id, userType: "user" })
        // console.log("captain", captain)
    }, [])

    socket.on('ride-confirmed', ride => {
        setVehicleSelected(false)
        setDriverMatched(true)
        setRide(ride)
        console.log("inside user ride-confirmed")
    })

    socket.on('ride-started', ride => {
        console.log("ride")
        setDriverMatched(false)
        navigate('/riding', { state: { ride } })
    })


    useEffect(() => {

        if (panelOpen) {
            panelRef.current.style.display = 'block';
            panelRef.current.style.height = '70%';

        }
        else {
            panelRef.current.style.display = 'none';
            panelRef.current.style.height = "0%";

        }
    }, [panelOpen])


    const handleLogout = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (res.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
            }



        } catch (err) {
            console.log(err)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();

    }

    useEffect(() => {
        if (vehiclePanel) {
            setPanelOpen(false);
            setIsLogo(true);
        }
    }, [vehiclePanel]);

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            console.log(response.data.suggestions)
            setPickupSuggestions(response.data.suggestions)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data.suggestions)
        } catch (err) {
            console.log(err)
        }
    }

    async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setFare(response.data)
        console.log(response.data)

    }

    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

    }


    return (

        <div className="h-screen w-screen relative">
            <div
                // onClick={() => {
                //     setVehiclePanel(false)
                // }}
                className=" h-screen w-screen">
                {/* <img className="cursor-pointer h-full w-full object-cover" src={backgroundImage} alt="img" /> */}
                <LiveTracking />
            </div>

            <div className="absolute flex flex-col justify-end top-0 h-full w-full">
                <div className="h-[30%] p-5 bg-white">
                    {!panelOpen && <h4 className='text-2xl  font-semibold'>Find a trip</h4>}
                    {panelOpen && <h5 className='cursor-pointer' onClick={() => {
                        setPanelOpen(false);
                        setIsLogo(true);

                    }}> <i className="text-2xl font-medium py-4 ri-arrow-down-s-line"></i></h5>}
                    <form className='mt-2 flex flex-col gap-2 ' onSubmit={(e) => submitHandler(e)}>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setIsLogo(false);
                                setActiveField('pickup');
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            type="text"
                            placeholder='Add a pickup location'
                            className='bg-[#eee] px-10 py-2 text-base rounded-lg w-full'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setIsLogo(false);
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            type="text"
                            placeholder='Add a drop location'
                            className='bg-[#eee] px-10 py-2 text-base rounded-lg w-full'
                        />

                        <button onClick={findTrip}
                            type='submit' className='cursor-pointer bg-black text-white w-full py-2 px-1 rounded-lg font-semibold'>Find Trip</button>
                    </form>

                </div>

                <div ref={panelRef} className="bg-white h-[0%] hidden">
                    <LocationSearchPanel
                        vehiclePanel={vehiclePanel}
                        setVehiclePanel={setVehiclePanel}
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>

                {!vehicleSelected ? (<div ref={vehiclePanelRef} className={`py-3 rounded-lg bg-white fixed w-full bottom-0 ${!vehiclePanel ? 'translate-y-full' : 'translate-y-[0]'}`}>
                    <div className='flex justify-between px-3'>

                        <h4 className='text-xl font-bold p-2 mb-2 px-5'>Choose a Vehicle</h4> <span onClick={() => {
                            setVehiclePanel(false);
                        }}>
                            <i className="text-2xl text-blue-700 ri-arrow-down-s-line"></i></span>
                    </div>
                    <SelectDrive
                        fare={fare}
                        vehicleSelected={vehicleSelected}
                        setVehicleSelected={setVehicleSelected}
                        setVehiclePanel={setVehiclePanel}
                        setUserInfo={setUserInfo}
                        setVehicleType={setVehicleType}
                    />
                </div>
                ) :
                    (
                        <SelectedVehicleType
                            createRide={createRide}
                            driverMatched={driverMatched} setDriverMatched={setDriverMatched} vehicleSelected={vehicleSelected} setVehicleSelected={setVehicleSelected}
                            pickup={pickup}
                            destination={destination}
                            vehicleType={vehicleType}
                            fare={fare}
                        />
                    )}


                {driverMatched && <div className={`h-[75%] py-3 px-5 rounded-lg bg-white fixed w-full bottom-0 ${!driverMatched ? 'translate-y-full' : 'translate-y-[0]'}`}><DriverWaiting

                    vehicleType={vehicleType} ride={ride} driverMatched={driverMatched} /></div>}

            </div>





            {/* <button onClick={handleLogout}>logout</button> */}


        </div >

    )
}
