import React from 'react'

export const LocationSearchPanel = ({ vehiclePanel, setVehiclePanel, suggestions, setPickup, setDestination, activeField }) => {

    // console.log(vehiclePanel);

    const handleSuggestionClick = (suggestion) => {
        if (activeField == "pickup") {
            setPickup(suggestion)
        }
        else if (activeField == "destination") {
            setDestination(suggestion);
        }
    }


    return (
        <div className='p-5 flex flex-col gap-3'>
            {suggestions.map((ele, idx) => (
                <div key={idx} onClick={() => handleSuggestionClick(ele)} className="cursor-pointer flex gap-5 items-center">
                    <h5><i className="ri-map-pin-2-fill"></i></h5>
                    <div className=''>
                        <h4 className='text-medium font-semibold'>{ele}</h4>
                        {/* <p className='text-sm'>Lorem ipsum dolor sit amet.</p> */}
                    </div>
                </div>
            )
            )}
        </div>
    )
}
