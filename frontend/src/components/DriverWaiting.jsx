import React from 'react'
import car from '../assets/car.png';
import motorcycle from "../assets/motorcycle.png"
import auto from "../assets/rikshaw.png"

export const DriverWaiting = ({ vehicleType, captain, driverMatched, ride }) => {
    return (
        <div className='h-full flex flex-col gap-10'>

            <div className='flex justify-between'>


                <div className='h-30 flex items-center '>
                    <h3 className='z-1 bg-white rounded-[100%] '><i className="text-7xl ri-account-circle-line"></i></h3>
                    <img className='-ml-9 h-full object-contain' src={vehicleType === "car" ? car : (vehicleType === "motorcycle" ? motorcycle : auto)} alt="" />
                </div>

                <div>
                    <h4 className='text-xl font-medium text-gray-400 capitalize'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h4>
                    <h2 className='text-2xl font-bold'>{ride?.captain.vehicle.plate}</h2>
                    <h2 className='text-xl font-medium text-gray-400'>{vehicleType === "car" ? 'BMW M4' : (vehicleType === "motorcycle" ? "Royal Enfield GT 650" : 'Piagio 516')}</h2>
                    <h4 className='text-base font-medium'><i className="ri-star-s-fill"></i> 4.9 </h4>
                    <h4 className='text-medium font-medium'>{ride.otp}</h4>
                </div>
            </div>

            <div className=" flex justify-start gap-2 items-center">

                <input className='px-4 py-1 bg-gray-200 rounded-lg' type="text" placeholder="Send a message...." />
                <i className="text-lg text-gray-400 ri-send-plane-2-line"></i>
            </div>

            <div className=" flex justify-evenly gap-2">
                <div className="">
                    <div className='bg-gray-100 p-2 flex flex-col items-center rounded-[100%]'>
                        <i className="text-medium text-blue-600 font-bold ri-shield-line"></i>
                    </div>
                    <h4 className='font-semibold'> Safety</h4>
                </div>


                <div className="">
                    <div className='bg-gray-100 p-2 flex flex-col items-center rounded-[100%]'>
                        <i className="text-medium text-blue-600 font-bold ri-gps-line"></i>
                    </div>
                    <h4 className='font-semibold'> Safety</h4>
                </div>

                <div className="">
                    <div className='bg-gray-100 p-2 flex flex-col items-center rounded-[100%]'>
                        <i className="text-medium text-blue-600 font-bold ri-phone-fill"></i>
                    </div>
                    <h4 className='font-semibold'> Safety</h4>
                </div>


            </div>

            <hr className='border-1 border-gray-200 ' />

            <div className='flex gap-3 items-center'>
                <h4><i className="ri-map-pin-range-fill"></i></h4>
                <div>
                    <h4 className='text-xl font-semibold'>Destination</h4>
                    <p className='text-gray-600 text-sm'>{ride.destination}</p>
                </div>

            </div>

            {/* <hr className='border-1 border-gray-200 ' />

            <div className='flex gap-3 items-center'>
                <h4><i className="ri-map-pin-range-fill"></i></h4>
                <div>
                    <h4 className='text-xl font-semibold'>Pickup</h4>
                    <p className='text-gray-600 text-sm'>{ride.pickup}</p>
                </div>

            </div> */}

            <hr className='border-1 border-gray-200 ' />


        </div>
    )
}
