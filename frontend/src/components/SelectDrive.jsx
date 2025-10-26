import React from 'react'
import car from '../assets/car.png';
import motorcycle from '../assets/motorcycle.png';
import auto from '../assets/rikshaw.png';

export const SelectDrive = ({ fare, vehicleSelected, setVehicleSelected, setVehiclePanel, setUserInfo, setVehicleType }) => {



    const handleSelectVehicleClick = () => {
        console.log("blablabla")
        setVehicleSelected(true)
        setVehiclePanel(false);
    }


    return (
        <div className=' px-5 flex flex-col gap-2'>
            <div onClick={() => {
                setVehicleSelected(true)
                setVehiclePanel(false);
                setVehicleType("car")
            }}
                className=" cursor-pointer border-3 border-gray-50 hover:border-gray-700 rounded-xl flex justify-between items-center p-2">

                <div className="flex justify-start items-center gap-5">
                    <div className='h-15 flex bg-gray-100 p-2 rounded-[100%]'>
                        <img className='h-full' src={car} alt="car" />
                    </div>

                    <div>
                        <div className='flex items-center gap-2'>

                            <h4 className='text-xl font-bold'>HopprGo </h4>
                            <span className='font-medium'><i className="px-1 font-medium text-lg ri-user-fill"></i>4</span>
                        </div>

                        <p className='font-medium text-base'>2 mins away | 15:24</p>
                        <p className='font-base text-base text-gray-500 '>Affordable,compact rides</p>

                    </div>
                </div>

                <div className="self-start">
                    <h4 className='text-lg font-semibold'>₹{fare.car}</h4>
                </div>

            </div>

            <div onClick={() => {
                setVehicleSelected(true)
                setVehiclePanel(false);
                setVehicleType("motorcycle")
            }}
                className="cursor-pointer border-3 border-gray-50  hover:border-gray-700 rounded-xl flex justify-between items-center p-2">

                <div className="flex justify-start items-center gap-5">
                    <div className='h-15 flex bg-gray-100 p-2 rounded-[100%]'>
                        <img className='h-full' src={motorcycle} alt="motorcycle" />
                    </div>

                    <div>
                        <div className='flex items-center gap-2'>

                            <h4 className='text-xl font-bold'>Moto </h4>
                            <span className='font-medium'><i className="px-1 font-medium text-lg ri-user-fill"></i>1</span>
                        </div>

                        <p className='font-medium text-base'>3 mins away | 15:24</p>
                        <p className='font-base text-base text-gray-500 '>Affordable,Motorcycle rides</p>

                    </div>
                </div>

                <div className="self-start">
                    <h4 className='text-lg font-semibold'>₹{fare.motorcycle}</h4>
                </div>

            </div>

            <div onClick={() => {
                setVehicleSelected(true)
                setVehiclePanel(false);
                setVehicleType("auto")
            }} className="cursor-pointer border-3 border-gray-50  hover:border-gray-700 rounded-xl flex justify-between items-center p-2">

                <div className="flex justify-start items-center gap-5">
                    <div className='h-15 flex bg-gray-100 p-2 rounded-[100%]'>
                        <img className='h-full' src={auto} alt="auto" />
                    </div>

                    <div>
                        <div className='flex items-center gap-2'>

                            <h4 className='text-xl font-bold'>HopprAuto </h4>
                            <span className='font-medium'><i className="px-1 font-medium text-lg ri-user-fill"></i>3</span>
                        </div>

                        <p className='font-medium text-base'>4 mins away | 15:24</p>
                        <p className='font-base text-base text-gray-500 '>Affordable,compact rides</p>

                    </div>
                </div>

                <div className="self-start">
                    <h4 className='text-lg font-semibold'>₹{fare.auto}</h4>
                </div>

            </div>
        </div>
    )
}
