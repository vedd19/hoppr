import React, { useState } from 'react'
import car from '../assets/car.png';
import motorcycle from "../assets/motorcycle.png"
import auto from "../assets/rikshaw.png"

export const SelectedVehicleType = ({ driverMatched, setDriverMatched, vehicleSelected, setVehicleSelected, createRide, pickup, destination, vehicleType, fare }) => {
    const [isConfirm, setIsConfirm] = useState(true);
    const [showIsMatched, setShowIsMatched] = useState(false);

    // useState(() => {
    //     if (showIsMatched) {
    //         setVehicleSelected(false);
    //     }
    // }, [showIsMatched]);

    return (
        <div className={`py-3 px-5 rounded-lg bg-white fixed w-full bottom-0 ${!vehicleSelected ? 'translate-y-full' : 'translate-y-[0]'}`}>
            <div className='flex flex-col'>
                <h4 onClick={() => {
                    setVehicleSelected(false)
                }} className='cursor-pointer opacity-30 self-center text-3xl font-medium'><i className="ri-arrow-down-wide-fill"></i></h4>
                <h4 className='text-2xl font-bold'>{isConfirm ? "confirm your ride" : 'Looking for nearby drivers'}</h4>
                <div className='opacity-30 my-2 w-full h-[1px] bg-gray-300'></div>
            </div>

            <div className='w-full h-40'>
                <img className='h-full w-full object-contain' src={vehicleType === "car" ? car : (vehicleType === "motorcycle" ? motorcycle : auto)} alt="" />
            </div>
            <div className='my-2 w-full h-[2px] bg-gray-300 opacity-30'></div>
            <div className='flex flex-col gap-5 mt-5'>
                <div className='flex gap-3 items-center'>
                    <h4><i className="ri-map-pin-range-fill"></i></h4>
                    <div>
                        <h4 className='text-xl font-semibold'>Destination</h4>
                        <p className='text-gray-600 text-sm'>{destination}</p>
                    </div>

                </div>
                <hr className='border-gray-300 opacity-30 border-1' />

                <div className='flex gap-3 items-center'>
                    <h4><i className="ri-square-fill"></i></h4>
                    <div>
                        <h4 className='text-xl font-semibold'>Pickup</h4>
                        <p className='text-gray-600 text-sm'>{pickup}</p>
                    </div>
                </div>
                <hr className='border-gray-300 opacity-30 border-1' />

                <div className='flex gap-3 items-center'>
                    <h4><i className="ri-bank-card-fill"></i></h4>
                    <div>
                        <h4 className='text-xl font-semibold'>₹{fare[vehicleType]}</h4>
                        <p className='text-gray-600 text-sm'>Cash/Cash</p>
                    </div>
                </div>


            </div>

            {isConfirm && <button onClick={() => {
                setIsConfirm(false);
                createRide();

                // setTimeout(() => {
                //     setVehicleSelected(false);
                //     setDriverMatched(true);
                //     // setShowIsMatched(true);
                //     createRide();

                //     console.log(">>>>> inside timeout", showIsMatched, driverMatched)
                // }, 2000)


            }} className='mt-4 cursor-pointer self-center w-full rounded bg-green-600 h-10 text-xl text-white font-semibold'>
                Confirm
            </button>}
        </div>
    )
}
