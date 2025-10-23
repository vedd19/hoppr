import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext';
import axios from 'axios';
import backgroundImage from '../assets/background2.png';
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css'
import { LocationSearchPanel } from '../components/LocationSearchPanel';
import { SelectDrive } from '../components/SelectDrive';
import { SelectedVehicleType } from '../components/SelectedVehicleType';
import { DriverWaiting } from '../components/DriverWaiting';


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


    return (

        <div className="h-screen w-screen relative">
            <div
                onClick={() => {
                    setVehiclePanel(false)
                }}
                className=" h-screen w-screen">
                <img className="cursor-pointer h-full w-full object-cover" src={backgroundImage} alt="img" />
            </div>

            <div className="absolute flex flex-col justify-end top-0 h-full w-full">
                <div className="h-[30%] p-5 bg-white">
                    {!panelOpen && <h4 className='text-2xl  font-semibold'>Find a trip</h4>}
                    {panelOpen && <h5 className='cursor-pointer' onClick={() => {
                        setPanelOpen(false);
                        setIsLogo(true);

                    }}> <i className="text-2xl font-medium py-4 ri-arrow-down-s-line"></i></h5>}
                    <form onSubmit={(e) => submitHandler(e)}>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setIsLogo(false);
                            }}
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            type="text"
                            placeholder='Add a pickup location'
                            className='bg-[#eee] px-10 py-2 text-base rounded-lg w-full mt-2'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setIsLogo(false);
                            }}
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            type="text"
                            placeholder='Add a drop location'
                            className='bg-[#eee] px-10 py-2 text-base rounded-lg mt-6 w-full'
                        />
                    </form>
                </div>

                <div ref={panelRef} className="bg-white h-[0%] hidden">
                    <LocationSearchPanel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} />
                </div>

                {!vehicleSelected ? (<div ref={vehiclePanelRef} className={`py-3 rounded-lg bg-white fixed w-full bottom-0 ${!vehiclePanel ? 'translate-y-full' : 'translate-y-[0]'}`}>
                    <div className='flex justify-between px-3'>

                        <h4 className='text-xl font-bold p-2 mb-2 px-5'>Choose a Vehicle</h4> <span onClick={() => {
                            setVehiclePanel(false);
                        }}>
                            <i className="text-2xl text-blue-700 ri-arrow-down-s-line"></i></span>
                    </div>
                    <SelectDrive vehicleSelected={vehicleSelected} setVehicleSelected={setVehicleSelected} setVehiclePanel={setVehiclePanel} setUserInfo={setUserInfo} />
                </div>) : (<SelectedVehicleType driverMatched={driverMatched} setDriverMatched={setDriverMatched} vehicleSelected={vehicleSelected} setVehicleSelected={setVehicleSelected} />)}


                {driverMatched && <div className={`h-[75%] py-3 px-5 rounded-lg bg-white fixed w-full bottom-0 ${!driverMatched ? 'translate-y-full' : 'translate-y-[0]'}`}><DriverWaiting driverMatched={driverMatched} /></div>}

            </div>





            {/* <button onClick={handleLogout}>logout</button> */}


        </div >

    )
}
