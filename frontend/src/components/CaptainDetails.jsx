import React from 'react'

export const CaptainDetails = ({ captain }) => {
    return (
        <div>
            <div className="flex justify-between items-center">

                <div className='h-30 flex items-center '>
                    <h3 className='z-1 bg-white rounded-[100%] '><i className="text-7xl ri-account-circle-line"></i></h3>
                    <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                </div>
                <div className="">
                    <h4 className='text-xl font-semibold'>₹295</h4>
                    <h4 className='text-base text-gray-400 font-semibold'>Earned</h4>
                </div>
            </div>

            <div className="flex justify-around  bg-gray-100 p-5 rounded-2xl">
                <div className=" flex flex-col items-center gap-1">
                    <i className="text-xl font-semibold  ri-time-line"></i>
                    <h4 className='text-medium font-medium'>10.2</h4>
                    <p className='text-gray-500 font-base'>Hours Online</p>
                </div>

                <div className=" flex flex-col items-center gap-1">
                    <i className="text-xl font-semibold ri-time-line"></i>
                    <h4 className='text-medium font-medium'>10.2</h4>
                    <p className='text-gray-500 font-base'>Hours Online</p>
                </div>

                <div className=" flex flex-col items-center gap-1">
                    <i className="text-xl font-semibold ri-time-line"></i>
                    <h4 className='text-medium font-medium'>10.2</h4>
                    <p className='text-gray-500 font-base'>Hours Online</p>
                </div>

            </div>
        </div>
    )
}
