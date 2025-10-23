import React from 'react'

export const LocationSearchPanel = ({ vehiclePanel, setVehiclePanel }) => {

    console.log(vehiclePanel);


    return (
        <div className='p-5'>
            <div onClick={() => {
                setVehiclePanel(true);
            }} className="cursor-pointer flex gap-5 items-center">
                <h5><i className="ri-map-pin-2-fill"></i></h5>
                <div className=''>
                    <h4 className='text-medium font-medium'>Gamharia, Railway station</h4>
                    <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
        </div>
    )
}
