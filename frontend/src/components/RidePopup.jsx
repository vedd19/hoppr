import React from 'react'

export const RidePopup = ({ confirmRide, ride, setRidePopupPanel, setConfirmRidePopupPanel }) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    setRidePopupPanel(false)
                }}
            ><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='h-30 flex items-center gap-2'>
                    <h3 className='z-1 bg-white rounded-[100%] '><i className="text-7xl ri-account-circle-fill"></i></h3>
                    <h4 className='text-lg font-medium'>{ride?.user.fullname.firstname + " " + ride?.user.fullname.lastname}</h4>
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
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash/Cash</p>
                        </div>
                    </div>
                </div>
                <div className='mt-5 w-full '>
                    <button
                        onClick={() => {
                            setConfirmRidePopupPanel(true)
                            confirmRide()
                            // setRidePopupPanel(false)
                            // console.log("aceppte clicked")

                        }}
                        className='cursor-pointer bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg'>Accept</button>

                    <button
                        onClick={() => {
                            setRidePopupPanel(false)

                        }}
                        className='mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg'>Ignore</button>


                </div>
            </div>
        </div>
    )
}
